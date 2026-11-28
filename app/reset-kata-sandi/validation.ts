export const minimumPasswordLength = 8;

export type PasswordErrors = Partial<Record<"password" | "confirmation", string>>;

export function validatePasswords(formData: FormData) {
  const passwordValue = formData.get("password");
  const confirmationValue = formData.get("confirmation");
  const password = typeof passwordValue === "string" ? passwordValue : "";
  const confirmation = typeof confirmationValue === "string" ? confirmationValue : "";
  const errors: PasswordErrors = {};

  if (!password.trim()) errors.password = "Kata sandi baru wajib diisi.";
  else if ([...password].length < minimumPasswordLength) {
    errors.password = `Kata sandi harus minimal ${minimumPasswordLength} karakter.`;
  }

  if (!confirmation) errors.confirmation = "Ulangi kata sandi baru.";
  else if (confirmation !== password) errors.confirmation = "Konfirmasi kata sandi belum cocok.";

  return { password, errors };
}
