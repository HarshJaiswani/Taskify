import React, { useState, useEffect } from "react";
import { TiTickOutline } from "react-icons/ti";
import { MdClose } from "react-icons/md";

const ChallengeTracker = (props) => {
  const { index, challengeId, didToday, fetchData } = props;
  const [indexCheck, setIndexCheck] = useState([]);
  const [done, setDone] = useState([]);
  const [notDone, setNotDone] = useState([]);

  useEffect(() => {
    let todaysDateObj = new Date();
    let todaysDate = `${todaysDateObj.getFullYear()}-${todaysDateObj.getMonth()}-${todaysDateObj.getDate()}`;
    let todaysUpdate = didToday.find((a) => a.date == todaysDate);
    if (!todaysUpdate) return;
    if (todaysUpdate.isDone) {
      setIndexCheck([...indexCheck, index]);
      setDone([...done, index]);
    } else {
      setIndexCheck([...indexCheck, index]);
      setNotDone([...notDone, index]);
    }
  }, []);

  const revertChange = async (index) => {
    if (done.includes(index)) {
      let temp = done.filter((a) => a !== index);
      setDone(temp);
      let temp2 = indexCheck.filter((a) => a !== index);
      setIndexCheck(temp2);
    }
    if (notDone.includes(index)) {
      let temp = notDone.filter((a) => a !== index);
      setNotDone(temp);
      let temp2 = indexCheck.filter((a) => a !== index);
      setIndexCheck(temp2);
    }
    let data = await fetch("/api/challenges/deleteUpdate", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": JSON.parse(localStorage.getItem("auth-token")),
      },
      body: JSON.stringify({
        challengeId,
      }),
    });
    let dataJson = await data.json();
    fetchData();
  };

  const handleClick = async (arg, index) => {
    setIndexCheck([...indexCheck, index]);
    if (arg === "yes") {
      setDone([...done, index]);
    } else if (arg === "no") {
      setNotDone([...notDone, index]);
    }
    let data = await fetch("/api/challenges/updateChallenge", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": JSON.parse(localStorage.getItem("auth-token")),
      },
      body: JSON.stringify({
        todaysStatus: arg == "yes",
        challengeId,
      }),
    });
    let dataJson = await data.json();
    fetchData();
  };
  return (
    <div className="flex justify-between items-center">
      {!indexCheck.includes(index) ? (
        <div className="flex justify-center items-center flex-wrap text-sm">
          <button
            onClick={() => {
              handleClick("yes", index);
            }}
            className="w-[50px] flex justify-center items-center py-1 my-[3px] rounded-md bg-[rgb(241,241,241)] mx-4"
          >
            Yes
          </button>
          <button
            onClick={() => {
              handleClick("no", index);
            }}
            className="w-[50px] flex justify-center items-center py-1 my-[3px] rounded-md bg-[rgb(241,241,241)]"
          >
            No
          </button>
        </div>
      ) : (
        <>
          {done.includes(index) && (
            <>
              <span
                onClick={() => revertChange(index)}
                className="cursor-pointer rounded-full text-lg p-2 bg-gray-100 text-green-600"
              >
                <TiTickOutline />
              </span>
            </>
          )}
          {notDone.includes(index) && (
            <>
              <span
                onClick={() => revertChange(index)}
                className="cursor-pointer rounded-full text-lg p-2 bg-gray-100 text-red-600"
              >
                <MdClose />
              </span>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ChallengeTracker;
