import React, { useState, useEffect } from "react";
import FoodItems from "./FoodItems";

const AvailableVendors = () => {
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(
      "https://raw.githubusercontent.com/asifhasan973/All_jsons/refs/heads/main/foods_main"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Group items by vendor name
        const vendorMap = {};
        data.forEach((food) => {
          if (!vendorMap[food.vendor]) {
            vendorMap[food.vendor] = [];
          }
          vendorMap[food.vendor].push(food);
        });
        const vendorList = Object.keys(vendorMap).map((vendorName) => ({
          name: vendorName,
          items: vendorMap[vendorName],
        }));
        setVendors(vendorList);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch vendors:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
        <span className="ml-3 text-lg font-semibold">Loading vendors...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-600 font-semibold text-lg">
        Error: {error}
      </div>
    );
  }

  if (selectedVendor) {
    return (
      <div>
        <button
          onClick={() => setSelectedVendor(null)}
          className="btn btn-outline btn-sm mb-6"
        >
          
        </button>
        <FoodItems items={selectedVendor.items} />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-8 text-center text-[#89b758]">
        Available Vendors
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {vendors.map((vendor, index) => (
          <div
            key={index}
            onClick={() => setSelectedVendor(vendor)}
            className="card bg-white shadow-md hover:shadow-lg cursor-pointer rounded-lg p-6 flex flex-col justify-between transition-transform transform hover:-translate-y-1"
          >
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {vendor.name}
              </h2>
              <p className="text-gray-500">{vendor.items.length} items</p>
            </div>
            <div className="mt-4">
              <button className="btn btn-sm bg-[#89b758] text-white w-full">View Items</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableVendors;
