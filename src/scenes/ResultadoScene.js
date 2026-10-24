import Phaser from "phaser";

export class ResultadoScene extends Phaser.Scene {
  constructor() {
    super("ResultadoScene");
  }

  init({ infos, resultados }) {
    this.infos = infos;
    this.resultados = resultados;
  }

  create() {
    this.aplicarBlurNaFase();

    this.add.rectangle(0, 0, 640, 360, 0x000000, 0.7).setOrigin(0).setInteractive();

    const estiloTitulo = { fontSize: "16px", fontFamily: "monospace", color: "#ffffff" };
    const estiloTexto = { fontSize: "11px", fontFamily: "monospace", color: "#ffffff" };

    this.add.text(320, 50, `FIM DO EXPEDIENTE: DIA ${this.infos.faseId}`, estiloTitulo).setOrigin(0.5);

    this.add.text(
      320,
      85,
      `Acertos: ${this.infos.acertos} de ${this.infos.total} (${this.infos.percentual}%)`,
      estiloTexto
    ).setOrigin(0.5);

    this.resultados.forEach((resultado, index) => {
      this.add.text(320, 125 + index * 20, this.descreverResultado(resultado, index), estiloTexto)
        .setOrigin(0.5);
    });

    this.criarBotaoJogarDeNovo();
  }

  descreverResultado(resultado, index) {
    const veredito = resultado.correta ? "ACERTOU" : "ERROU";
    const oQueEra = resultado.ehPhishing ? "era golpe" : "era legítimo";
    const destino = resultado.decisao === "lixeira" ? "foi para a lixeira" : "foi enviado";

    let linha = `E-mail ${index + 1}: ${veredito} (${oQueEra}, ${destino})`;
    if (resultado.ehPhishing) {
      linha += ` - sinais ${resultado.sinaisEncontrados}/${resultado.totalSinais}`;
    }
    return linha;
  }

  criarBotaoJogarDeNovo() {
    const botao = this.add.text(320, 300, "[ JOGAR DE NOVO ]", {
      fontSize: "12px",
      fontFamily: "monospace",
      color: "#ffffff",
      backgroundColor: "#3a3d67",
      padding: { x: 8, y: 4 },
    })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    botao.on("pointerover", () => botao.setColor("#ffff00"));
    botao.on("pointerout", () => botao.setColor("#ffffff"));

    botao.on("pointerdown", () => {
      this.scene.stop();
      this.scene.get("MainScene").scene.restart();
    });
  }

  aplicarBlurNaFase() {
    const cameraFase = this.scene.get("MainScene").cameras.main;

    const blur = cameraFase.filters?.internal.addBlur(1, 2, 2, 1);
    if (!blur) return;

    this.events.once("shutdown", () => {
      cameraFase.filters?.internal.remove(blur);
    });
  }
}
