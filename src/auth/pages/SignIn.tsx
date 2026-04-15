"use client";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../context/AuthContext";
import { mapAuthCodeToMessage } from "../../utils/firebaseErrors";
import { FirebaseError } from "firebase/app";
import { useNavigate } from "react-router";
import { useTheme } from "@/hooks/useTheme";

// Define schema with Zod
const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Infer TypeScript type from schema
type SignInFormData = z.infer<typeof schema>;

const SignIn: React.FC = () => {
  const [showPassword, setShowPassword] = useState<Boolean>(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login, userProfile } = useAuth();
  const theme = useTheme();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(schema),
  });

  // Explicit typing for submit handler
  const onSubmit: SubmitHandler<SignInFormData> = async (data) => {
    setLoading(true);
    setError("");
    try {
      await login(data.email, data.password);
      const nextRole = userProfile?.activeRole || userProfile?.role || "buyer";
      localStorage.setItem(
        "selectedAccountType",
        nextRole === "vendor" ? "vendor" : "buyer",
      );
      nextRole === "vendor"
        ? navigate("/seller-dashboard")
        : navigate("/products");
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        const message = mapAuthCodeToMessage(err.code);
        setError(message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-light-black/25">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-grey p-6 rounded-3xl shadow-lg w-full max-w-sm space-y-4 flex flex-col items-center justify-center"
      >
        <img
          src={
            theme === "dark"
              ? "/images/novatech-light.webp"
              : "/images/novatech.svg"
          }
          alt="NovaTech Logo"
          className="h-8"
        />
        <h2 className="text-xl font-bold text-center text-light-black">
          Sign In
        </h2>
        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          {...register("email")}
          className="w-full px-3 py-2 border border-light-black/25 rounded-3xl bg-grey text-light-black focus:outline-none focus:ring-2 focus:ring-pink"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
        {/* Password */}
        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            {...register("password")}
            className="w-full px-3 py-2 border border-light-black/25 rounded-3xl bg-grey text-light-black focus:outline-none focus:ring-2 focus:ring-pink"
            autoComplete="current-password"
          />
          <span
            role="button"
            aria-label="show or hide password"
            className="absolute top-1/2 right-4 -translate-y-1/2 p-2 cursor-pointer"
            onClick={togglePassword}
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M2 5.27L3.28 4L20 20.72L18.73 22l-3.08-3.08c-1.15.38-2.37.58-3.65.58c-5 0-9.27-3.11-11-7.5c.69-1.76 1.79-3.31 3.19-4.54zM12 9a3 3 0 0 1 3 3a3 3 0 0 1-.17 1L11 9.17A3 3 0 0 1 12 9m0-4.5c5 0 9.27 3.11 11 7.5a11.8 11.8 0 0 1-4 5.19l-1.42-1.43A9.86 9.86 0 0 0 20.82 12A9.82 9.82 0 0 0 12 6.5c-1.09 0-2.16.18-3.16.5L7.3 5.47c1.44-.62 3.03-.97 4.7-.97M3.18 12A9.82 9.82 0 0 0 12 17.5c.69 0 1.37-.07 2-.21L11.72 15A3.064 3.064 0 0 1 9 12.28L5.6 8.87c-.99.85-1.82 1.91-2.42 3.13"
                ></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 9a3 3 0 0 1 3 3a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3m0-4.5c5 0 9.27 3.11 11 7.5c-1.73 4.39-6 7.5-11 7.5S2.73 16.39 1 12c1.73-4.39 6-7.5 11-7.5M3.18 12a9.821 9.821 0 0 0 17.64 0a9.821 9.821 0 0 0-17.64 0"
                ></path>
              </svg>
            )}
          </span>
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-pink text-white py-2 rounded-3xl hover:bg-pink/75"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
        {/* Error */}
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <span className="text-light-black">
          No account?{" "}
          <a href="/signup" className="text-pink hover:underline">
            Sign Up
          </a>
        </span>
      </form>
    </div>
  );
};

export default SignIn;
