const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const registrationPasswordMinimum = 8;

export type RegistrationFields = {
  fullName: string;
  email: string;
  password: string;
  confirmation: string;
};

export type RegistrationErrors = Partial<
  Record<keyof RegistrationFields | "terms", string>
>;

export function validateRegistration(formData: FormData) {
  const fields: RegistrationFields = {
    fullName: readText(formData, "fullName").trim(),
    email: readText(formData, "email").trim(),
    password: readText(formData, "password"),
    confirmation: readText(formData, "confirmation"),
  };
  const errors: RegistrationErrors = {};

  if (!fields.fullName) errors.fullName = "Nama lengkap wajib diisi.";
  if (!fields.email) errors.email = "Email wajib diisi.";
  else if (!emailPattern.test(fields.email)) {
    errors.email = "Masukkan alamat email yang valid.";
  }

  if (!fields.password.trim()) errors.password = "Kata sandi wajib diisi.";
  else if (Array.from(fields.password).length < registrationPasswordMinimum) {
    errors.password = `Kata sandi harus berisi minimal ${registrationPasswordMinimum} karakter.`;
  }

  if (!fields.confirmation.trim()) {
    errors.confirmation = "Konfirmasi kata sandi wajib diisi.";
  } else if (fields.confirmation !== fields.password) {
    errors.confirmation = "Konfirmasi kata sandi tidak cocok.";
  }

  if (formData.get("terms") !== "on") {
    errors.terms = "Setujui ketentuan layanan dan kebijakan privasi untuk melanjutkan.";
  }

  return { fields, errors };
}

function readText(formData: FormData, field: keyof RegistrationFields) {
  const value = formData.get(field);
  return typeof value === "string" ? value : "";
}
