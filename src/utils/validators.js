export function isValidEmail(email) {
    return /^[\w.+-]+@[\w-]+\.[\w.]+$/.test(email);
}

export function isValidPhone(phone) {
    return /^\+?\d[\d\s().-]{8,}\d$/.test(phone);
}
