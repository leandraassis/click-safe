import Phaser from "phaser";

export class SelecaoManager extends Phaser.Events.EventEmitter {
  constructor(caso) {
    super();
    this.caso = caso;
    this.regraSelecionada = null;
    this.elementoSelecionado = null;
  }

  selecionarRegra(regraId) {
    if (this.regraSelecionada) return;
    this.regraSelecionada = regraId;
    this.emit("regra-selecionada", regraId)
    this.tentarChecar();
  }

  selecionarElemento(elementoId) {
    if (this.elementoSelecionado) return;

    this.elementoSelecionado = elementoId;
    this.emit("elemento-selecionado", elementoId);
    this.tentarChecar();
  }

  tentarChecar() {
    if (!this.regraSelecionada || !this.elementoSelecionado) return;

    const acerto = this.caso.sinaisPresentes.some(
      (sinal) => sinal.regraId === this.regraSelecionada && 
      sinal.elementoId === this.elementoSelecionado);

    this.emit("resultado", {
      acerto,
      regraId: this.regraSelecionada,
      elementoId: this.elementoSelecionado,
    })

    this.regraSelecionada = null;
    this.elementoSelecionado = null;
  }
}