import React from "react";
import Image from "next/image";
import Link from "next/link";
export function Banner({ image, subtitle, title, description, buttonText }) {
  return (
    <section className="my-3 w-full max-w-[900px] mx-auto p-2 flex md:flex-row justify-center items-center flex-col gap-4">
      {/* Image container */}
      <div className="flex-1">
        <Image src={image} alt={title} width={450} height={300} />
      </div>
      <div className="flex-1 flex flex-col items-start gap-y-2">
        <p className="text-gray-500 uppercase text-[16px] font-bold">
          {subtitle}
        </p>
        <h1 className="text-[24px] text-black font-bold">{title}</h1>
        <p className="text-[16px] text-gray-800 max-w-[400px]">{description}</p>
        <Link
          href={`${
            buttonText === "Explore Renting"
              ? "/search?purpose=for-rent"
              : "/search?purpose=for-sale"
          }`}
        >
          <button className="p-2 rounded-md text-[16px] font-bold text-black bg-gray-200 hover:text-white hover:bg-blue-500 shadow-md">
            {buttonText}
          </button>
        </Link>
      </div>
    </section>
  );
}
