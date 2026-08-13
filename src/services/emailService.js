export function sendEmail(recipient, subject, message) {
    const body = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    window.location.href = body;
}

export default sendEmail;
