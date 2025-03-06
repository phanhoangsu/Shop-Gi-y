// ListPage.js
import React from "react";
import { Outlet } from "react-router-dom";

const ListPage = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default ListPage;
