import { CANDIDATE_NAME, CANDIDATE_LINKEDIN } from "./profile.js";

const JOB_MESSAGES = {
    "Auxiliar Administrativo": "Tenho experiência com rotinas administrativas, organização de documentos, controle de processos e atendimento ao público, contribuindo para a agilidade do setor.",
    "Auxiliar de T.I": "Tenho experiência com suporte técnico, manutenção de equipamentos e atendimento a usuários, além de interesse constante por novas tecnologias.",
    "Assistente Administrativo": "Tenho experiência com atividades administrativas, elaboração de planilhas, arquivo e rotinas de escritório, garantindo organização e produtividade.",
    "Assistente de RH": "Tenho experiência com rotinas de RH, como recrutamento e seleção, admissão, documentação e apoio ao departamento pessoal.",
    "Assistente de Transportes": "Tenho experiência com rotinas de transporte, controle de frotas, emissão de documentos e acompanhamento de entregas.",
    "Assistente de T.I": "Tenho experiência com rotinas de TI, suporte técnico, organização de chamados e manutenção de sistemas e equipamentos.",
    "Assistente Financeiro": "Tenho experiência com rotinas financeiras, como contas a pagar e a receber, conciliação bancária e controle de planilhas.",
    "Assistente de Supply Chain": "Tenho experiência com a cadeia de suprimentos, controle de estoque, compras e distribuição, buscando eficiência nos processos.",
    "Assistente de Logística": "Tenho experiência com logística, movimentação de mercadorias, controle de estoque e expedição, com foco em agilidade e organização.",
};

function buildJobParagraph(job) {
    const jobMessage = JOB_MESSAGES[job];
    return jobMessage ? `\n${jobMessage}\n\n` : "\n";
}

export function whatsappBody(job) {
    return `Prezados(as),

Meu nome é ${CANDIDATE_NAME} e estou em busca de uma oportunidade profissional. Estou interessado(a) na vaga de ${job}.
${buildJobParagraph(job)}Posso encaminhar meu currículo e portfólio, e meu LinkedIn está disponível em: ${CANDIDATE_LINKEDIN}

Fico à disposição para conversarmos. Agradeço desde já pela atenção.`;
}

export function emailBody(text, job) {
    return `Prezados(as),

Meu nome é ${CANDIDATE_NAME} e estou em busca de uma oportunidade profissional. Venho por meio deste e-mail apresentar minha candidatura à vaga de ${job}.
${buildJobParagraph(job)}Segue abaixo o conteúdo de referência:

${text}

Meu currículo e portfólio seguem em anexo, e meu LinkedIn está disponível em: ${CANDIDATE_LINKEDIN}

Fico à disposição para qualquer esclarecimento e para uma eventual entrevista.

Atenciosamente,
${CANDIDATE_NAME}`;
}
