import { CANDIDATE_NAME, CANDIDATE_LINKEDIN } from "./profile.js";

export function emailSubject(job) {
    return `Candidatura à vaga de ${job}`;
}

export function whatsappMessage(job) {
    return `Olá! Meu nome é ${CANDIDATE_NAME} e estou em busca de uma vaga de ${job}. Gostaria de saber se vocês estão com oportunidades abertas e, se possível, conversarmos sobre minha candidatura.

Meu LinkedIn: ${CANDIDATE_LINKEDIN}`;
}
