import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { BiTask, BiNetworkChart, BiLineChart } from "react-icons/bi";
import { CgHomeAlt } from "react-icons/cg";
import { IoCalendarOutline } from "react-icons/io5";
import { BsHeartFill } from "react-icons/bs";
import { AiOutlineDoubleRight } from "react-icons/ai";

const Navbar = (props) => {
  const { isNavOpen, setIsNavOpen } = props;
  const router = useRouter();
  const navigations = [
    {
      icon: <CgHomeAlt className="text-xl mx-4" />,
      name: "Home",
      href: "/",
    },
    {
      icon: <BiTask className="text-xl mx-4" />,
      name: "Tasks",
      href: "/tasks",
    },
    {
      icon: <BiNetworkChart className="text-xl mx-4" />,
      name: "Challenges",
      href: "/challenges",
    },
    {
      icon: <BiLineChart className="text-xl mx-4" />,
      name: "Tracker",
      href: "/tracker",
    },
    {
      icon: <IoCalendarOutline className="text-xl mx-4" />,
      name: "Calendar",
      href: "/calendar",
    },
  ];
  return (
    <>
      {isNavOpen ? (
        <div className="relative w-[20%] min-h-screen border-r bg-white">
          <div className="w-full border-b px-2 py-2 flex items-center justify-between">
            <div className="flex items-center">
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
            {isNavOpen && (
              <AiOutlineDoubleRight
                onClick={() => setIsNavOpen(false)}
                className="text-lg cursor-pointer rotate-180"
              />
            )}
          </div>
          <ul className="w-full h-fit flex flex-col">
            {navigations.map((_nav, index) => (
              <Link href={_nav.href} key={index}>
                <a>
                  <li
                    className={`flex items-center border-b py-3 ${
                      router.asPath == _nav.href && "bg-gray-100"
                    } hover:bg-gray-50 cursor-pointer`}
                  >
                    {_nav.icon}
                    <span className="">{_nav.name}</span>
                  </li>
                </a>
              </Link>
            ))}
          </ul>
          <div className="absolute bottom-0 right-0 text-lg font-mono w-full h-[10vh] border-t flex justify-center items-center">
            <span className="flex items-center">
              Made with <BsHeartFill className="text-[red] mx-2" />
              at
            </span>
            <span className="tracking-wide">
              <a
                href="https://legrosh.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="my-5 mx-2.5 text-[#091921] font-semibold hover:text-[#091921B3]"
              >
                LeGroSh
              </a>
            </span>
          </div>
        </div>
      ) : (
        <div className="relative w-fit min-h-screen border-r bg-white">
          <div className="w-full border-b px-2 py-[9px] flex items-center justify-between">
            <div className="flex items-center">
              <span>
                <Image
                  src="/assets/logo.png"
                  width={40}
                  height={40}
                  alt="Logo"
                />
              </span>
            </div>
          </div>
          <ul className="w-full h-fit flex flex-col">
            {navigations.map((_nav, index) => (
              <Link href={_nav.href} key={index}>
                <a>
                  <li
                    className={`flex items-center border-b py-3 ${
                      router.asPath == _nav.href && "bg-gray-100"
                    } hover:bg-gray-50 cursor-pointer`}
                  >
                    {_nav.icon}
                  </li>
                </a>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;
