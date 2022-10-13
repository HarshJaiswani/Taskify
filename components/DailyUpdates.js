import React, { useState, useEffect } from "react";
import { HiOutlinePencil } from "react-icons/hi";
import { AiFillDelete } from "react-icons/ai";
import getFullDate from "../hooks/getDate";
import { data } from "autoprefixer";

const DailyUpdates = (props) => {
  const { setIsTodaysStatusUpdated, fetchData, updates } = props;
  const [regret, setRegret] = useState("");
  const [proud, setProud] = useState("");
  const [edit, setEdit] = useState(false);
  const [indexCheck, setIndexCheck] = useState(-1);

  const deleteUpdate = async (trackId) => {
    let data = await fetch("/api/tracks/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": JSON.parse(localStorage.getItem("auth-token")),
      },
      body: JSON.stringify({ trackId }),
    });
    let dataJson = await data.json();
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const Update = async (trackId) => {
    let data = await fetch("/api/tracks/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": JSON.parse(localStorage.getItem("auth-token")),
      },
      body: JSON.stringify({ regret, proud, trackId }),
    });
    let dataJson = await data.json();
    setEdit(false);
    fetchData();
  };
  const turnEditOn = (r, p, i) => {
    setRegret(r);
    setProud(p);
    setEdit(true);
    setIndexCheck(i);
  };
  return (
    <div className="w-full min-h-screen">
      <h2 className="text-xl font-mono font-semibold p-4">All Updates</h2>
      {updates.length <= 0 && (
        <div className="text-center font-semibold text-xl">No Updates!</div>
      )}
      {updates.map((item, index) => (
        <div
          key={index}
          className="w-[95%] border mx-auto my-4 rounded-md overflow-hidden"
        >
          <div className="w-full px-4 py-2 font-semibold flex justify-between items-center text-white bg-[#091921]">
            {getFullDate(item.createdAt)}
            <div className="flex items-center">
              <HiOutlinePencil
                className="mr-4 text-lg cursor-pointer"
                onClick={() => turnEditOn(item.regret, item.proud, index)}
              />
              <AiFillDelete
                className="mr-4 text-lg cursor-pointer"
                onClick={() => deleteUpdate(item._id)}
              />
            </div>
          </div>
          <div className="w-full px-4 py-2 bg-white border-b flex flex-col lg:flex-row items-center">
            <div className="mr-2 text-lg text-[gray] font-semibold">
              Regret :{" "}
            </div>
            {edit && indexCheck === index ? (
              <input
                className="w-fit px-2 py-1 border rounded-md"
                type="text"
                value={regret}
                spellCheck={false}
                onChange={(e) => setRegret(e.target.value)}
              />
            ) : (
              <div>{item.regret}</div>
            )}
          </div>
          <div className="w-full flex flex-col lg:flex-row items-center px-4 py-2 bg-white border-b">
            <div className="mr-2 text-lg text-[gray] font-semibold">
              Proud :{" "}
            </div>
            {edit && indexCheck === index ? (
              <input
                className="w-fit px-2 py-1 border rounded-md"
                type="text"
                spellCheck={false}
                value={proud}
                onChange={(e) => setProud(e.target.value)}
              />
            ) : (
              <div>{item.proud}</div>
            )}
          </div>
          {edit && indexCheck === index && (
            <div className="w-full bg-white flex items-center justify-end">
              <button
                className="px-4 py-1.5 mx-4 my-2 rounded-[4px] text-white bg-cyan-800"
                onClick={() => Update(item._id)}
              >
                Submit
              </button>
              <button
                className="px-4 py-1.5 mx-4 my-2 rounded-[4px] text-[gray]"
                onClick={() => setEdit(false)}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DailyUpdates;
