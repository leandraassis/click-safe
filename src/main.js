import Phaser from "phaser";
import { MainScene } from "./scenes/MainScene";

const config = {
  type: Phaser.AUTO, //procurar diferença entre WEBGL e CANVAS, até lá deixar AUTO para o Phaser escolher
  width: 640,
  height: 360,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  pixelArt: true,
  scene: MainScene,
};

new Phaser.Game(config);
