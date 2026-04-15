interface FirebaseErrorMap {
  [key: string]: string;
}

const errorMap: FirebaseErrorMap = {
  "auth/email-already-in-use":
    "This email is already registered. Try signing in.",
  "auth/invalid-email": "Please enter a valid email address.",
  "auth/weak-password": "Password should be at least 6 characters.",
  "auth/wrong-password": "Wrong password. Try again or reset it.",
  "auth/user-not-found": "No account found with this email.",
  "auth/too-many-requests": "Too many attempts. Please try again later.",
  "permission-denied":
    "You do not have permission to access this Firestore data.",
  "firestore/permission-denied":
    "You do not have permission to access this Firestore data.",
  default: "An unexpected error occurred. Please try again.",
};

export function mapAuthCodeToMessage(code: string): string {
  return errorMap[code] || errorMap.default;
}

export function mapFirebaseCodeToMessage(code: string): string {
  return errorMap[code] || errorMap.default;
}
