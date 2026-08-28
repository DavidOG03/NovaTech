"use client";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setError, setLoading } from "../../redux/slices/authSlice";
import { RootState } from "../../redux/store";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { mapAuthCodeToMessage } from "../../utils/firebaseErrors";
import { EyeIcon, EyeOffIcon } from "../../constants/icons";

import { useTheme } from "@/hooks/useTheme";

// ✅ Validation Schema
const schema = z.object({
  businessName: z.string().min(2, "Business name is required"),
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type VendorSignUpFormData = z.infer<typeof schema>;

// ✅ Avatar Generator
function generateInitialsAvatar(name: string): string {
  const initials = encodeURIComponent(name);
  return `https://ui-avatars.com/api/?name=${initials}&background=random`;
}

const VendorSignUp: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const { signUp: authSignUp } = useAuth();
  const theme = useTheme();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VendorSignUpFormData>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<VendorSignUpFormData> = async (data) => {
    dispatch(setLoading(true));
    try {
      // Use AuthContext's signUp with role: "vendor"
      const userCredential = await authSignUp(
        data.email,
        data.password,
        "vendor",
        {
          name: data.fullName,
          photoURL: generateInitialsAvatar(data.fullName),
          storeName: data.businessName,
          storeDescription: "",
          phoneNumber: data.phoneNumber,
        },
      );

      // ✅ Construct safe user object
      const firebaseUser = userCredential.user;
      const safeUser = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: data.fullName,
        photoURL: generateInitialsAvatar(data.fullName),
      };

      // ✅ Save to localStorage
      localStorage.setItem("username", data.fullName);
      localStorage.setItem("email", data.email);
      localStorage.setItem("businessName", data.businessName);
      localStorage.setItem("phoneNumber", data.phoneNumber);
      localStorage.setItem("userRole", "vendor");
      localStorage.setItem("selectedAccountType", "vendor");

      // ✅ Update Redux store
      dispatch(setUser(safeUser));

      // ✅ Redirect to vendor dashboard
      navigate("/seller-dashboard");
    } catch (err: any) {
      if (err.code) {
        dispatch(setError(mapAuthCodeToMessage(err.code)));
      } else if (err instanceof Error) {
        dispatch(setError(err.message));
      } else {
        dispatch(setError("An unknown error occurred"));
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  const togglePassword = () => setShowPassword(!showPassword);

  if (loading) {
    return (
      <div className="w-full min-h-screen grid place-items-center">
        <div className="w-8 h-8 border-5 border-accent-light rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-color py-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-color p-6 rounded-3xl w-full max-w-sm space-y-4 flex flex-col items-center justify-center"
      >
        <img
          src={
            theme === "dark"
              ? "/images/novatech-light.webp"
              : "/images/novatech.svg"
          }
          alt="Novatech Logo"
          className="mb-4 h-6"
        />
        <h2 className="text-xl font-bold text-center text-accent-secondary">
          Vendor Sign Up
        </h2>
        <p className="text-sm text-dim text-center">
          Join us as a vendor partner
        </p>

        {/* Business Name */}
        <input
          type="text"
          placeholder="Business Name"
          {...register("businessName")}
          className="input"
        />
        {errors.businessName && (
          <p className="text-red-500 text-sm">{errors.businessName.message}</p>
        )}

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

        {/* Email */}
        <input
          type="email"
          placeholder="Email Address"
          {...register("email")}
          className="input"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        {/* Phone Number */}
        <input
          type="tel"
          placeholder="Phone Number"
          {...register("phoneNumber")}
          className="input"
        />
        {errors.phoneNumber && (
          <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
        )}

        {/* Password */}
        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            {...register("password")}
            className="input"
            autoComplete="new-password"
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
          className="w-full bg-accent-light text-white py-2 rounded-lg cursor-pointer hover:bg-accent-light/75"
        >
          {loading ? "Creating Account..." : "Create Vendor Account"}
        </button>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <p className="text-accent-secondary">
          Already have an account?{" "}
          <Link
            to="/vendor/signin"
            className="text-accent-light hover:underline font-semibold"
          >
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default VendorSignUp;
