import React, { useState, useRef } from "react";
import { useRouter } from "next/router";
import { BiLeftArrow } from "react-icons/bi";
import { FaRegCalendarCheck } from "react-icons/fa";
import { useWindow } from "../hooks/getWindow";

const CreateChallenge = (props) => {
  const router = useRouter();
  const { width } = useWindow();
  const { setShowChallenges, data } = props;
  const [formData, setFormData] = useState(
    data == []
      ? {
          title: "",
          noOfDays: "",
          challengeQuestion: "",
        }
      : data
  );
  console.log(data._id);
  const ref1 = useRef();
  const ref2 = useRef();
  const handleChange = (e, name) => {
    if (name === "noOfDays") {
      if (ref2.current.checked) {
        setFormData((prevState) => ({ ...prevState, noOfDays: -1 }));
        ref1.current.disabled = true;
      } else {
        ref1.current.disabled = false;
        setFormData((prevState) => ({
          ...prevState,
          noOfDays: e.target.value,
        }));
      }
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    if (
      formData.title === "" ||
      formData.noOfDays === "" ||
      formData.challengeQuestion === ""
    ) {
      alert("fill details!");
      return;
    }
    if (data._id) {
      let apidata = await fetch("/api/challenges/editChallenge", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": JSON.parse(localStorage.getItem("auth-token")),
        },
        body: JSON.stringify({
          title: formData.title,
          noOfDays: formData.noOfDays,
          challengeQuestion: formData.challengeQuestion,
          challengeId: data._id,
        }),
      });
      let dataJson = await apidata.json();
      router.push("/challenges");
    } else {
      let data = await fetch("/api/challenges/addChallenge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": JSON.parse(localStorage.getItem("auth-token")),
        },
        body: JSON.stringify({
          title: formData.title,
          noOfDays: formData.noOfDays,
          challengeQuestion: formData.challengeQuestion,
        }),
      });
      let dataJson = await data.json();
      router.push("/challenges");
    }
  };
  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="relative bg-white w-full lg:w-[95%] md:w-full p-4 md:p-12 rounded-[30px] mx-auto flex flex-col justify-center items-center"
    >
      {width >= 640 && (
        <div
          onClick={() => setShowChallenges(true)}
          className="absolute flex justify-center items-center cursor-pointer underline top-4 left-4 text-center px-4 py-1"
        >
          <BiLeftArrow />
          back
        </div>
      )}
      <div className="flex title-font mx-auto font-medium items-center text-gray-900 my-8">
        <span className="text-green-500 text-3xl">
          <FaRegCalendarCheck />
        </span>
        <span className="ml-3 text-xl">Challenge Manager</span>
      </div>
      {/* <h1 className="text-2xl font-semibold my-4 text-white">Create Challenge</h1> */}
      <input
        type="text"
        name="title"
        spellCheck={false}
        value={formData.title}
        onChange={(e) => handleChange(e, "title")}
        placeholder="Challenge Name"
        className="w-full text-center font-mono font-semibold text-lg border border-[#e2e2e2] p-2 rounded-[4px] my-2 outline-none"
      />
      <div className="w-full justify-between flex-col md:flex-row flex items-center">
        <input
          type="number"
          name="noOfDays"
          value={formData.noOfDays}
          onChange={(e) => handleChange(e, "noOfDays")}
          min={1}
          step={1}
          ref={ref1}
          disabled={false}
          placeholder="Number of Days"
          className="w-full text-center hide-spin font-mono font-semibold text-lg border border-[#e2e2e2] p-2 rounded-[4px] my-2 outline-none"
        />
        <span className="font-semibold mx-8 mb-2">OR</span>
        <div className="w-full border border-[#e2e2e2] rounded-md px-4 py-2.5 flex md:justify-start justify-center items-center">
          <input
            ref={ref2}
            type="checkbox"
            checked={formData.noOfDays == -1}
            onChange={(e) => handleChange(e, "noOfDays")}
            id="forever"
          />
          <label htmlFor="forever" className="text-gray-400 mx-4 font-semibold">
            Forever
          </label>
        </div>
      </div>
      <input
        type="text"
        name="challengeQuestion"
        spellCheck={false}
        value={formData.challengeQuestion}
        onChange={(e) => handleChange(e, "challengeQuestion")}
        placeholder="Question to be asked daily"
        className="w-full text-center font-mono outline-none font-semibold text-lg border border-[#e2e2e2] p-2 rounded-[4px] my-2"
      />
      <button
        type="submit"
        className="w-full md:w-[50%] px-6 py-2 my-8 rounded-[4px] bg-indigo-600 text-white text-base"
      >
        {data.length == 0 ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default CreateChallenge;
