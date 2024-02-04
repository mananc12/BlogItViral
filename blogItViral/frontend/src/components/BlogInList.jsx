import Card from "./Card";
import React from "react";
import { useNavigate } from "react-router-dom";

const BlogInList = ({ blog }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this blog post?"
    );
    if (confirmation) {
      try {
        const response = await fetch(
          `http://localhost:3000/delete-blog/${blog._id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          console.log("Blog deleted successfully");
          alert("Blog deleted sucessfully");

          navigate("/");
        } else {
          console.error("Error deleting blog:", response.statusText);
        }
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    }
  };

  return (
    <div>
      <li>
        {/* <Link to={`/blog-page/${blog._id}`}>
          <h2>{blog.title}</h2>
          <p>{blog.body}</p>
        </Link>
        <Link to={`/blog-page/${blog._id}`}>
          <button>Open</button>
        </Link>
        <Link to={`/edit-blog/${blog._id}`}>
          <button>Edit</button>
        </Link>
        <button onClick={handleDelete}>Delete</button> */}

        <Card
          title={blog.title}
          body={blog.body}
          to1={`/blog-page/${blog._id}`}
          to2={`/blog-page/${blog._id}`}
          to3={`/edit-blog/${blog._id}`}
          delete={handleDelete}
        />
      </li>
    </div>
  );
};

export default BlogInList;
