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
import { EyeIcon, EyeOffIcon } from "../../constants/icons";

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
    } catch (err: any) {
      if (err.code) {
        setError(mapAuthCodeToMessage(err.code));
      } else if (err instanceof Error) {
        setError(err.message);
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
    <div className="flex flex-col items-center justify-center h-screen bg-color">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-color mb-10 rounded-lg w-full max-w-sm space-y-4 flex flex-col items-center justify-center"
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
        <h2 className="text-xl font-semibold text-center text-text">Sign In</h2>
        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          {...register("email")}
          className="input"
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
            className="input"
            autoComplete="current-password"
          />
          <button
            type="button"
            aria-label="show or hide password"
            className="absolute top-1/2 right-4 -translate-y-1/2 p-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent-light rounded-full"
            onClick={togglePassword}
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-accent-light text-white py-2 rounded-lg hover:bg-accent-light/75"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
        {/* Error */}
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <span className="text-accent-secondary">
          No account?{" "}
          <a href="/signup" className="text-accent-light hover:underline">
            Sign Up
          </a>
        </span>
      </form>
    </div>
  );
};

export default SignIn;
