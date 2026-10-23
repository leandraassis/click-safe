export function popularJanelaEmail(scene, janela, caso, selecaoManager) {
  const elementos = [
    { texto: `De: ${caso.remetente}`, id: 'remetente', cor: '#ffffff', y: 22 },
    { texto: `Assunto: ${caso.assunto}`, id: 'assunto', cor: '#ffffff', y: 40 },
    { texto: `Link: ${caso.link}`, id: 'link', cor: '#66ccff', y: 58 },
    { texto: caso.corpo, id: 'corpo', cor: '#ffffff', y: 76 },
  ];

  const textosPorId = {};
  const timers = [];

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

  const aoSelecionarElemento = (id) => {
    if (textosPorId[id]) textosPorId[id].setColor("#ffff00");
  };

  const aoDesmarcarElemento = (id) => {
    const textoObj = textosPorId[id];
    if (textoObj) textoObj.setColor(textoObj.getData("corOriginal"));
  };

  const aoReceberResultado = ({ acerto, elementoId }) => {
    const textoObj = textosPorId[elementoId];
    if (!textoObj) return;

    textoObj.setColor(acerto ? "#00ff00" : "#ff0000");

    const timer = scene.time.delayedCall(600, () => {
      textoObj.setColor(textoObj.getData("corOriginal"));
    });
    timers.push(timer);
  };

  selecaoManager.on("elemento-selecionado", aoSelecionarElemento);
  selecaoManager.on("elemento-desmarcado", aoDesmarcarElemento);
  selecaoManager.on("resultado", aoReceberResultado);

  janela.once("destroy", () => {
    selecaoManager.off("elemento-selecionado", aoSelecionarElemento);
    selecaoManager.off("elemento-desmarcado", aoDesmarcarElemento);
    selecaoManager.off("resultado", aoReceberResultado);
    timers.forEach((timer) => timer.remove());
  });
}
