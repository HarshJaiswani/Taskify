import React, { useState, useEffect } from "react";
import "../styles/globals.css";
import Router from "next/router";
import { useRouter } from "next/router";
import Head from "next/head";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Login from "./login";
import Signup from "./signup";
import Image from "next/image";
import { DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { useWindow } from "../hooks/getWindow";
import MobileNav from "../components/MobileNav";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const nonProtectedRoutes = ["/signup", "/"];
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const { width } = useWindow();

  useEffect(() => {
    let authToken = localStorage.getItem("auth-token");
    if (authToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  const capitalise = (a) => {
    return a.charAt(0).toUpperCase() + a.slice(1);
  };

  useEffect(() => {
    Router.events.on("routeChangeStart", () => {
      setLoading(true);
    });
    Router.events.on("routeChangeComplete", () => {
      setLoading(false);
    });
  });

  const opts = {
    enableMouseEvents: true,
  };

  return (
    <DndProvider backend={TouchBackend} options={opts}>
      <Head>
        <title>
          {router.pathname.toUpperCase().replace("/", "") == ""
            ? "Home - Taskify"
            : `${capitalise(router.pathname.replace("/", ""))} - Taskify`}
        </title>
      </Head>
      {isLoggedIn && (
        <div className="flex w-full">
          {width >= 1024 ? (
            <Navbar
              isLoggedIn={isLoggedIn}
              isNavOpen={isNavOpen}
              setIsNavOpen={setIsNavOpen}
            />
          ) : (
            <MobileNav />
          )}
          <div
            className={`${
              width >= 1024 ? `${isNavOpen ? "w-[80%]" : "w-full"}` : `w-full`
            } h-screen`}
          >
            <Header
              isLoggedIn={isLoggedIn}
              isNavOpen={isNavOpen}
              setIsNavOpen={setIsNavOpen}
            />
            <div className="w-full h-[90vh] overflow-x-hidden overflow-y-auto">
              {loading ? (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="flex items-center scale-150">
                    <span>
                      <Image
                        src="/assets/logo.png"
                        width={40}
                        height={40}
                        alt="Logo"
                      />
                    </span>
                    <span className="text-xl font-semibold tracking-wide font-mono">
                      Taskify
                    </span>
                  </div>
                </div>
              ) : (
                <Component {...pageProps} isLoggedIn={isLoggedIn} />
              )}
            </div>
            {width <= 1024 && <div className="w-full h-[10vh]"></div>}
          </div>
        </div>
      )}
      {!isLoggedIn && router.asPath == "/" && (
        <div className="flex w-full">
          {width >= 1024 ? (
            <Navbar
              isLoggedIn={isLoggedIn}
              isNavOpen={isNavOpen}
              setIsNavOpen={setIsNavOpen}
            />
          ) : (
            <MobileNav />
          )}
          <div
            className={`${
              width >= 1024 ? `${isNavOpen ? "w-[80%]" : "w-full"}` : `w-full`
            } h-screen`}
          >
            <Header
              isLoggedIn={isLoggedIn}
              isNavOpen={isNavOpen}
              setIsNavOpen={setIsNavOpen}
            />
            <div className="w-full h-[90vh] overflow-x-hidden overflow-y-auto">
              {loading ? (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="flex items-center scale-150">
                    <span>
                      <Image
                        src="/assets/logo.png"
                        width={40}
                        height={40}
                        alt="Logo"
                      />
                    </span>
                    <span className="text-xl font-semibold tracking-wide font-mono">
                      Taskify
                    </span>
                  </div>
                </div>
              ) : (
                <Component {...pageProps} isLoggedIn={isLoggedIn} />
              )}
            </div>
          </div>
        </div>
      )}
      {!isLoggedIn && !nonProtectedRoutes.includes(router.asPath) && (
        <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      )}
      {!isLoggedIn && router.asPath == "/signup" && (
        <Signup isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      )}
    </DndProvider>
  );
}

export default MyApp;
