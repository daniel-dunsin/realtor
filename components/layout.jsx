import React from "react";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
export function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
