import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { mapAuthCodeToMessage } from "../utils/firebaseErrors";
import { useNavigate, useLocation } from "react-router-dom";

export default function SignIn() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const from = location.state?.from?.pathname || "/dashboard";

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signIn(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(mapAuthCodeToMessage(err.code));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-6">Sign in to NovaTech</h2>
        {error && <div className="text-sm text-red-600 mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg"
            type="email"
            required
          />
          <input
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg"
            type="password"
            required
          />
          <button
            className="w-full py-3 rounded-lg bg-indigo-600 text-white font-medium"
            type="submit"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
        <div className="text-sm text-center mt-4">
          <a href="/reset-password" className="text-indigo-600">
            Forgot password?
          </a>
        </div>
      </div>
    </div>
  );
}
