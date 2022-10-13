import React, { useState, useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import getFullDate from "../hooks/getDate";
import { useWindow } from "../hooks/getWindow";

const AllChallenges = (props) => {
  const { challenges, updateChallenge, fetchData } = props;
  const { width } = useWindow();

  const deleteChallenge = async (challengeId) => {
    let data = await fetch("/api/challenges/deleteChallenge", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": JSON.parse(localStorage.getItem("auth-token")),
      },
      body: JSON.stringify({ challengeId }),
    });
    let dataJson = await data.json();
    fetchData();
  };

  return (
    <div>
      <div className="px-4 py-2 font-mono font-semibold text-xl">
        All Challenges
      </div>
      <div className="w-full p-4 rounded-[10px]">
        {width <= 1200 ? (
          <div className="w-[98%] h-fit my-5 mx-auto overflow-hidden text-[gray]">
            {challenges.map((item, index) => (
              <div
                key={index}
                className={`relative rounded-[20px] my-8 border w-full min-h-[30vh] flex flex-col p-5 ${
                  index % 2 != 0 ? "bg-[#f1f1f1]" : "bg-white"
                }`}
              >
                <div className="w-full px-3">
                  <div className="text-black font-semibold">Challenge - </div>
                  <div className="mb-[10px]">{item.title}</div>
                </div>
                <div className="w-full px-3">
                  <div className="text-black font-semibold">
                    Challenge Question -
                  </div>
                  <div className="mb-[10px]">{item.challengeQuestion}</div>
                </div>
                <div className="w-full px-3">
                  <div className="text-black font-semibold">Created on -</div>
                  <div className="mb-[10px]">{getFullDate(item.createdAt)}</div>
                </div>
                <div className="w-full px-3">
                  <div className="text-black font-semibold">Took for -</div>
                  <div className="mb-[10px]">{item.noOfDays}</div>
                </div>
                <div className="w-full px-3">
                  <div className="text-black font-semibold">Status - </div>
                  <div className="mb-[10px]">
                    {item.isCompleted ? "Done" : "In-progress"}
                  </div>
                </div>
                <div className="absolute top-5 right-5 flex">
                  <MdEdit
                    className="mx-4"
                    onClick={() => updateChallenge(item)}
                  />
                  <AiFillDelete onClick={() => deleteChallenge(item._id)} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full border h-fit rounded-[10px] overflow-hidden mx-auto">
            <table className="w-full h-full">
              <thead>
                <tr>
                  <th className="bg-[#212529] py-3 text-white font-semibold">
                    S.No
                  </th>
                  <th className="bg-[#212529] py-3 text-white font-semibold">
                    Challenge
                  </th>
                  <th className="bg-[#212529] py-3 text-white font-semibold">
                    Challenge Question
                  </th>
                  <th className="bg-[#212529] py-3 text-white font-semibold">
                    Created on
                  </th>
                  <th className="bg-[#212529] py-3 text-white font-semibold">
                    Took for
                  </th>
                  <th className="bg-[#212529] py-3 text-white font-semibold">
                    Status
                  </th>
                  <th className="bg-[#212529] py-3 text-white font-semibold">
                    Options
                  </th>
                </tr>
              </thead>
              <tbody>
                {challenges.map((item, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 != 0 ? "bg-[#f1f1f1]" : "bg-white"
                    }`}
                  >
                    <td className="text-center py-3">{index + 1}</td>
                    <td className="text-center py-3">{item.title}</td>
                    <td className="text-center py-3">
                      {item.challengeQuestion}
                    </td>
                    <td className="text-center py-3">
                      {getFullDate(item.createdAt)}
                    </td>
                    <td className="text-center py-3">
                      {item.noOfDays > 0 ? item.noOfDays : "Forever"}
                    </td>
                    <td className="text-center py-3">
                      {item.isCompleted ? "Done" : "In-progress"}
                    </td>
                    <td className="h-full flex justify-evenly items-center text-[#4158d0] cursor-pointer">
                      <MdEdit onClick={() => updateChallenge(item)} />
                      <AiFillDelete onClick={() => deleteChallenge(item._id)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllChallenges;
