'use client';

import Link from "next/link";
import React, { useState, FormEvent } from "react";
import { toast } from 'react-toastify';
import axios from "@/core/dataFetchingConfigs/axiosGlobalConfig";
import { useRouter } from "next/router";

interface SignUpFormState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignUp() {
  const [formState, setFormState] = useState<SignUpFormState>({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errMsg, setErrMsg] = useState<string>("");
  const router = useRouter();
  const [showPasswordEyeBtn, setShowPasswordEyeBtn] = useState(false);

  const handleEyeBtn = (e) => {
    const isChecked = e.target.checked;
    setShowPasswordEyeBtn(isChecked);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formState;

    try {
      if (password !== confirmPassword) {
        setErrMsg("Passwords do not match");
        return;
      }

      const response = await axios.post("/auth/signUp", {
        name,
        email,
        password,
      });

      if (response.status === 201) {
        console.log("Sign Up success", response.data);
        setErrMsg("");
        toast.success("Sign Up Successful, Login Now");
        router.replace("/login");
      }
      console.log("Form submitted", { email, password });
    } catch (error) {
      console.log("Sign up error", error);
      setErrMsg("Sign Up Failed");
    }
  };

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="text-[20px] text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Welcome to <span className="text-blue-500">Workflo!</span>
            </div>
            <form className="space-y-2 md:space-y-3" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Jon Doe"
                  required
                  value={formState.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="name@company.com"
                  required
                  value={formState.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  type={showPasswordEyeBtn ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                  value={formState.password}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Confirm password
                </label>
                <input
                  type={showPasswordEyeBtn ? "text" : "password"}
                  name="confirmPassword"
                  id="confirm-password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                  value={formState.confirmPassword}
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    name="eyeBtn"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                    checked={showPasswordEyeBtn}
                    onChange={handleEyeBtn}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="font-light text-gray-500"
                  >
                    Show Password
                  </label>
                </div>
              </div>
              {errMsg && (
                <p className="text-sm font-light text-red-500">
                  {errMsg}
                </p>
              )}
              <button
                type="submit"
                className="btn btn-back mt-4"
              >
                Sign Up
              </button>
              <p className="text-sm font-light text-gray-500">
                Already have an account?{" "}
                <Link
                  href="/login"
                  style={{ textDecoration: 'none' }}
                  className="font-medium text-primary-600 hover:underline"
                >
                  Log in.
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
