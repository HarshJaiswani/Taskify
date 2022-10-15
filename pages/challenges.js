import React, { useState, useEffect } from "react";
import ChallengeTracker from "../components/ChallengeTracker";
import { AiFillCaretRight } from "react-icons/ai";
import AllChallenges from "../components/AllChallenges";
import CreateChallenge from "../components/CreateChallenge";

const Challenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [todaysChallenges, setTodaysChallenges] = useState([]);
  const [updateData, setUpdateData] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [showChallenges, setShowChallenges] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let data = await fetch("/api/challenges/getChallenges", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": JSON.parse(localStorage.getItem("auth-token")),
      },
    });
    let dataJson = await data.json();
    setChallenges(dataJson);
    let temp = dataJson.filter((a) => !a.isCompleted);
    setTodaysChallenges(temp);
    dataJson.forEach(async (e) => {
      if (e.noOfDays == e.didToday.length) {
        let data2 = await fetch("/api/challenges/editChallenge", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": JSON.parse(localStorage.getItem("auth-token")),
          },
          body: JSON.stringify({
            isCompleted: true,
            challengeId: e._id,
          }),
        });
        let dataJson2 = await data2.json();
      }
    });
  };

  const updateChallenge = (item) => {
    setShowChallenges(false);
    setUpdateData(item);
  };

  return (
    <div className="relative p-4">
      {showChallenges && (
        <div
          onClick={() => setShowChallenges(false)}
          className="lg:absolute top-3 right-8 lg:ml-0 mb-4 ml-4 w-fit border cursor-pointer hover:bg-gray-50 px-4 py-2 rounded-md"
        >
          Create Challenge
        </div>
      )}
      {!showChallenges && (
        <CreateChallenge
          setShowChallenges={setShowChallenges}
          data={updateData}
        />
      )}
      {showChallenges && (
        <div>
          <div className="px-4 py-2 font-mono font-semibold text-xl">
            Today&#39;s Challenges
          </div>
          <ul className="w-full my-4">
            {todaysChallenges.length <= 0 && (
              <div className="ml-5 font-semibold">
                No challenges available{" "}
                <span className="text-green-600">Create one!</span>
              </div>
            )}
            {todaysChallenges.map((item, index) => (
              <li
                key={index}
                className="w-[97%] mx-auto my-4 border flex items-center justify-between px-4 py-2 rounded-[4px]"
              >
                <span>{item.challengeQuestion}</span>
                <ChallengeTracker
                  index={index}
                  challengeId={item._id}
                  didToday={item.didToday}
                  fetchData={fetchData}
                />
              </li>
            ))}
          </ul>
          {!showAll && (
            <div className="flex items-center">
              <span className="font-semibold text-lg ml-4 mr-4 my-5">
                View all your challenges
              </span>
              <span
                onClick={() => setShowAll(true)}
                className="flex items-center justify-center cursor-pointer rounded-full w-8 h-8 bg-gray-200"
              >
                <AiFillCaretRight fill="orange" />
              </span>
            </div>
          )}
          {showAll && (
            <AllChallenges
              challenges={challenges}
              updateChallenge={updateChallenge}
              fetchData={fetchData}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Challenges;
