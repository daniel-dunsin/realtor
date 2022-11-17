import { useRouter } from "next/router";
import React, { useState } from "react";
import { items } from "../utils/filterItems";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
export function FilterItems() {
  const router = useRouter();
  const [queries, setQueries] = useState(router.query);
  const [openedTab, setOpenedTab] = useState("");
  const filterItems = (key, value) => {
    setQueries((prev) => {
      return { ...prev, [key]: value };
    });
  };
  const openTab = (tabName) => {
    if (openedTab === tabName) {
      setOpenedTab("");
    } else {
      setOpenedTab(tabName);
    }
  };

  const submit = () => {
    const path = router.pathname;
    router.push({ pathname: path, query: queries });
  };
  return (
    <>
      <div className="w-full flex flex-row flex-wrap gap-4 md:gap-8 lg:gap-16 p-2 justify-center my-4">
        {items.map((item, index) => {
          return (
            <article className="relative" key={index}>
              <header
                className={`flex p-2 rounded-md border-2 text-[16px] items-center cursor-pointer ${
                  openedTab === item.param && "border-blue-600"
                }`}
                onClick={() => {
                  openTab(item.param);
                }}
              >
                <h3>{queries[item.param] || item.options[0].name}</h3>
                <i className="text-[24px]">
                  {openedTab === item.param ? (
                    <BiChevronUp />
                  ) : (
                    <BiChevronDown />
                  )}
                </i>
              </header>
              {openedTab === item.param && (
                <ul className="absolute z-30 min-w-[180px] max-h-fit top-0 right-0 left-0 shadow-md rounded-md border-2 bg-white">
                  {item.options.map((itemOption, index) => {
                    return (
                      <li
                        key={index}
                        className="p-2 z-30 cursor-pointer hover:text-blue-500"
                        onClick={() => {
                          setOpenedTab("");
                          if (index === 0) {
                            filterItems(item.param, "");
                          } else {
                            filterItems(item.param, itemOption.value);
                          }
                        }}
                      >
                        {itemOption.name}
                      </li>
                    );
                  })}
                </ul>
              )}
            </article>
          );
        })}
      </div>
      <div className="text-center pb-4">
        <button
          className="w-[150px] py-2 rounded-md bg-blue-600 text-white"
          onClick={submit}
        >
          Submit
        </button>
      </div>
    </>
  );
}
