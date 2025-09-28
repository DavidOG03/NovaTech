"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, FirebaseAuthError } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setError, setLoading } from "../stores/authSlice";
import { RootState } from "../stores/store";
import { mapAuthCodeToMessage } from "../utils/firebaseErrors";
import { FirebaseError } from "firebase/app";
import { useNavigate } from "react-router";

// Define schema with Zod
const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Infer TypeScript type from schema
type SignInFormData = z.infer<typeof schema>;

const SignIn: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(schema),
  });

  // Explicit typing for submit handler
  const onSubmit: SubmitHandler<SignInFormData> = async (data) => {
    dispatch(setLoading(true));
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      dispatch(setUser(userCredential.user));

      navigate("/"); // Redirect to dashboard or home after sign in
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        // Use your helper to map code → message
        const message = mapAuthCodeToMessage(err.code);
        dispatch(setError(message));
      } else {
        dispatch(setError("An unknown error occurred"));
      }
    } finally {
      dispatch(setLoading(false));
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <img src="/images/novatech.svg" alt="novatech logo" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Sign In</h2>
        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          {...register("email")}
          className="w-full px-3 py-2 border rounded"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
          className="w-full px-3 py-2 border rounded"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-pink text-white py-2 rounded hover:bg-pink/75"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
        {/* Error */}
        {error && <p className="text-red-500 text-sm">{error}</p>}
        No account?{" "}
        <a href="/signup" className="text-pink hover:underline">
          Sign Up
        </a>
      </form>
    </div>
  );
};

export default SignIn;
