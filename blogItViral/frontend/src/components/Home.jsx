import React from "react";
import AllBlogs from "./AllBlogs";

const Home = () => {
  return (
    <div className="flex flex-col">
      <div className=" flex flex-col justify-center items-center">
        <div className="font-semibold mt-20 mb-20">
          <p className="text-4xl lg:text-6xl">Show world your Writing skills....</p>
          <p className="mt-5 text-2xl flex justify-center items-center">Make your blogs viral with BlogItViral</p>
        </div>
        <AllBlogs />
      </div>
    </div>
  );
};

export default Home;
