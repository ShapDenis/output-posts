import React, { FC } from "react";
import "antd/dist/antd.css";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import { Posts } from "./pages/Posts/Posts";
import { Post } from "./pages/Post/Post";

const App: FC = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route key={"/"} path="/" element={<Posts />} />
        <Route key={"/post"} path="/post">
          <Route key={":id"} path=":id" element={<Post />} />
        </Route>
      </Routes>
    </>
  );
};
export default App;
