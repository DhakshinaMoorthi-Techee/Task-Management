import React from "react";

export default function LoaderComponent() {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-[#000000b3] bg-opacity-50 z-50">
        <div className="w-16 h-16 border-4 border-white border-t-red-500 rounded-full animate-spin"></div>
      </div>
    </>
  );
}
