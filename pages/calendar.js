import React, { useState, useEffect } from "react";
import { BiChevronRight, BiChevronLeft } from "react-icons/bi";
// import { MdClose } from "react-icons/md";
// import { TiTickOutline } from "react-icons/ti";
// import getFullDate from "../hooks/getDate";

let days = [];

const Calender = () => {
  const [month, setMonth] = useState();
  const [currentDate, setCurrentDate] = useState();
  const [showMonthList, setShowMonthList] = useState(false);
  const [year, setYear] = useState();
  const [fillHeight, setfillHeight] = useState([]);
  // const [date, setDate] = useState();
  // const [showDayEvents, setShowDayEvents] = useState(false);
  // const [challenges, setChallenges] = useState(undefined);
  const month_names = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const isLeapYear = (year) => {
    return (
      (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
      (year % 100 === 0 && year % 400 === 0)
    );
  };

  const getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28;
  };

  const generateCalendar = (month, year) => {
    let days_of_month = [
      31,
      getFebDays(year),
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
    ];

    days = [];
    setCurrentDate("");
    setfillHeight([]);

    let currDate = new Date();
    if (month == null) month = currDate.getMonth();
    if (!year) year = currDate.getFullYear();

    let curr_month = `${month_names[month]}`;
    setMonth(curr_month);
    setYear(year);

    // get first day of month
    let temp = [];
    let first_day = new Date(year, month, 1);
    for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
      if (i >= first_day.getDay()) {
        days.push(i - first_day.getDay() + 1);
        temp.push(i * 2);
        if (
          i - first_day.getDay() + 1 === currDate.getDate() &&
          year === currDate.getFullYear() &&
          month === currDate.getMonth()
        ) {
          setCurrentDate(i - first_day.getDay() + 1);
        }
      } else {
        days.push("");
        temp.push(0);
      }
    }
    setfillHeight(Array(50).fill(100));
  };

  useEffect(() => {
    let currDate = new Date();

    let curr_month = { value: currDate.getMonth() };
    let curr_year = { value: currDate.getFullYear() };

    generateCalendar(curr_month.value, curr_year.value);
    // setfillHeight([...fillHeight,25]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   fetch("/api/challenges/getChallenges", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "auth-token": JSON.parse(localStorage.getItem("auth-token")),
  //     },
  //   })
  //     .then((data) => data.json())
  //     .then((data) => {
  //       setChallenges(data);
  //     });
  // }, []);

  const handleChangeMonth = (index, year) => {
    setShowMonthList(false);
    generateCalendar(index, year);
  };

  const handleChangeYear = (year) => {
    setYear(year);
    const monthGive = month_names.indexOf(month);
    generateCalendar(monthGive, year);
  };

  // const handleDayEvents = async (date) => {
  //   setShowDayEvents(true);
  //   let someDate = date + " " + month + " " + year;
  //   setDate(someDate);
  //   // let finData = challenges.filter((a) => {
  //   //   let currentDate = new Date(a.createdAt);
  //   //   console.log(currentDate.getDate(), date);
  //   //   console.log(month_names[currentDate.getMonth()], month);
  //   //   console.log(currentDate.getFullYear(), year);
  //   //   if (
  //   //     currentDate.getDate() === date &&
  //   //     month_names[currentDate.getMonth()] === month &&
  //   //     currentDate.getFullYear() === year
  //   //   ) {
  //   //     return true;
  //   //   } else {
  //   //     return false;
  //   //   }
  //   // });
  //   // console.log(challenges);
  //   // console.log(
  //   //   getFullDate(challenges[0].createdAt) == `${date} ${month} ${year}`
  //   // );
  //   // console.log(`${date} ${month} ${year}`);
  //   // console.log(finData);
  //   // setChallenges(finData);
  // };

  return (
    <div className="relative w-full flex justify-center h-[90vh] items-center bg-gradient-to-tr from-[#4158d0] to-[#c850c0]">
      <div className="calender shadow-[0_0_20px_gray] w-[430px] h-fit min-h-[420px] overflow-hidden bg-white rounded-[10px] md:rounded-[30px] p-[20px]">
        {showMonthList && (
          <div className="w-full min-h-[420px] h-full font-semibold flex items-center justify-evenly flex-wrap">
            {month_names.map((month, index) => (
              <span
                className="w-1/3 cursor-pointer hover:bg-gray-100 py-1 rounded-md text-center"
                key={index}
                onClick={() => handleChangeMonth(index, year)}
              >
                {month}
              </span>
            ))}
          </div>
        )}
        {/* {showDayEvents && (
          // <div className="overflow-hidden">
          //   <h3
          //     onClick={() => setShowDayEvents(false)}
          //     className="cursor-pointer w-fit text-center mx-auto font-semibold my-2 rounded-md bg-gray-100 px-4 py-1"
          //   >
          //     {date} - <span className="text-cyan-600">25%</span>
          //   </h3>
          //   <ul className="h-[335px] scrollBar-hidden overflow-auto">
          //     {challenges && challenges.length <= 0 && (
          //       <div className="text-center font-mono text-lg font-semibold my-4">
          //         No challenges to display!
          //       </div>
          //     )}
          //     {challenges &&
          //       challenges.map(
          //         (item, index) =>
          //           getFullDate(item.createdAt) ==
          //             getFullDate(Date(year, month, date)) && (
          //             <li
          //               className="flex items-center justify-between bg-[#1b3b4b] w-full px-4 py-2 my-4 rounded-md"
          //               key={index}
          //             >
          //               <span className="font-semibold text-white block">
          //                 {item.title}
          //               </span>
          //               {item.isDoneToday ? (
          //                 <span className="cursor-pointer rounded-full text-lg p-2 bg-gray-100 text-green-600">
          //                   <TiTickOutline />
          //                 </span>
          //               ) : (
          //                 <span className="cursor-pointer rounded-full text-lg p-2 bg-gray-100 text-red-600">
          //                   <MdClose />
          //                 </span>
          //               )}
          //             </li>
          //           )
          //       )}
          //   </ul>
          // </div>
          <div className="z-[10] shadow-[0_0_0_1000px_rgba(0,0,0,0.1)] absolute top-[50%] left-[50%] bg-white rounded-[30px] p-8">
            Hello
          </div>
        )} */}
        {!showMonthList && (
          <>
            <div className="head flex items-center justify-between">
              <div
                onClick={() => setShowMonthList(true)}
                className="month text-2xl font-mono text-cyan-600 font-semibold cursor-pointer hover:bg-gray-100 rounded-md px-4 py-1"
              >
                {month}
              </div>
              <div className="year flex items-center font-semibold text-2xl">
                <pre
                  onClick={() => handleChangeYear(year - 1)}
                  className="cursor-pointer flex justify-center items-center hover:bg-gray-100 rounded-full w-10 h-10"
                >
                  <BiChevronLeft />
                </pre>
                <span className="mx-2">{year}</span>
                <pre
                  onClick={() => handleChangeYear(year + 1)}
                  className="cursor-pointer flex justify-center items-center hover:bg-gray-100 rounded-full w-10 h-10"
                >
                  <BiChevronRight />
                </pre>
              </div>
            </div>
            <div className="dates">
              <div className="h-[40px] grid grid-cols-[repeat(7,1fr)] font-[600] gap-[2px]">
                <div className="grid place-items-center text-gray-500">Sun</div>
                <div className="grid place-items-center text-gray-500">Mon</div>
                <div className="grid place-items-center text-gray-500">Tue</div>
                <div className="grid place-items-center text-gray-500">Wed</div>
                <div className="grid place-items-center text-gray-500">Thu</div>
                <div className="grid place-items-center text-gray-500">Fri</div>
                <div className="grid place-items-center text-gray-500">Sat</div>
              </div>
              <div className="w-full h-[65%] grid place-items-center gap-x-[2px] gap-y-[10px] grid-cols-[repeat(7,1fr)] text-white font-semibold">
                {days.map((day, index) =>
                  day !== "" ? (
                    <div
                      key={index}
                      // onClick={() => handleDayEvents(day)}
                      className={`w-[40px] h-[40px] relative flex justify-center items-center cursor-pointer border-2 overflow-hidden hover:border-cyan-600 bg-green-400 text-cyan-600 ${
                        currentDate === day ? "rounded-full" : "rounded-[4px]"
                      }`}
                    >
                      <span className="z-[5]">{day}</span>
                      <span
                        style={{
                          height: `${
                            fillHeight[index] === undefined
                              ? 0
                              : fillHeight[index]
                          }%`,
                        }}
                        className={`absolute top-0 right-0 w-full bg-white text-center`}
                      ></span>
                    </div>
                  ) : (
                    <div key={index}>{day}</div>
                  )
                )}
              </div>
            </div>
            {/* <div className="w-fit font-semibold mx-auto py-2 my-4 rounded-md px-4 border-2 ">
              Monthly Score - <span className="text-cyan-600">25%</span>
            </div> */}
          </>
        )}
      </div>
    </div>
  );
};

export default Calender;
