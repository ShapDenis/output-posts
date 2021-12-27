import React from "react";
import { Routes, Route } from "react-router-dom";
import { privateRoutes } from "../router";
import { Posts } from "../pages/Posts/Posts";

export const AppRouter = () => {
  return (
    <Routes>
      {privateRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={<Posts />} />
      ))}
      <Route key={"/"} path="*" element={<Posts />} />
    </Routes>
  );
};
