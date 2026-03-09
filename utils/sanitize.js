export function sanitizeInput(str) {
    if (!str) return "";
    return str
        .trim()
        .replace(/[<>]/g, "")
        .replace(/javascript:/gi, "");
}
