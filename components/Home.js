import React from "react";
import Image from "next/image";
import { BiTask, BiNetworkChart, BiLineChart } from "react-icons/bi";
import { FaRegPaperPlane, FaRegHandshake } from "react-icons/fa";
import { IoCalendarOutline } from "react-icons/io5";

const Home = () => {
  const tabs = [
    {
      image: <Image src="/assets/logo.png" width={40} height={40} alt="Logo" />,
      name: "Taskify",
      description:
        "Taskify is a web app, which helps you manage your tasks according to your goals & also helps you challenge yourself and track your progress to help you achieve your dreams !",
    },
    {
      image: <BiTask className="text-[40px] mr-1 text-blue-600" />,
      name: "Tasks",
      description: (
        <span>
          You can list out all your tasks for the day and use our board to move
          them in different sections like{" "}
          <span className="text-[orange]">Todo</span>,{" "}
          <span className="text-[orange]">In-Progress</span> and{" "}
          <span className="text-[orange]">Done</span> and keep a track of your
          daily goals according to your priority!
        </span>
      ),
    },
    {
      image: <BiNetworkChart className="text-[40px] mr-1 text-red-500" />,
      name: "Challenges",
      description:
        "Habits play a vital role in success so weather you want to create one or destroy one you can challenge yourself using this and monitor your daily progress!",
    },
    {
      image: <BiLineChart className="text-[40px] mr-1 text-yellow-500" />,
      name: "Tracker",
      description:
        "This can help you get your answers by yourself, wherever you are stuck because at any point in life, if you are stuck, all you need to do is observe what are you doing!",
    },
    {
      image: <IoCalendarOutline className="text-[40px] mr-1 text-cyan-600" />,
      name: "Calender",
      description:
        "Have a clear Idea of plans and your progress using the calender!",
    },
    {
      image: <FaRegPaperPlane className="text-[35px] mr-1 text-[gray]" />,
      name: "Contact",
      description: (
        <span>
          If you have any queries or suggestion you can mail us at{" "}
          <a className="text-indigo-600" href="mailto:legrosh2021@gmail.com">
            legrosh2021@gmail.com
          </a>
        </span>
      ),
    },
  ];
  return (
    <div className="p-4">
      {tabs.map((tab, index) => (
        <div key={index} className="mb-16">
          <div className="flex items-center">
            <span>{tab.image}</span>
            <span className="text-xl font-semibold tracking-wide font-mono">
              {tab.name}
            </span>
          </div>
          <p className="w-full lg:w-[80%] text-gray-600 text-xl my-4 lg:mx-10">
            {tab.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Home;
