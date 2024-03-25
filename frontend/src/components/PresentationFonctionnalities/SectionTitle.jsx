import React from "react";

// eslint-disable-next-line react/prop-types
export default function SectionTitle({ title }) {
  return (
    <div className="relative flex justify-center">
      <h1 className="absolute -top-4 font-Puffin-Display-Soft font-black italic text-2xl">
        {title}
      </h1>
    </div>
  );
}
