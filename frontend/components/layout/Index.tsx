import React, { ReactNode } from "react";
import SideBar from "./SideBar";
import Navbar from "./Navbar.tsx";

interface LayoutProps {
  hideNavbar: boolean;
  hideSidebar: boolean;
  children: ReactNode;
}

export default function Layout({ hideNavbar, hideSidebar, children }: LayoutProps) {
  return (
    <>
      {!hideNavbar && <Navbar />}
      <main>{children}</main>
      {!hideSidebar && <SideBar />}
    </>
  );
}
