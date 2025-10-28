interface FirebaseErrorMap {
  [key: string]: string;
}

const errorMap: FirebaseErrorMap = {
  "email-already-in-use": "This email is already registered. Try signing in.",
  "invalid-email": "Please enter a valid email address.",
  "weak-password": "Password should be at least 6 characters.",
  "wrong-password": "Wrong password. Try again or reset it.",
  "user-not-found": "No account found with this email.",
  "too-many-requests": "Too many attempts. Please try again later.",
  default: "An unexpected error occurred. Please try again.",
};

export function mapAuthCodeToMessage(code: string): string {
  return errorMap[code] || errorMap.default;
}
