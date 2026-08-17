export function popularJanelaEmail(scene, janela, caso, selecaoManager) {
  const elementos = [
    { texto: `De: ${caso.remetente}`, id: 'remetente', cor: '#ffffff', y: 22 },
    { texto: `Assunto: ${caso.assunto}`, id: 'assunto', cor: '#ffffff', y: 40 },
    { texto: `Link: ${caso.link}`, id: 'link', cor: '#66ccff', y: 58 },
    { texto: caso.corpo, id: 'corpo', cor: '#ffffff', y: 76 },
  ];

  const textosPorId = {};

  elementos.forEach(({ texto, id, cor, y }) => {
    const textoObj = scene.add.text(6, y, texto, {
      fontSize: "9px",
      fontFamily: "monospace",
      color: cor,
      wordWrap: { width: 230 },
    }).setInteractive();

    textoObj.setData("elementoId", id);
    textoObj.setData("corOriginal", cor);

    textoObj.on("pointerdown", () => {
      selecaoManager.selecionarElemento(id);
    });

    janela.add(textoObj);
    textosPorId[id] = textoObj;
  });

  selecaoManager.on("elemento-selecionado", (id) => {
    if (textosPorId[id]) textosPorId[id].setColor("#ffff00");
  });

  selecaoManager.on("resultado", ({ acerto, elementoId }) => {
    const textoObj = textosPorId[elementoId];
    if (!textoObj) return;

    textoObj.setColor(acerto ? "#00ff00" : "#ff0000");

    scene.time.delayedCall(600, () => {
      textoObj.setColor(textoObj.getData("corOriginal"));
    });
  });
}

