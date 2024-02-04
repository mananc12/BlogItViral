import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const BlogPage = () => {
  const [blog, setBlog] = useState({});
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/blog-page/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setBlog(data);
      })
      .catch((error) => console.error("Error fetching blog details:", error));
  }, [id]);

  return (
    <>
      <div className="flex flex-col justify-center items-center border-solid h-full border-black border-2 md:p-16 p-3 md:mt-20 mt-10 md:ml-40 ml-3 mr-3 md:mr-40">
        <h2 className="text-2xl md:text-4xl font-semibold">{blog.title}</h2>
        <p className="mb-5">Date: {new Date(blog.date).toLocaleDateString()}</p>
        <img src="/no-user.png" className="w-2/4 h-2/4 mb-10" />
        <p>{blog.body}</p>
      </div>
    </>
  );
};

export default BlogPage;
