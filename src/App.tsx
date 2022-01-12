import React, { FC } from "react";
import "antd/dist/antd.css";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import { Posts } from "./pages/Posts/Posts";
import { Post } from "./pages/Post/Post";
import { Albums } from "./pages/Albums/Albums";
import { Users } from "./pages/Users/Users";
import { Photos } from "./pages/Photos/Photos";

const App: FC = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route key={"/"} path="/" element={<Posts />} />
        <Route key={"/post"} path="/post">
          <Route key={":id"} path=":id" element={<Post />} />
        </Route>

        <Route key={"/albums"} path="/albums" element={<Albums />} />
        <Route key={"/albums/photos"} path="/albums/photos">
          <Route key={":id"} path=":id" element={<Photos />} />
        </Route>

        <Route key={"/users"} path="/users" element={<Users />} />
      </Routes>
    </>
  );
};
export default App;
