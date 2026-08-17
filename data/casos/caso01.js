//temp
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