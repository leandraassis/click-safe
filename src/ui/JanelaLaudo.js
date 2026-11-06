import criarJanela from "./Janela.js";

const LARGURA = 300;
const MARGEM = 6;
const TOPO = 22;
const ESPACO = 4;

const COR_TEXTO = "#ffffff";
const COR_ACERTO = "#00ff00";
const COR_ERRO = "#ff6666";
const COR_APAGADA = "#c8c8d8";

function formatarValor(valor) {
  return valor < 0 ? `-R$ ${-valor}` : `R$ ${valor}`;
}

function montarLinhas(caso, resultado, sinais) {
  const veredito = resultado.correta ? "ACERTOU" : "ERROU";
  const oQueEra = resultado.ehPhishing ? "era golpe" : "era legítimo";
  const destino = resultado.decisao === "lixeira" ? "foi para a lixeira" : "foi enviado";

  const linhas = [
    { texto: `Assunto: ${caso.assunto}`, cor: COR_TEXTO },
    {
      texto: `${veredito}: ${oQueEra} e ${destino}.`,
      cor: resultado.correta ? COR_ACERTO : COR_ERRO,
    },
  ];

  if (sinais.length > 0) {
    linhas.push({
      texto: `Sinais provados: ${resultado.sinaisEncontrados} de ${resultado.totalSinais}`,
      cor: COR_TEXTO,
    });

    sinais.forEach((sinal) => {
      linhas.push({
        texto: `${sinal.provado ? "[x]" : "[ ]"} ${sinal.explicacao}`,
        cor: sinal.provado ? COR_ACERTO : COR_APAGADA,
      });
    });
  }

  if (caso.explicacaoGeral) {
    const rotulo = caso.ehPhishing ? "Explicação geral" : "Por que é legítimo";
    linhas.push({ texto: `${rotulo}: ${caso.explicacaoGeral}`, cor: COR_TEXTO });
  }

  if (!resultado.correta) {
    linhas.push({ texto: `Consequência: ${caso.consequencia}`, cor: COR_ERRO });
  }

  linhas.push({ texto: `Valor do caso: ${formatarValor(resultado.valor)}`, cor: COR_TEXTO });

  if (resultado.descontoRelevado > 0) {
    linhas.push({
      texto: `Desconto relevado (período de experiência): R$ ${resultado.descontoRelevado}`,
      cor: COR_APAGADA,
    });
  }

  return linhas;
}

export function criarJanelaLaudo(scene, x, y, caso, resultado, sinais) {
  let yAtual = TOPO;

  const textos = montarLinhas(caso, resultado, sinais).map(({ texto, cor }) => {
    const textoObj = scene.add.text(MARGEM, yAtual, texto, {
      fontSize: "9px",
      fontFamily: "monospace",
      color: cor,
      wordWrap: { width: LARGURA - MARGEM * 2 },
    });
    yAtual += textoObj.height + ESPACO;
    return textoObj;
  });

  const janela = criarJanela(scene, x, y, LARGURA, yAtual, `LAUDO: ${caso.encaminhadoPor}`, true);

  janela.add(textos);

  return janela;
}
