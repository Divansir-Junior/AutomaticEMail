export function extractEmail(text) {
    const match = text.match(/[\w.+-]+@[\w-]+\.[\w.]+/);
    return match ? match[0] : "";
}

export function extractPhone(text) {
    const match = text.match(/\+?\d[\d\s().-]{8,}\d/);
    return match ? match[0].replace(/[^\d+]/g, "") : "";
}
