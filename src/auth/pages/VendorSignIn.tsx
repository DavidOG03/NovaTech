"use client";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../context/AuthContext";
import { mapAuthCodeToMessage } from "../../utils/firebaseErrors";
import { FirebaseError } from "firebase/app";
import { useNavigate, Link } from "react-router";

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VendorSignInFormData>({
    resolver: zodResolver(schema),
  });

  const [theme, setTheme] = useState<string>(
    localStorage.getItem("theme") || "light",
  );

  useEffect(() => {
    // Update theme state whenever theme changes
    const handleThemeChange = () => {
      setTheme(localStorage.getItem("theme") || "light");
    };

    window.addEventListener("storage", handleThemeChange);

    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      setTheme(isDark ? "dark" : "light");
    });
    observer.observe(document.documentElement, { attributes: true });

    return () => {
      window.removeEventListener("storage", handleThemeChange);
      observer.disconnect();
    };
  }, []);

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
    <div className="flex flex-col items-center justify-center h-screen bg-grey">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-3xl shadow-lg w-full max-w-sm space-y-4 flex flex-col items-center justify-center"
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
        <h2 className="text-xl font-bold text-center text-black">
          Vendor Sign In
        </h2>
        <p className="text-sm text-light-black text-center">
          Access your vendor dashboard
        </p>

        {/* Full Name */}
        <input
          type="text"
          placeholder="Full Name"
          {...register("fullName")}
          className="w-full px-3 py-2 border rounded-3xl bg-grey focus:outline-none focus:ring-2 focus:ring-pink"
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
            className="w-full px-3 py-2 border rounded-3xl bg-grey focus:outline-none focus:ring-2 focus:ring-pink"
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
          className="w-full bg-pink text-white py-2 rounded-3xl hover:bg-pink/75 transition-colors font-semibold"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>

        {/* Error */}
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <span className="text-black text-sm">
          Don't have a vendor account?{" "}
          <Link
            to="/vendor/signup"
            className="text-pink hover:underline font-semibold"
          >
            Sign Up
          </Link>
        </span>
      </form>
    </div>
  );
};

export default VendorSignIn;
