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
import { useTheme } from "@/hooks/useTheme";
import { EyeIcon, EyeOffIcon } from "../../constants/icons";

// ✅ Validation Schema
const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignUpFormData = z.infer<typeof schema>;

// ✅ Avatar Generator
function generateInitialsAvatar(name: string): string {
  const initials = encodeURIComponent(name);
  return `https://ui-avatars.com/api/?name=${initials}&background=random`;
}

const SignUp: React.FC = () => {
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
  } = useForm<SignUpFormData>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    dispatch(setLoading(true));
    try {
      // Use AuthContext's signUp with role: "buyer"
      const userCredential = await authSignUp(
        data.email,
        data.password,
        "buyer",
        {
          name: data.name,
          photoURL: generateInitialsAvatar(data.name),
        },
      );

      // ✅ Construct safe user object
      const firebaseUser = userCredential.user;
      const safeUser = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: data.name,
        photoURL: generateInitialsAvatar(data.name),
      };

      // ✅ Save to localStorage
      localStorage.setItem("username", data.name);
      localStorage.setItem("email", data.email);
      localStorage.setItem("selectedAccountType", "buyer");

      // ✅ Update Redux store
      dispatch(setUser(safeUser));

      // ✅ Redirect to products
      navigate("/products");
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
        <div className="w-8 h-8 border-5 border-accent-light rounded-full animate-spin "></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-color">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-color mb-10 rounded-3xl w-full max-w-sm space-y-4 flex flex-col items-center justify-center"
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
        <h2 className="text-xl font-semibold text-center text-text">Sign Up</h2>

        {/* Name */}
        <input
          type="text"
          placeholder="Name"
          {...register("name")}
          className="input"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}

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
          {loading ? "Loading..." : "Sign Up"}
        </button>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <p>
          Already have an account?{" "}
          <Link to="/signin" className="text-accent-light hover:underline">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
