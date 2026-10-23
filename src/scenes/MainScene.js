import Phaser from "phaser";
import criarJanela from "../ui/Janela.js";
import { popularJanelaEmail } from "../ui/JanelaEmail.js";
import { popularJanelaRegras } from "../ui/JanelaRegras.js";
import { SelecaoManager } from "../../systems/SelecaoManager.js";
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
    this.filaCasos = [...casosFase1];

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
      } else if (this.filaCasos.length > 0) {
        const caso = this.filaCasos.shift();
        this.selecaoManager.definirCaso(caso);
        this.janelaEmail = criarJanela(this, 250, 100, 250, 180, "EMAIL");
        popularJanelaEmail(this, this.janelaEmail, caso, this.selecaoManager);

        this.janelaEmail.on("drag", () => {
          const bordasJanela = new Phaser.Geom.Rectangle(this.janelaEmail.x, this.janelaEmail.y, 250, 180);
          const bordasLixeira = this.zonaLixeira.getBounds();
          const bordasEnviar = this.zonaEnviar.getBounds();

          const pertoLixeira = Phaser.Geom.Intersects.RectangleToRectangle(bordasJanela, bordasLixeira);
          const pertoEnviar = Phaser.Geom.Intersects.RectangleToRectangle(bordasJanela, bordasEnviar);

          this.janelaEmail.setScale(pertoLixeira || pertoEnviar ? 0.6 : 1);
        });

        this.janelaEmail.on("dragend", () => {
          const bordasJanela = this.janelaEmail.getBounds();
          const bordasLixeira = this.zonaLixeira.getBounds();
          const bordasEnviar = this.zonaEnviar.getBounds();

          if (Phaser.Geom.Intersects.RectangleToRectangle(bordasJanela, bordasLixeira)) {
            console.log("Email deletado");
            this.janelaEmail.destroy();
            this.janelaEmail = null;
            this.selecaoManager.definirCaso(null);
            if (this.janelaRegras) {
              this.janelaRegras.destroy();
              this.janelaRegras = null;
            }
          } else if (Phaser.Geom.Intersects.RectangleToRectangle(bordasJanela, bordasEnviar)) {
            console.log("Email enviado");
            this.janelaEmail.destroy();
            this.janelaEmail = null;
            this.selecaoManager.definirCaso(null);
            if (this.janelaRegras) {
              this.janelaRegras.destroy();
              this.janelaRegras = null;
            }
          } else {
            this.janelaEmail.setScale(1);
          }
        });
      } else {
        console.log("Não há mais emails na fila");
      }
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