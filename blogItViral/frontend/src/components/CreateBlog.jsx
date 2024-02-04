import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/create-blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, body }),
      });

      if (response.ok) {
        console.log("Blog created successfully");
        navigate("/"); //redirect to the list of blogs or clear the form
        alert("Blog created successfully");
      } else {
        console.error("Error creating blog:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center border-solid h-full border-black border-2 md:p-16 p-3 md:mt-20 mt-10 md:ml-40 ml-3 mr-3 md:mr-40">
      <h1 className="text-4xl font-semibold mb-16">Create New Blog</h1>
      <form
        className="flex flex-col w-10/12 gap-8 justify-center items-center"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col w-full">
          <p className="text-[#1976D2] text-xl font-semibold mb-1">Title</p>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-blue-200"
          />
        </div>
        <div className="flex flex-col w-full">
          <p className="text-[#1976D2] text-xl font-semibold mb-1">
            Description
          </p>
          <textarea
            rows={10}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="bg-blue-200"
          />
        </div>
        <button
          type="submit"
          className="bg-[#1976D2] text-white w-24 h-10 rounded-2xl"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
