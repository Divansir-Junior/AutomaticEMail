function isWindows() {
    return /Windows/i.test(navigator.userAgent);
}

function forceEdge(url) {
    return isWindows() ? `microsoft-edge:${url}` : url;
}

export function sendEmail(recipient, subject, message) {
    const mailto = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    window.location.href = forceEdge(mailto);
}

export function buildMailtoLink(recipient) {
    return forceEdge(`mailto:${recipient}`);
}

export default sendEmail;
