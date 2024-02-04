import React, { useState, useEffect } from "react";
import BlogInList from "./BlogInList";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setBlogs(data);
      })
      .catch((error) => console.error("Error fetching blogs:", error));
  }, []);

  return (
    <div className="mt-10">
      <ul className="gap-4 grid md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <BlogInList key={blog._id} blog={blog} />
        ))}
      </ul>
    </div>
  );
};

export default AllBlogs;
