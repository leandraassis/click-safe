import Phaser from "phaser";
import { MainScene } from "./scenes/MainScene";
import { ResultadoScene } from "./scenes/ResultadoScene";

const config = {
  type: Phaser.AUTO,
  width: 640,
  height: 360,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  pixelArt: true,
  scene: [MainScene, ResultadoScene],
};

new Phaser.Game(config);
