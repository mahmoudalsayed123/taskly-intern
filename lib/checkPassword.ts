export function checkPassword(password: string) {
  const passwordChecks = {
    hasMinLength: password?.length >= 8,

    hasUppercase: /[A-Z]/.test(password),

    hasLowercase: /[a-z]/.test(password),

    hasNumber: /[0-9]/.test(password),

    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  return passwordChecks;
}
