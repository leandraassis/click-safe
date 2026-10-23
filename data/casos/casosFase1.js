export const caso01 = {
  id: "caso-01",
  remetente: "suporte@essebanco.com",
  assunto: "Sua conta será bloqueada em 24 horas!",
  link: "bit.ly/verificar-conta-urgente",
  corpo: "Clique no link abaixo para verificar sua conta e evitar o bloqueio.",
  sinaisPresentes: [
    { regraId: "dominio-falso", elementoId: "remetente", confirmaPhishing: true },
    { regraId: "link-suspeito", elementoId: "link", confirmaPhishing: true },
    { regraId: "urgencia", elementoId: "assunto", confirmaPhishing: true },
  ],
  ehPhishing: true,
};

export const caso02 = {
  id: "caso-02",
  remetente: "atendimento@banc0-brasil.com",
  assunto: "URGENTE: Confirme seus dados agora",
  link: "http://banc0-brasil-seguranca.net/login",
  corpo: "Identificamos uma tentativa de acesso não autorizado. Confirme seus dados imediatamente.",
  sinaisPresentes: [
    { regraId: "dominio-falso", elementoId: "remetente", confirmaPhishing: true },
    { regraId: "link-suspeito", elementoId: "link", confirmaPhishing: true },
    { regraId: "urgencia", elementoId: "assunto", confirmaPhishing: true },
  ],
  ehPhishing: true,
};

export const caso03 = {
  id: "caso-03",
  remetente: "newsletter@spotify.com",
  assunto: "Seu resumo musical de setembro está pronto",
  link: "https://open.spotify.com/resumo",
  corpo: "Veja quais foram as músicas e artistas mais tocados por você este mês.",
  sinaisPresentes: [],
  ehPhishing: false,
};

export const casosFase1 = [caso01, caso02, caso03];