const VALORES = {
  decisaoCorreta: 10,
  sinalProvado: 5,
  golpeAprovado: -20,
  legitimoBloqueado: -10,
  ligacaoErrada: -1,
};

export class FilaCasos {
  constructor(faseId, todosCasos) {
    this.faseId = faseId;
    this.relevarDescontos = faseId === 1;
    this.casos = todosCasos.filter((caso) => !caso.fixo);
    this.casoAtual = null;
    this.resultados = [];
    this.embaralhar();
    this.casos.unshift(...todosCasos.filter((caso) => caso.fixo));
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

  submeterResposta(decisao, sinaisEncontrados = 0, ligacoesErradas = 0) {
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
      ligacoesErradas,
      ...this.calcularValores(correta, sinaisEncontrados, ligacoesErradas),
    };

    this.resultados.push(resultado);
    this.casoAtual = null;
    return resultado;
  }

  calcularValores(correta, sinaisEncontrados, ligacoesErradas) {
    const ganho = correta
      ? VALORES.decisaoCorreta + sinaisEncontrados * VALORES.sinalProvado
      : 0;

    let piso = 0;
    if (!correta) {
      piso = this.casoAtual.ehPhishing ? VALORES.golpeAprovado : VALORES.legitimoBloqueado;
    }

    const valorComDescontos = Math.max(
      ganho + piso + ligacoesErradas * VALORES.ligacaoErrada,
      piso
    );

    if (this.relevarDescontos) {
      return { valor: ganho, descontoRelevado: ganho - valorComDescontos };
    }
    return { valor: valorComDescontos, descontoRelevado: 0 };
  }

  pegarInfosFase() {
    const total = this.resultados.length;
    const acertos = this.resultados.filter((r) => r.correta).length;
    const somaValores = this.resultados.reduce((soma, r) => soma + r.valor, 0);
    const descontosRelevados = this.resultados.reduce((soma, r) => soma + r.descontoRelevado, 0);

    const percentual = total === 0 ? 0 : Math.round((acertos / total) * 100);
    return {
      faseId: this.faseId,
      total,
      acertos,
      percentual,
      valorDia: Math.max(somaValores, 0),
      descontosRelevados,
    };
  }
}
