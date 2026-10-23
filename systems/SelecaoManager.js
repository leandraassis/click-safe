import Phaser from "phaser";

export class SelecaoManager extends Phaser.Events.EventEmitter {
  constructor(caso = null) {
    super();
    this.definirCaso(caso);
  }

  definirCaso(caso) {
    this.caso = caso;
    this.regraSelecionada = null;
    this.elementoSelecionado = null;
    this.sinaisEncontrados = new Set();
  }

  selecionarRegra(regraId) {
    if (!this.caso) return;
    if (this.regraSelecionada === regraId) return;

    if (this.regraSelecionada) {
      this.emit("regra-desmarcada", this.regraSelecionada);
    }

    this.regraSelecionada = regraId;
    this.emit("regra-selecionada", regraId);
    this.tentarChecar();
  }

  selecionarElemento(elementoId) {
    if (!this.caso) return;
    if (this.elementoSelecionado === elementoId) return;

    if (this.elementoSelecionado) {
      this.emit("elemento-desmarcado", this.elementoSelecionado);
    }

    this.elementoSelecionado = elementoId;
    this.emit("elemento-selecionado", elementoId);
    this.tentarChecar();
  }

  tentarChecar() {
    if (!this.regraSelecionada || !this.elementoSelecionado) return;

    const acerto = this.caso.sinaisPresentes.some(
      (sinal) =>
        sinal.regraId === this.regraSelecionada &&
        sinal.elementoId === this.elementoSelecionado
    );

    const chave = `${this.regraSelecionada}|${this.elementoSelecionado}`;
    const repetido = acerto && this.sinaisEncontrados.has(chave);
    if (acerto) this.sinaisEncontrados.add(chave);

    this.emit("resultado", {
      acerto,
      repetido,
      regraId: this.regraSelecionada,
      elementoId: this.elementoSelecionado,
    });

    this.regraSelecionada = null;
    this.elementoSelecionado = null;
  }

  totalSinaisEncontrados() {
    return this.sinaisEncontrados.size;
  }
}
