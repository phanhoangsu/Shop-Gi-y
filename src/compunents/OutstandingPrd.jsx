import React from "react";

const OutstandingPrd = () => {
  return (
    <div className="grid grid-cols-3 gap-6 p-6">
      {[
        {
          src: "https://res.cloudinary.com/dbpqjnu0o/image/upload/v1741348823/9124c5518-4__1__727758abd44c462db36829f6bf0e9277_large_ihc0dt.webp",
          alt: "Giày nam",
        },
        {
          src: "https://res.cloudinary.com/dbpqjnu0o/image/upload/v1741348651/images_ta8n2z.jpg",
          alt: "Ảnh nữ",
        },
        {
          src: "https://res.cloudinary.com/dbpqjnu0o/image/upload/v1741348652/images_1_p1fylq.jpg",
          alt: "Ảnh trẻ em",
        },
      ].map((item, index) => (
        <div key={index} className="flex flex-col items-center space-y-4">
          <img
            src={item.src}
            alt={item.alt}
            className="w-64 h-64 object-cover rounded-lg shadow-lg"
          />
          <button className="bg-red-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-red-600 transition">
            Buy Now
          </button>
        </div>
      ))}
    </div>
  );
};

export default OutstandingPrd;
