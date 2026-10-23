export function popularJanelaRegras(scene, janela, regras, selecaoManager) {
  const textosPorId = {};
  const timers = [];

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

  const aoSelecionarRegra = (id) => {
    if (textosPorId[id]) textosPorId[id].setColor("#ffff00");
  };

  const aoDesmarcarRegra = (id) => {
    if (textosPorId[id]) textosPorId[id].setColor("#ffffff");
  };

  const aoReceberResultado = ({ acerto, regraId }) => {
    const textoObj = textosPorId[regraId];
    if (!textoObj) return;

    textoObj.setColor(acerto ? "#00ff00" : "#ff0000");

    const timer = scene.time.delayedCall(600, () => {
      textoObj.setColor("#ffffff");
    });
    timers.push(timer);
  };

  selecaoManager.on("regra-selecionada", aoSelecionarRegra);
  selecaoManager.on("regra-desmarcada", aoDesmarcarRegra);
  selecaoManager.on("resultado", aoReceberResultado);

  janela.once("destroy", () => {
    selecaoManager.off("regra-selecionada", aoSelecionarRegra);
    selecaoManager.off("regra-desmarcada", aoDesmarcarRegra);
    selecaoManager.off("resultado", aoReceberResultado);
    timers.forEach((timer) => timer.remove());
  });
}
