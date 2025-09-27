
export function mapAuthCodeToMessage(code) {
    switch (code) {
        case "auth/email-already-in-use":
            return "This email is already registered. Try signing in.";
        case "auth/invalid-email":
            return "Please enter a valid email address.";
        case "auth/weak-password":
            return "Password should be at least 6 characters.";
        case "auth/wrong-password":
            return "Wrong password. Try again or reset it.";
        case "auth/user-not-found":
            return "No account found with this email.";
        case "auth/too-many-requests":
            return "Too many attempts. Please try again later.";
        default:
            return "An unexpected error occurred. Please try again.";
    }
}
