import "@/styles/globals.css";
import "@/styles/button.css";
import '@/styles/select.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from "js-cookie";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import dynamic from "next/dynamic";
import Head from "next/head";
import {store} from '@/redux/store'
import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Provider } from "react-redux";

const LayoutComponent = dynamic(() => import("@/components/layout/Index.tsx"), {
  ssr: false,
});

interface AuthContextType {
  userInfo: object;
}

export const AuthContext = createContext<AuthContextType>({ userInfo: {} });

export default function App({ Component, pageProps }: AppProps) {
  const userId = Cookies.get("user");
  const [userInfo, setUserInfo] = useState<object>({});

  useEffect(() => {
    if (userId) {
      setUserInfo(JSON.parse(userId));
    }
  }, [userId]);

   const router = useRouter();

  const isLoginPage = router.pathname === "/login" || router.pathname === "/signup";

  return (
    <>
      <Head>
        <title>FJM</title>
        <link rel="icon" href="/FJM-Logo.ico" />
      </Head>
      <Provider store={store}>
      <AuthContext.Provider value={{ userInfo }}>
        <LayoutComponent hideNavbar={isLoginPage} hideSidebar={isLoginPage}>
          <Component {...pageProps} />
          <ToastContainer
            position="bottom-left"
            autoClose={2000}
            limit={1}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </LayoutComponent>
      </AuthContext.Provider>
      </Provider>
    </>
  );
}
