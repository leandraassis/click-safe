export class FilaCasos {
  constructor(faseId, todosCasos) {
    this.faseId = faseId;
    this.casos = [...todosCasos];
    this.casoAtual = null;
    this.resultados = [];
    this.embaralhar();
  }

  embaralhar() {
    for (let i = this.casos.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.casos[i], this.casos[j]] = [this.casos[j], this.casos[i]];
    }
  }

  temProximo() {
    return this.casos.length > 0;
  }

  puxarProximo() {
    if (this.casos.length === 0) return null;
    this.casoAtual = this.casos.shift();
    return this.casoAtual;
  }

  submeterResposta(decisao, sinaisEncontrados = 0) {
    if (!this.casoAtual) return null;

    const marcouComoGolpe = decisao === "lixeira";
    const correta = marcouComoGolpe === this.casoAtual.ehPhishing;

    const resultado = {
      casoId: this.casoAtual.id,
      decisao,
      correta,
      ehPhishing: this.casoAtual.ehPhishing,
      sinaisEncontrados,
      totalSinais: this.casoAtual.sinaisPresentes.length,
    };

    this.resultados.push(resultado);
    this.casoAtual = null;
    return resultado;
  }

  pegarInfosFase() {
    const total = this.resultados.length;
    const acertos = this.resultados.filter((r) => r.correta).length;

    const percentual = total === 0 ? 0 : Math.round((acertos / total) * 100);
    return { faseId: this.faseId, total, acertos, percentual };
  }
}
