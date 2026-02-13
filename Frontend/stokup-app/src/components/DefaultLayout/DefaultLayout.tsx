
import { Outlet } from "react-router-dom";
import { Sidebar } from "../Sidebar/Sidebar";
import { useState } from "react";


export function DefaultLayout() {

  return (
    <div className="relative flex w-full h-screen bg-[#ededed]">
      <Sidebar />

      <main className="relative flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}