import React from "react";

export function Footer() {
  return (
    <footer className="w-full bg-black">
      <div className="w-full max-w-[1200px] p-4 text-white text-center">
        <p>&copy; Copyright Realtor, {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
