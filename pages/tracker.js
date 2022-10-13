import React, { useState, useEffect } from "react";
import DailyUpdates from "../components/DailyUpdates";
import getFullDate from "../hooks/getDate";

const Tracker = () => {
  const [isTodaysStatusUpdated, setIsTodaysStatusUpdated] = useState(false);
  const [updates, setUpdates] = useState([]);
  const [formData, setFormData] = useState({
    regret: "",
    proud: "",
  });
  const handleFormDataChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };
  const saveUpdate = async (e) => {
    e.preventDefault();
    if (formData.regret === "" || formData.proud === "") {
      alert("kindly fill details!");
      return;
    }
    let apidata = await fetch("/api/tracks/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": JSON.parse(localStorage.getItem("auth-token")),
      },
      body: JSON.stringify({ regret: formData.regret, proud: formData.proud }),
    });
    let dataJson = await apidata.json();
    setIsTodaysStatusUpdated(true);
    setFormData({
      regret: "",
      proud: "",
    });
    fetchData();
  };

  const fetchData = async () => {
    let data = await fetch("/api/tracks/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": JSON.parse(localStorage.getItem("auth-token")),
      },
    });
    let dataJson = await data.json();
    dataJson.forEach((e) => {
      if (getFullDate(e.createdAt) === getFullDate(Date.now())) {
        setIsTodaysStatusUpdated(true);
      } else {
        setIsTodaysStatusUpdated(false);
      }
    });
    setUpdates([...dataJson]);
  };

  return (
    <div>
      {isTodaysStatusUpdated && (
        <div className="w-full h-[10vh] flex items-center justify-center">
          <span className="font-semibold text-[gray] text-base border px-4 py-2 rounded-md">
            Today&#39;s Status Updated!
          </span>
        </div>
      )}
      {!isTodaysStatusUpdated && (
        <form
          onSubmit={(e) => saveUpdate(e)}
          className="w-full mb-8 flex flex-col items-start"
        >
          <div className="w-full mt-4 px-4 py-2 font-mono font-semibold text-xl">
            Today&#39;s Status ?
          </div>
          <input
            type="text"
            name="regret"
            value={formData.regret}
            onChange={(e) => handleFormDataChange(e, "regret")}
            placeholder="One Thing you regret doing today!"
            className="w-[90%] mt-4 rounded-md border px-2 py-2 mx-auto font-mono focus:outline-[skyblue]"
          />
          <input
            type="text"
            name="proud"
            value={formData.proud}
            onChange={(e) => handleFormDataChange(e, "proud")}
            placeholder="One Thing for which you felt proud today!"
            className="w-[90%] mt-4 rounded-md border px-2 py-2 mx-auto font-mono focus:outline-[skyblue]"
          />
          <button
            type="submit"
            className="mx-4 lg:mx-14 px-6 py-2 bg-white hover:bg-gray-50 cursor-pointer rounded-md border my-4"
          >
            Update
          </button>
        </form>
      )}
      <DailyUpdates
        setIsTodaysStatusUpdated={setIsTodaysStatusUpdated}
        fetchData={fetchData}
        updates={updates}
      />
    </div>
  );
};

export default Tracker;
