import React from "react";
import BlogPage from "./components/BlogPage";
import CreateBlog from "./components/CreateBlog";
import Home from "./components/Home";
import EditPage from "./components/EditPage";
import Nav from "./components/Nav";
import { Footer } from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/blog-page/:id" element={<BlogPage />} />
        <Route path="/edit-blog/:id" element={<EditPage />} />
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/login" element={<LogIn/>}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
