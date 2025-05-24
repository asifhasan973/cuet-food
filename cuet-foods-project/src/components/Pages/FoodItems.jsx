import React from "react";

const FoodItems = ({ items }) => {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      

      <h2 className="text-3xl font-extrabold mb-6 text-[#89b758]">Food Items</h2>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <li
            key={item._id}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-4 flex flex-col justify-between"
          >
            <div className="mb-4">
              <img
                src={item.foodImage}
                alt={item.foodName}
                className="w-full h-40 object-cover rounded-md mb-3"
              />
              <h3 className="text-xl font-semibold mb-1">{item.foodName}</h3>
              <p className="text-gray-600 text-sm line-clamp-3">{item.Description}</p>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-lg font-bold text-[#89b758]">৳{item.price}</p>
              <div className="flex items-center space-x-1 text-yellow-400 font-semibold">
                <span>⭐</span>
                <span>{item.rating.toFixed(1)}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FoodItems;
