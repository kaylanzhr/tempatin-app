export const maxEmailLength = 254;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email: string) {
  const trimmed = email.trim();
  if (!trimmed) return "Email wajib diisi.";
  if (trimmed.length > maxEmailLength || !emailPattern.test(trimmed)) {
    return "Masukkan alamat email yang valid.";
  }
}
