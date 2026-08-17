export default function criarJanela(scene, x, y, largura, altura, titulo) {
  const janela = scene.add.container(x, y);

  const fundo = scene.add.rectangle(0, 0, largura, altura, 0x3a3d67, 0.95)
    .setOrigin(0)
    .setStrokeStyle(1, 0x0c0c2a);

  const barraTitulo = scene.add.rectangle(0, 0, largura, 16, 0x0c0c2a)
    .setOrigin(0)
    .setInteractive({ draggable: true });

  const textoTitulo = scene.add.text(4, 2, titulo, {
    fontSize: "11px",
    fontFamily: "monospace",
    color: "#ffff",
  });

  const botaoMinimizar = scene.add.text(largura - 14, 1, "X", {
    fontSize: "12px",
    fontFamily: "monospace",
    color: "#ffff",
  }).setInteractive();

  janela.add([fundo, barraTitulo, textoTitulo, botaoMinimizar]);

  barraTitulo.on("drag", (pointer) => {
    janela.x += pointer.x - pointer.prevPosition.x;
    janela.y += pointer.y - pointer.prevPosition.y;
    janela.emit("drag", pointer);
  });

  barraTitulo.on("dragend", (pointer) => {
    janela.emit("dragend", pointer);
  }); 

  botaoMinimizar.on("pointerdown", () => {
    janela.setVisible(!janela.visible);
  });

  return janela;
}