import { useState } from "react";

export function SectionHeader({ number, setNumber }) {
  const navigation = [
    {
      href: "",
      name: "Command",
    },
    {
      href: "",
      name: "Product",
    },
    {
      href: "",
      name: "User",
    },
    {
      href: "",
      name: "Qrcode",
    },
  ];

  return (
    <div className="max-w-screen-xl mx-auto px-4 pt-4 md:px-8">
      <div className="mt-6 md:mt-4">
        <ul className="w-full border-b flex items-center gap-x-3 overflow-x-auto">
          {navigation.map((item, idx) => (
            // Replace [idx == 0] with [window.location.pathname == item.path] or create your own logic
            <li
              key={idx}
              className={`py-2 border-b-2 ${
                idx === number
                  ? "border-indigo-600 text-indigo-600"
                  : "border-white text-gray-500"
              }`}
            >
              <p
                className="py-2.5 px-4 rounded-lg duration-150 text-sm hover:text-indigo-600 hover:bg-gray-50 active:bg-gray-100 font-medium"
                onClick={() => setNumber(idx)}
              >
                {item.name}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
