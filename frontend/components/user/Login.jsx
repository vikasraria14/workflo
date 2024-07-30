import { useRef, useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "../../core/dataFetchingConfigs/axiosGlobalConfig";
import { useRouter } from "next/router";
import Image from "next/image";
import { EyeIcon } from "../../assets/GlobalIcons";

export default function Login() {
  const router = useRouter();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("auth/login", {
        email: email,
        password: password,
      });
      if (response.data) {
        console.log("login succsess", response.data);
        const user = response.data;
        Cookies.set("user", JSON.stringify(user));
        setEmail("");
        setPassword("");
        router.replace(router.query.from || "/");
      }
    } catch (err) {
      if (!err?.response) {
        console.log(err);
        setErrMsg("No Server Response");
      } else if (err.response?.status === 401) {
        setErrMsg(err.response?.data.message);
      } else {
        setErrMsg("Login Failed");
      }
    }
  };
  return (
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          class="mx-auto h-10 w-auto"
          src="next.svg"
          alt="Your Company"
          width={80}
          height={100}
        />
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              for="email"
              class="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div class="mt-2">
              <input
                autocomplete="email"
                required
                className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                label="Email ID"
                id="login-email-field"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label
                for="password"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div class="text-sm">
                <a
                  href="#"
                  class="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  {errMsg && errMsg}
                </a>
              </div>
            </div>
            <div class="mt-2">
              <input
                id="outlined-required login-password-field"
                label="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
                type="password"
                autocomplete="current-password"
                class="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
