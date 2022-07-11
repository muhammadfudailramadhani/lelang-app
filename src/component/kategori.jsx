import React from "react";

export default function Kategori({ text }) {
  return (
    <React.Fragment>
      <button className="text-sm bg-gray-category text-[#414141] px-5 py-1 rounded-2xl transition ease-in-out hover:scale-110">
        {text}
      </button>
    </React.Fragment>
  );
}
