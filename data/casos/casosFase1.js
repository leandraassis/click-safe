export const caso01 = {
  id: "d1-c01",
  fixo: true,
  encaminhadoPor: "Seu Antônio",
  notaMorador: "Recebi isso hoje cedo. Tenho conta no Essebanco. É verdade?",
  remetente: "suporte.essebanco@mailrapido.com",
  assunto: "Sua conta será bloqueada em 24 horas!",
  link: "curtinho.xyz/essb24",
  corpo: "Detectamos uma irregularidade no seu cadastro. Clique no link e confirme seus dados, ou sua conta será bloqueada.",
  sinaisPresentes: [
    {
      regraId: "remetente-nao-oficial",
      elementoId: "remetente",
      explicacao: "O Essebanco usa o domínio essebanco.com.br. Este e-mail vem de mailrapido.com, que não é do banco.",
    },
    {
      regraId: "link-nao-oficial",
      elementoId: "link",
      explicacao: "Este link esconde o endereço real: não dá para saber para onde ele leva. Antes de acessar um link, confira o endereço. Na dúvida, não acesse.",
    },
    {
      regraId: "pressa-ameaca",
      elementoId: "assunto",
      explicacao: "Prazo de 24 horas e ameaça de bloqueio: o golpista quer que você aja sem tempo para pensar.",
    },
  ],
  ehPhishing: true,
  explicacaoGeral: null,
  consequencia: "Seu Antônio digitou a senha do banco no site falso. Ele precisou trocar a senha, encerrar as sessões abertas em outros aparelhos e ativar a verificação em duas etapas.",
  fontes: [
    'livro, 2.3: "sérias consequências, como [...] cancelamento [...] de uma conta bancária"',
    'Evite Fraudes: "Confira o endereço do site (URL), antes de acessar o link" / "na dúvida, não acesse!"',
    'Não se Deixe Enganar: "Quer que faça algo sem tempo para pensar?"',
    'Caiu?: "Troque suas senhas"',
  ],
};

export const caso02 = {
  id: "d1-c02",
  encaminhadoPor: "Léo",
  notaMorador: "5 mil moedas de graça??? Posso resgatar, né?",
  remetente: "premios@sorteiosgamer.net",
  assunto: "Suas 5.000 moedas PixelPlay expiram HOJE",
  link: "sorteiosgamer.net/resgate",
  corpo: "Parabéns! Você foi sorteado com 5.000 moedas PixelPlay. Entre com a sua conta no link para resgatar antes que elas expirem.",
  sinaisPresentes: [
    {
      regraId: "remetente-nao-oficial",
      elementoId: "remetente",
      explicacao: "A PixelPlay usa pixelplay.com. O e-mail vem de sorteiosgamer.net, que não tem nada a ver com a loja.",
    },
    {
      regraId: "link-nao-oficial",
      elementoId: "link",
      explicacao: "O link leva a sorteiosgamer.net, e não a pixelplay.com. Lá, o golpista pede o login da conta.",
    },
    {
      regraId: "pressa-ameaca",
      elementoId: "assunto",
      explicacao: '"Expiram HOJE": a pressa é para você agir por impulso.',
    },
  ],
  ehPhishing: true,
  explicacaoGeral: 'um prêmio que você não pediu é "vantagem boa demais". Desconfie.',
  consequencia: "Léo entrou com a conta dele no site falso. O golpista trocou a senha e levou os itens do jogo. Léo teve que trocar a senha em todas as contas onde usava a mesma e ativar a verificação em duas etapas.",
  fontes: [
    'Não se Deixe Enganar: "pontos ou bônus expirando" / "vantagem boa demais" / "pressa"',
    'Evite Fraudes: "Confira o endereço do site (URL)"',
    'Caiu?: "Altere imediatamente a senha, em todas as contas onde for usada"',
  ],
};

export const caso03 = {
  id: "d1-c03",
  encaminhadoPor: "Marina",
  notaMorador: "Tô esperando esse pagamento faz uma semana... pago a taxa?",
  remetente: "financeiro@liberapag.com",
  assunto: "TrampoLivre: seu pagamento está retido",
  link: "liberapag.com/taxa",
  corpo: "O seu pagamento de R$ 1.200,00 pelo projeto na TrampoLivre está retido. Para liberar o valor, pague a taxa de R$ 49,90 pelo link.",
  sinaisPresentes: [
    {
      regraId: "remetente-nao-oficial",
      elementoId: "remetente",
      explicacao: "A TrampoLivre usa trampolivre.com.br. O e-mail vem de liberapag.com.",
    },
    {
      regraId: "link-nao-oficial",
      elementoId: "link",
      explicacao: "O link leva a liberapag.com, e não ao site oficial da TrampoLivre.",
    },
  ],
  ehPhishing: true,
  explicacaoGeral: "este e-mail nem tem pressa, e mesmo assim é golpe. Pergunte-se: faz sentido pagar para receber? Por que a taxa não é descontada do valor?",
  consequencia: 'Marina pagou a "taxa" por Pix, e o pagamento nunca chegou. Ela contestou o Pix no app do banco para acionar o MED: quanto antes se contesta, maior a chance de reaver o dinheiro.',
  fontes: [
    'Não se Deixe Enganar: "pagamento pendente" / "por que pagar antes e não descontar do que tenho a receber?"',
    'Caiu?: "Conteste o Pix" / "Quanto antes contestar, maior a chance de reaver os valores"',
  ],
};

