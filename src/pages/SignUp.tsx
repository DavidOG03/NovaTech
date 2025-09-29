"use client";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setError, setLoading } from "../stores/authSlice";
import { RootState } from "../stores/store";
import { useNavigate } from "react-router";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignUpFormData = z.infer<typeof schema>;

const SignUp: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    dispatch(setLoading(true));
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      dispatch(setUser(userCredential.user));
      navigate("/"); // Redirect to dashboard or home after sign up
    } catch (err: unknown) {
      if (err instanceof Error) {
        dispatch(setError(err.message));
      } else {
        dispatch(setError("An unknown error occurred"));
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm space-y-4 flex flex-col items-center justify-center"
      >
        <img src="/images/novatech.svg" alt="Novatech Logo" className="mb-6" />
        <h2 className="text-xl font-bold text-center">Sign Up</h2>

        <input
          type="email"
          placeholder="Email"
          {...register("email")}
          className="w-full px-3 py-2 border rounded"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        <input
          type="password"
          placeholder="Password"
          {...register("password")}
          className="w-full px-3 py-2 border rounded"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-pink text-white py-2 rounded hover:bg-pink/75"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        <p>
          Already have an account?{" "}
          <a href="/signin" className="text-pink hover:underline">
            Sign In
          </a>
        </p>
      </form>
    </div>
  );
};
export default SignUp;
