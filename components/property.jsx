import React from "react";
import Image from "next/image";
import { BiBath, BiBed, BiCheckShield, BiSquare } from "react-icons/bi";
const loader = ({ src }) => {
  return src;
};

export function Property({
  isVerified,
  purpose,
  coverPhoto,
  agency,
  baths,
  rooms,
  area,
  title,
  price,
  rentFrequency,
}) {
  return (
    <article className="my-4">
      <div className="w-full max-w-[360px] max-h-[280px] mb-2">
        <Image
          loader={loader}
          unoptimized
          src={coverPhoto?.url}
          width={"400"}
          height={"280"}
          alt={title}
        />
      </div>
      <header className="flex flex-row justify-between items-center gap-[4px] mb-2">
        {isVerified && (
          <i className="text-green-500">
            <BiCheckShield />
          </i>
        )}
        <h1 className="text-[20px] font-bold flex-1">
          AED {price} {purpose == "for-rent" && `/${rentFrequency}`}
        </h1>
        <div className="w-[35px] h-[35px] border-2 hover:border-blue-500 rounded-full overflow-hidden">
          <Image
            loader={loader}
            unoptimized
            src={agency?.logo?.url}
            width={"35"}
            height={"35"}
            alt={title}
          />
        </div>
      </header>
      <div className="flex flex-row gap-x-2 items-center text-blue-500">
        <span className="flex flex-row gap-x-2 items-center">
          <p>{baths}</p>
          <i>
            <BiBath />
          </i>
          |
        </span>
        <span className="flex flex-row gap-x-2 items-center">
          <p>{rooms}</p>
          <i>
            <BiBed />
          </i>
          |
        </span>
        <span className="flex flex-row gap-x-2 items-center">
          <p>{area.toFixed(2)} sqft</p>
          <i>
            <BiSquare />
          </i>
        </span>
      </div>
    </article>
  );
}