export const caso04 = {
  id: "d1-c04",
  encaminhadoPor: "Seu Antônio",
  notaMorador: "50% de desconto no IPTU! Minha vizinha já pagou.",
  remetente: "iptu.vilaconexa@mailrapido.com",
  assunto: "IPTU com 50% de desconto só HOJE",
  link: "curtinho.xyz/iptu50",
  corpo: "A Prefeitura de Vila Conexa oferece 50% de desconto no IPTU para pagamento até a meia-noite. Gere o seu boleto pelo link.",
  sinaisPresentes: [
    {
      regraId: "remetente-nao-oficial",
      elementoId: "remetente",
      explicacao: "A Prefeitura usa o domínio vilaconexa.gov.br. Este e-mail vem de mailrapido.com.",
    },
    {
      regraId: "link-nao-oficial",
      elementoId: "link",
      explicacao: "Este link esconde o endereço real. Débitos e pendências se resolvem só pelos canais oficiais.",
    },
    {
      regraId: "pressa-ameaca",
      elementoId: "assunto",
      explicacao: '"Só HOJE, até a meia-noite": desconto relâmpago para você pagar sem pensar.',
    },
  ],
  ehPhishing: true,
  explicacaoGeral: null,
  consequencia: "Seu Antônio pagou o boleto falso, e o dinheiro foi para a conta do golpista. Ele guardou o e-mail e o comprovante como evidências e fez um boletim de ocorrência.",
  fontes: [
    'Não se Deixe Enganar: "impostos (ex: IPVA, Imposto de Renda)" / "Promoções, doações, débitos ou pendências? só em canais oficiais!"',
    'Evite Fraudes: "Confira os dados de boletos"',
    'Caiu?: "Guarde evidências" / "Faça um boletim de ocorrência"',
  ],
};

export const caso05 = {
  id: "d1-c05",
  encaminhadoPor: "Seu Antônio",
  notaMorador: "Esse também diz que é do banco. Será golpe?",
  remetente: "comunicados@essebanco.com.br",
  assunto: "Seu extrato de outubro está disponível",
  link: null,
  corpo: "Olá! O seu extrato de outubro já pode ser consultado no aplicativo oficial do Essebanco. Lembre-se: o Essebanco nunca pede senha ou código por e-mail.",
  sinaisPresentes: [],
  ehPhishing: false,
  explicacaoGeral: "não pede senha, dados nem dinheiro, e não traz link: manda usar o aplicativo oficial. O remetente com o domínio certo ajuda, mas não prova nada sozinho, porque um remetente pode ser falsificado. O que pesa aqui é que o e-mail não pede nada.",
  consequencia: "Seu Antônio ficou com medo do próprio banco e passou dias sem conferir o extrato.",
  fontes: [
    'Banco via Internet: "Instituições financeiras não contatam pessoas pedindo senhas, códigos de verificação [...]"',
    'livro, 2.3: "não considere que uma mensagem é confiável com base na confiança que você deposita em seu remetente"',
  ],
};

export const caso06 = {
  id: "d1-c06",
  encaminhadoPor: "Marina",
  notaMorador: "Eu assino a Sonora. Isso é deles mesmo?",
  remetente: "novidades@sonora.com.br",
  assunto: "Seu resumo musical de outubro",
  link: "sonora.com.br/resumo",
  corpo: "Você ouviu 42 horas de música em outubro! Veja os seus artistas favoritos no app ou no site.",
  sinaisPresentes: [],
  ehPhishing: false,
  explicacaoGeral: "o domínio e o link são os oficiais, e o e-mail não pede dinheiro, dados nem login. Marina assina a Sonora, então faz sentido ela receber esse e-mail.",
  consequencia: "Marina deixou de receber os resumos da Sonora e começou a desconfiar da Central.",
  fontes: [
    'Não se Deixe Enganar: "Envolve dinheiro, vantagem ou informações pessoais?"',
    'livro, 2.3: "questione-se por que instituições com as quais você não tem contato estão lhe enviando mensagens"',
  ],
};

export const caso07 = {
  id: "d1-c07",
  encaminhadoPor: "Léo",
  notaMorador: "Campeonato de e-sports da Prefeitura! Mas tem prazo... é golpe?",
  remetente: "eventos@vilaconexa.gov.br",
  assunto: "Inscrições do campeonato de e-sports vão até sexta",
  link: "vilaconexa.gov.br/campeonato",
  corpo: "A Prefeitura de Vila Conexa abre as inscrições do 1º Campeonato Municipal de E-sports. A inscrição é gratuita e vai até sexta-feira.",
  sinaisPresentes: [],
  ehPhishing: false,
  explicacaoGeral: 'tem prazo, mas não tem ameaça: são dias para decidir, e não "agora ou nunca". É gratuito, não pede dados por e-mail, e o link é do site oficial.',
  consequencia: "Léo perdeu o prazo e ficou fora do campeonato.",
  fontes: [
    'Não se Deixe Enganar: "Quer que faça algo sem tempo para pensar?" / sinais: "ameaça", "pressa"',
  ],
};

export const casosFase1 = [caso01, caso02, caso03, caso04, caso05, caso06, caso07];
