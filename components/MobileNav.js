import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { BiLineChart, BiNetworkChart, BiTask } from "react-icons/bi";
import { CgHomeAlt } from "react-icons/cg";
import { IoCalendarOutline } from "react-icons/io5";

const MobileNav = () => {
  const router = useRouter();
  const navigations = [
    {
      icon: <CgHomeAlt className="text-2xl mx-4" />,
      name: "Home",
      href: "/",
    },
    {
      icon: <BiTask className="text-2xl mx-4" />,
      name: "Tasks",
      href: "/tasks",
    },
    {
      icon: <BiNetworkChart className="text-2xl mx-4" />,
      name: "Challenges",
      href: "/challenges",
    },
    {
      icon: <BiLineChart className="text-2xl mx-4" />,
      name: "Tracker",
      href: "/tracker",
    },
    {
      icon: <IoCalendarOutline className="text-2xl mx-4" />,
      name: "Calendar",
      href: "/calendar",
    },
  ];
  return (
    <>
      <div className="w-full z-[100] fixed bottom-0 right-0 bg-white">
        {/* <div className="w-full h-[10vh]"></div> */}
        <ul className="w-full h-fit flex justify-evenly">
          {navigations.map((_nav, index) => (
            <Link href={_nav.href} key={index}>
              <a>
                <li
                  className={`w-full flex items-center border-b py-3 ${
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
    </>
  );
};

export default MobileNav;
