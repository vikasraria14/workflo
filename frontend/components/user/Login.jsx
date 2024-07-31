import { useRef, useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "../../core/dataFetchingConfigs/axiosGlobalConfig";
import { useRouter } from "next/router";
import Link from "next/link";



export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [showPasswordEyeBtn, setShowPasswordEyeBtn] = useState(false);

  const handleEyeBtn = (e) => {
    const isChecked = e.target.checked
    setShowPasswordEyeBtn(isChecked);
  };

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    console.log("d")
    e.preventDefault();
    try {
      const response = await axios.post("auth/login", {
        email: email,
        password: password,
      });
      if (response.data) {
        console.log("login success", response.data);
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
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        {/* IMAGE HERE */}
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="text-[20px] text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Welcome to <span className="text-blue-500">Workflo!</span>
            </div>
            <form className="space-y-2 md:space-y-3" onSubmit={handleSubmit}>
              <div>
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                />
              </div>
              <div>
                <label
                  for="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type={showPasswordEyeBtn ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    name="eyeBtn"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    checked={showPasswordEyeBtn}
                    onChange={handleEyeBtn}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="font-light text-gray-500 dark:text-gray-300"
                  >
                    Show Password{" "}
                  </label>
                </div>
              </div>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                {errMsg && errMsg}
              </p>
              <button
                type="submit"
                className='btn btn-back'
              >
                 Login
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Don't have an account? Create a <Link href="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500 " style={{textDecoration:'none'}}>new account</Link>
                  </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
