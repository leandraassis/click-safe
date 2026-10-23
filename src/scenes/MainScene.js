import Phaser from "phaser";
import criarJanela from "../ui/Janela.js";
import { popularJanelaEmail } from "../ui/JanelaEmail.js";
import { popularJanelaRegras } from "../ui/JanelaRegras.js";
import { SelecaoManager } from "../../systems/SelecaoManager.js";
import { FilaCasos } from "../../systems/FilaCasos.js";
import { casosFase1 } from "../../data/casos/casosFase1.js";
import { regras } from "../../data/regras.js";

export class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  preload() {
    this.load.image("pc", "assets/gemini-finale.png");
    this.load.image("pasta", "assets/paste-rules.png");
    this.load.image("lixeira", "assets/paste-rules.png");
    this.load.image("enviar", "assets/paste-rules.png");
  }

  create() {
    this.janelaRegras = null;
    this.janelaEmail = null;
    this.selecaoManager = new SelecaoManager();
    this.filaCasos = new FilaCasos(1, casosFase1);
    this.textoFeedback = null;

    const spritePc = this.add.image(320, 180, "pc");
    spritePc.setDisplaySize(560, 320);

    this.criarIconeEnviar();
    this.criarIconeLixeira();

    this.criarIconeRegras();
    this.criarIconeEmail();
  }

  criarIconeEnviar() {
    this.zonaEnviar = this.add.image(100, 260, "enviar").setScale(0.7);

    this.add.text(102, 280, "ENVIAR", {
      fontSize: "11px",
      fontFamily: "monospace",
    }).setOrigin(0.5);
  }  

  criarIconeLixeira() {
    this.zonaLixeira = this.add.image(540, 260, "lixeira").setScale(0.7);

    this.add.text(542, 280, "LIXEIRA", {
      fontSize: "11px",
      fontFamily: "monospace",
    }).setOrigin(0.5);
  }

  criarIconeEmail() {
    const spriteEmail = this.add.image(100, 120, "pasta").setInteractive();
    spriteEmail.setScale(0.7);
    this.configurarCursor(spriteEmail);

    this.add.text(102, 140, "EMAIL", {
      fontSize: "11px",
      fontFamily: "monospace",
    }).setOrigin(0.5);

    spriteEmail.on("pointerdown", () => {
      if (this.janelaEmail) {
        this.janelaEmail.setVisible(true);
      } else if (this.filaCasos.temProximo()) {
        const caso = this.filaCasos.puxarProximo();
        this.selecaoManager.definirCaso(caso);
        this.janelaEmail = criarJanela(this, 250, 100, 250, 180, "EMAIL");
        popularJanelaEmail(this, this.janelaEmail, caso, this.selecaoManager);

        this.janelaEmail.on("drag", (pointer) => {
          this.janelaEmail.setScale(this.detectarAlvo(pointer) ? 0.6 : 1);
        });

        this.janelaEmail.on("dragend", (pointer) => {
          const alvo = this.detectarAlvo(pointer);

          if (!alvo) {
            this.janelaEmail.setScale(1);
            return;
          }

          const resultado = this.filaCasos.submeterResposta(
            alvo,
            this.selecaoManager.totalSinaisEncontrados()
          );
          this.retirarEmailDaMesa();
          this.mostrarFeedback(resultado);
        });
      } else {
        console.log("Não há mais emails na fila");
      }
    });

  }

  detectarAlvo(pointer) {
    if (this.zonaLixeira.getBounds().contains(pointer.x, pointer.y)) return "lixeira";
    if (this.zonaEnviar.getBounds().contains(pointer.x, pointer.y)) return "enviar";
    return null;
  }

  retirarEmailDaMesa() {
    this.janelaEmail.destroy();
    this.janelaEmail = null;
    this.selecaoManager.definirCaso(null);

    if (this.janelaRegras) {
      this.janelaRegras.destroy();
      this.janelaRegras = null;
    }
  }

  mostrarFeedback(resultado) {
    if (this.textoFeedback) {
      this.tweens.killTweensOf(this.textoFeedback);
      this.textoFeedback.destroy();
    }

    const oQueEra = resultado.ehPhishing ? "era golpe" : "era legítimo";
    let mensagem = `${resultado.correta ? "ACERTOU" : "ERROU"}! O e-mail ${oQueEra}.`;
    if (resultado.ehPhishing) {
      mensagem += `\nSinais provados: ${resultado.sinaisEncontrados}/${resultado.totalSinais}`;
    }

    const texto = this.add.text(320, 24, mensagem, {
      fontSize: "11px",
      fontFamily: "monospace",
      color: resultado.correta ? "#00ff00" : "#ff0000",
      backgroundColor: "#0c0c2a",
      padding: { x: 6, y: 4 },
      align: "center",
    })
      .setOrigin(0.5, 0)
      .setDepth(10);

    this.textoFeedback = texto;

    this.tweens.add({
      targets: texto,
      alpha: 0,
      delay: 2000,
      duration: 500,
      onComplete: () => {
        texto.destroy();
        if (this.textoFeedback === texto) this.textoFeedback = null;
      },
    });
  }

  criarIconeRegras() {
    const spriteRules = this.add.image(100, 75, "pasta").setInteractive();
    spriteRules.setScale(0.7);
    this.configurarCursor(spriteRules);

    this.add.text(102, 95, "REGRAS", {
      fontSize: "11px",
      fontFamily: "monospace",
    }).setOrigin(0.5);

    spriteRules.on("pointerdown", () => {
      if (this.janelaRegras) {
        this.janelaRegras.setVisible(true);
      } else {
        this.janelaRegras = criarJanela(this, 200, 60, 200, 150, "REGRAS");
        popularJanelaRegras(this, this.janelaRegras, regras, this.selecaoManager);
      }
    });
  }

  configurarCursor(sprite) {
    sprite.on("pointerover", () => {
      this.game.canvas.style.cursor = "pointer";
    });
    sprite.on("pointerout", () => {
      this.game.canvas.style.cursor = "default";
    });
  }
}