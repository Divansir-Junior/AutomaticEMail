import { CANDIDATE_NAME, CANDIDATE_LINKEDIN } from "./profile.js";

const JOB_MESSAGES = {
    default: "Acredito que minha dedicação, vontade de aprender e comprometimento podem agregar ao time, e tenho interesse em desenvolver minhas habilidades nesta área.",
    "Auxiliar Administrativo": "Tenho facilidade com rotinas administrativas, organização de documentos, atendimento e controle de processos, e busco contribuir com eficiência no dia a dia do setor.",
    "Auxiliar de T.I": "Sou apaixonado por tecnologia, com interesse em suporte, manutenção de equipamentos e atendimento a usuários, sempre buscando soluções rápidas e eficazes.",
    "Assistente Administrativo": "Tenho experiência com atividades administrativas, como planilhas, arquivo e rotinas de escritório, e estou empenhado em agregar produtividade à equipe.",
    "Assistente de RH": "Tenho interesse em processos de recrutamento e seleção, admissão e rotinas de departamento pessoal, com atenção aos detalhes e boa comunicação.",
    "Assistente de Transportes": "Conheço rotinas de logística de transportes, controle de frotas e documentos, e estou disposto a aprender e contribuir com a operação.",
    "Assistente de T.I": "Tenho afinidade com tecnologia, suporte técnico e rotinas de TI, com foco em agilidade no atendimento e organização dos chamados.",
    "Assistente Financeiro": "Tenho facilidade com números, planilhas e rotinas financeiras como contas a pagar, conciliação e controle de caixa.",
    "Assistente de Supply Chain": "Tenho interesse na cadeia de suprimentos, controle de estoque, compras e distribuição, buscando otimizar processos.",
    "Assistente de Logística": "Tenho afinidade com logística, movimentação de mercadorias, controle de estoque e expedição, com atenção à organização.",
};

export function body(text, job) {
    const jobMessage = JOB_MESSAGES[job] ?? JOB_MESSAGES.default;

    return `Olá, tudo bem?

Meu nome é ${CANDIDATE_NAME} e estou em busca de uma oportunidade profissional. Gostaria de me candidatar à vaga de ${job}.

${jobMessage}

Segue abaixo o conteúdo de referência:

${text}

Meu LinkedIn: ${CANDIDATE_LINKEDIN}

Fico à disposição para qualquer esclarecimento ou para agendarmos uma entrevista.

Atenciosamente,
${CANDIDATE_NAME}`;
}
