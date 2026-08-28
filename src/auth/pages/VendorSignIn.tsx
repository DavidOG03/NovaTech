"use client";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../context/AuthContext";
import { mapAuthCodeToMessage } from "../../utils/firebaseErrors";
import { useNavigate, Link } from "react-router";
import { EyeIcon, EyeOffIcon } from "../../constants/icons";
import { useTheme } from "@/hooks/useTheme";

// Define schema with Zod
const schema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Infer TypeScript type from schema
type VendorSignInFormData = z.infer<typeof schema>;

const VendorSignIn: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const theme = useTheme();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VendorSignInFormData>({
    resolver: zodResolver(schema),
  });

  // Explicit typing for submit handler
  const onSubmit: SubmitHandler<VendorSignInFormData> = async (data) => {
    setLoading(true);
    setError("");
    try {
      // For vendor sign in with full name, we need to find the email from storage or use an alternative approach
      const storedEmail = localStorage.getItem("email");

      if (!storedEmail) {
        setError("No vendor account found. Please sign up first.");
        setLoading(false);
        return;
      }

      // Sign in using email and password
      await login(storedEmail, data.password);

      // Verify the logged-in user's name matches
      const storedName = localStorage.getItem("username");
      if (storedName !== data.fullName) {
        setError("Full name or password incorrect");
        return;
      }

      localStorage.setItem("selectedAccountType", "vendor");
      navigate("/seller-dashboard");
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
        className="bg-color p-6 rounded-3xl w-full max-w-sm space-y-4 flex flex-col items-center justify-center"
      >
        {theme === "dark" ? (
          <img
            src="/images/novatech-light.webp"
            alt="Novatech logo"
            className="h-6"
          />
        ) : (
          <img src="/images/novatech.svg" alt="Novatech logo" className="h-6" />
        )}
        <h2 className="text-xl font-bold text-center text-accent-secondary">
          Vendor Sign In
        </h2>
        <p className="text-sm text-dim text-center">
          Access your vendor dashboard
        </p>

        {/* Full Name */}
        <input
          type="text"
          placeholder="Full Name"
          {...register("fullName")}
          className="input"
        />
        {errors.fullName && (
          <p className="text-red-500 text-sm">{errors.fullName.message}</p>
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
          className="w-full bg-accent-light text-white py-2 rounded-xl hover:bg-accent-light/75"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>

        {/* Error */}
        {error && <p className="text-important text-sm text-center">{error}</p>}

        <span className="text-accent-secondary">
          Don't have a vendor account?{" "}
          <Link
            to="/vendor/signup"
            className="text-accent-light hover:underline font-semibold"
          >
            Sign Up
          </Link>
        </span>
      </form>
    </div>
  );
};

export default VendorSignIn;
