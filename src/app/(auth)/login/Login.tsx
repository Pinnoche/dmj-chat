"use client";

// import Image from "next/image";
import { RiArrowRightSLine, RiLoader4Line } from "@remixicon/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Metadata } from "next";
import { getErrorMessage } from "@/lib/common";
import { useState } from "react";
import { apiClient } from "@/lib/api-client";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginContent() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const res = await apiClient.post("/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      setFormData({ email: "", password: "" });
      setIsSubmitting(false);
      toast.success("Welcome back, Cracked Degener 😁");
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      console.error("Login failed:", error);
      const err = getErrorMessage(error);
      setIsSubmitting(false);
      toast.error(err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <section className="relative min-h-screen bg-secondary flex items-center justify-center px-4">
      <section className="w-full max-w-[820px]">
        <section className="relative z-10 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-10 text-text-primary shadow-xl">
          <form
            className="mx-auto w-full max-w-[440px] space-y-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex rounded-xl bg-white/5 p-1">
              <Link
                href="/signup"
                className="flex-1 text-center rounded-lg py-2 text-sm font-semibold text-text-secondary hover:text-white transition"
              >
                Register
              </Link>

              <button
                type="button"
                className="flex-1 rounded-lg py-2 text-sm font-semibold bg-primary text-text-secondary hover:text-white transition"
              >
                Login
              </button>
            </div>

            <div className="space-y-4 text-center">
              <h2 className="text-2xl md:text-[28px] font-semibold">
                Welcome Back
              </h2>
              <p className="text-base text-text-secondary">
                Login to continue to your dashboard
              </p>
            </div>

            <div className="space-y-5">
              <div className="space-y-1">
                <label className="text-sm font-medium text-text-primary">
                  Email
                </label>
                <input
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-text-primary">
                  Password
                </label>
                <input
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-text-primary placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  type="password"
                  onChange={handleChange}
                />

                <Link
                  href="#"
                  className="text-xs text-text-primary hover:text-text-secondary transition inline-block"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-common py-3 text-sm font-semibold text-secondary transition hover:opacity-90 disabled:opacity-60"
                type="submit"
                disabled={isSubmitting}
                onClick={handleSubmit}
              >
                {isSubmitting && (
                  <RiLoader4Line className="h-5 w-5 animate-spin" />
                )}
                <span>Login</span>
                {!isSubmitting && <RiArrowRightSLine className="h-4 w-4" />}
              </button>
            </div>
          </form>
        </section>
      </section>
    </section>
  );
}
