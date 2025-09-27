import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { mapAuthCodeToMessage } from "../utils/firebaseErrors";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!email || !password)
      return setError("Email and password are required.");
    if (password.length < 6)
      return setError("Password must be at least 6 characters.");
    setLoading(true);
    try {
      await signUp(email, password, { displayName: "" });
      navigate("/dashboard");
    } catch (err) {
      setError(mapAuthCodeToMessage(err.code));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-6">
          Create your NovaTech account
        </h2>
        {error && <div className="text-sm text-red-600 mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full px-4 py-3 border rounded-lg focus:outline-none"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />
          <input
            className="w-full px-4 py-3 border rounded-lg focus:outline-none"
            placeholder="Password (min 6 chars)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
          />
          <button
            className="w-full py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700"
            disabled={loading}
            type="submit"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>
        <div className="text-sm text-center mt-4">
          Already have an account?{" "}
          <a href="/signin" className="text-indigo-600">
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
}
