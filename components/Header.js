import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { BiTask, BiNetworkChart, BiLineChart } from "react-icons/bi";
import { CgHomeAlt } from "react-icons/cg";
import { IoCalendarOutline } from "react-icons/io5";
import { BsGear } from "react-icons/bs";
import { HiLogout } from "react-icons/hi";
import { AiOutlineBars } from "react-icons/ai";
import { useWindow } from "../hooks/getWindow";
import Image from "next/image";

const Header = (props) => {
  const { isNavOpen, setIsNavOpen, isLoggedIn } = props;
  const router = useRouter();
  const { width } = useWindow();
  const [route, setRoute] = useState(router.asPath);
  const [settings, setSettings] = useState(false);
  useEffect(() => {
    setRoute(router.asPath);
  }, [router.asPath]);
  const fireLogOut = () => {
    localStorage.removeItem("auth-token");
    router.reload();
  };
  return (
    <>
      {width >= 1024 ? (
        <div className="w-full flex items-center justify-between border-b h-[10vh]">
          {route == "/" && (
            <div className="flex justify-start items-center text-2xl w-full px-4">
              <span>
                <CgHomeAlt className="mr-2" />
              </span>
              <span>Home</span>
            </div>
          )}
          {route == "/tasks" && (
            <div className="flex justify-start items-center text-2xl w-full px-4">
              <span>
                <BiTask className="mr-2" />
              </span>
              <span>Tasks</span>
            </div>
          )}
          {route == "/challenges" && (
            <div className="flex justify-start items-center text-2xl w-full px-4">
              <span>
                <BiNetworkChart className="mr-2" />
              </span>
              <span>Challenges</span>
            </div>
          )}
          {route == "/tracker" && (
            <div className="flex justify-start items-center text-2xl w-full px-4">
              <span>
                <BiLineChart className="mr-2" />
              </span>
              <span>Tracker</span>
            </div>
          )}
          {route == "/calendar" && (
            <div className="flex justify-start items-center text-2xl w-full px-4">
              <span>
                <IoCalendarOutline className="mr-2" />
              </span>
              <span>Calendar</span>
            </div>
          )}
          <button
            onClick={() => setSettings(!settings)}
            onBlur={() => setSettings(false)}
            className="relative p-[9px] mx-4 rounded-full cursor-pointer bg-gray-100  flex items-center justify-center"
          >
            <BsGear className="text-base" />
            {settings && (
              <div className="absolute z-[5] w-[120px] top-[120%] right-[20%] rounded-md bg-white shadow-md">
                {isLoggedIn && (
                  <div
                    onClick={() => fireLogOut()}
                    className="w-full flex items-center hover:bg-gray-50 px-2 py-2 rounded-md"
                  >
                    <span>
                      <HiLogout className="rotate-180 mr-2" fill="#ef233c" />
                    </span>
                    <span className="font-semibold">Log Out</span>
                  </div>
                )}
                {!isLoggedIn && (
                  <div
                    onClick={() => router.push("/login")}
                    className="w-full flex items-center hover:bg-gray-50 px-2 py-2 rounded-md"
                  >
                    <span>
                      <HiLogout className="mr-2" fill="green" />
                    </span>
                    <span className="font-semibold">Log In</span>
                  </div>
                )}
              </div>
            )}
          </button>
          {!isNavOpen && (
            <span
              onClick={() => setIsNavOpen(true)}
              className="cursor-pointer p-2.5 bg-gray-100 rounded-full mr-4"
            >
              <AiOutlineBars className="text-sm" />
            </span>
          )}
        </div>
      ) : (
        <div className="w-full flex items-center justify-between border-b h-[10vh]">
          <div className="flex items-center">
            <span>
              <Image src="/assets/logo.png" width={40} height={40} alt="Logo" />
            </span>
            <span className="text-xl font-semibold tracking-wide font-mono">
              Taskify
            </span>
          </div>
          <button
            onClick={() => setSettings(!settings)}
            onBlur={() => setSettings(false)}
            className="relative p-[9px] mx-4 rounded-full cursor-pointer bg-gray-100  flex items-center justify-center"
          >
            <BsGear className="text-base" />
            {settings && (
              <div className="absolute z-[5] w-[120px] top-[120%] right-[20%] rounded-md bg-white shadow-md">
                {isLoggedIn && (
                  <div
                    onClick={() => fireLogOut()}
                    className="w-full flex items-center hover:bg-gray-50 px-2 py-2 rounded-md"
                  >
                    <span>
                      <HiLogout className="rotate-180 mr-2" fill="#ef233c" />
                    </span>
                    <span className="font-semibold">Log Out</span>
                  </div>
                )}
                {!isLoggedIn && (
                  <div
                    onClick={() => router.push("/login")}
                    className="w-full flex items-center hover:bg-gray-50 px-2 py-2 rounded-md"
                  >
                    <span>
                      <HiLogout className="mr-2" fill="green" />
                    </span>
                    <span className="font-semibold">Log In</span>
                  </div>
                )}
              </div>
            )}
          </button>
        </div>
      )}
    </>
  );
};

export default Header;
