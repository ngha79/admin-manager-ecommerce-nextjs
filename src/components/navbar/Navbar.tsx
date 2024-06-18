"use client";

import React from "react";

import { UserDropdown } from "../UserDropdown";
import SheetSideBar from "./SheetSideBar";
import Notifications from "./Notifications";

const Navbar = () => {
  return (
    <div className="w-full z-20 py-4 bg-background shadow-md h-16 flex items-center justify-between px-4 sticky top-0 left-0">
      <SheetSideBar />
      <div className="flex items-center gap-8">
        <Notifications />
        <UserDropdown />
      </div>
    </div>
  );
};

export default Navbar;
