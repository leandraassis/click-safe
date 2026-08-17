export function popularJanelaRegras(scene, janela, regras, selecaoManager) {
  const textosPorId = {};

  regras.forEach((regra, index) => {
    const y = 22 + index * 18;

    const regraText = scene.add.text(6, y, regra.texto, {
      fontSize: "9px",
      fontFamily: "monospace",
      color: "#ffffff",
      wordWrap: { width: 190 },
    }).setInteractive();

    regraText.setData("regraId", regra.id);

    regraText.on("pointerdown", () => {
      selecaoManager.selecionarRegra(regra.id);
    });

    janela.add(regraText);
    textosPorId[regra.id] = regraText;
  });

  selecaoManager.on("regra-selecionada", (id) => {
    if (textosPorId[id]) textosPorId[id].setColor("#ffff00");
  });

  selecaoManager.on("resultado", ({ acerto, regraId }) => {
    const textoObj = textosPorId[regraId];
    if (!textoObj) return;

    textoObj.setColor(acerto ? "#00ff00" : "#ff0000");

    scene.time.delayedCall(600, () => {
      textoObj.setColor("#ffffff");
    });
  });
}