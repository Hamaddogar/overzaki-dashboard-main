import React from "react";

const ProductCard2 = () => {
  return (
    <div className="bg-white w-72 h-96 shadow-md rounded">
      <div className="h-3/4 w-full">
        <img
          className="w-full h-full object-cover rounded-t"
          src="https://images.pexels.com/photos/6157052/pexels-photo-6157052.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          alt="piña"
        />
      </div>
      <div className="flex w-full p-3 items-center">
        <div className="w-full h-1/4">
          <a href="#" className=" hover:text-yellow-600 text-gray-700">
            <span className="text-lg font-semibold uppercase tracking-wide ">
              Pineapple
            </span>
          </a>
          <p className="text-gray-600 text-sm leading-5 mt-1">Suit</p>
        </div>
        <span className="text-lg font-semibold">$22</span>
      </div>
    </div>
  );
};

export default ProductCard2;
