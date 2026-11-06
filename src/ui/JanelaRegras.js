export function popularJanelaRegras(scene, janela, regras, dominios, selecaoManager) {
  const textosPorId = {};
  const timers = [];

  let y = 22;

  regras.forEach((regra) => {
    const regraText = scene.add.text(6, y, regra.texto, {
      fontSize: "9px",
      fontFamily: "monospace",
      color: "#ffffff",
      wordWrap: { width: 190 },
    }).setInteractive();

    y += regraText.height + 3;

    regraText.setData("regraId", regra.id);

    regraText.on("pointerdown", () => {
      selecaoManager.selecionarRegra(regra.id);
    });

    janela.add(regraText);
    textosPorId[regra.id] = regraText;
  });

  const tituloAnexo = scene.add.text(6, y + 6, "Anexo: domínios oficiais", {
    fontSize: "9px",
    fontFamily: "monospace",
    color: "#ffcc66",
  });
  janela.add(tituloAnexo);
  y = tituloAnexo.y + tituloAnexo.height + 3;

  dominios.forEach(({ organizacao, dominio }) => {
    const dominioText = scene.add.text(6, y, `${organizacao}: ${dominio}`, {
      fontSize: "9px",
      fontFamily: "monospace",
      color: "#cccccc",
      wordWrap: { width: 190 },
    });

    y += dominioText.height + 2;
    janela.add(dominioText);
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
