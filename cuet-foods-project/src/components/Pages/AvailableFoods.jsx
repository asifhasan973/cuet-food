import React, { useState, useMemo } from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

// StarRating component
const StarRating = ({ rating }) => {
  const totalStars = 5;
  return (
    <div className="flex items-center space-x-1">
      {[...Array(totalStars)].map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.39 2.462a1 1 0 00-.364 1.118l1.287 3.974c.3.922-.755 1.688-1.54 1.118L10 13.347l-3.39 2.462c-.785.57-1.838-.196-1.54-1.118l1.287-3.974a1 1 0 00-.364-1.118L3.602 9.4c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.974z" />
        </svg>
      ))}
    </div>
  );
};

const QuantitySelector = ({ food, quantity, onQuantityChange }) => {
  const handleIncrease = () => {
    if (quantity < food.foodQuantity) {
      onQuantityChange(quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleDecrease}
        className="btn btn-sm bg-gray-200 text-black border-0 hover:bg-gray-300"
        disabled={quantity <= 1}
      >
        -
      </button>
      <span className="text-lg font-semibold">{quantity}</span>
      <button
        onClick={handleIncrease}
        className="btn btn-sm bg-gray-200 text-black border-0 hover:bg-gray-300"
        disabled={quantity >= food.foodQuantity}
      >
        +
      </button>
    </div>
  );
};

const AvailableFoods = () => {
let originalFoods = useLoaderData();
console.log("Original Foods Data:", originalFoods);



  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);
  const [sortBy, setSortBy] = useState("rating"); // 'rating' or 'price'
  const [sortRatingAsc, setSortRatingAsc] = useState(true);
  const [sortPriceAsc, setSortPriceAsc] = useState(true);

  // Track quantity per food in a map
  const [quantities, setQuantities] = useState({});

  const filteredFoods = useMemo(() => {
    if (!Array.isArray(originalFoods)) return [];

    const filtered = originalFoods.filter(
      (food) =>
        Number(food.foodQuantity) > 0 &&
        (food.foodName ?? "").toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortBy === "rating") {
      filtered.sort((a, b) =>
        sortRatingAsc ? a.rating - b.rating : b.rating - a.rating
      );
    } else if (sortBy === "price") {
      filtered.sort((a, b) =>
        sortPriceAsc ? a.price - b.price : b.price - a.price
      );
    }

    return filtered;
  }, [originalFoods, searchQuery, sortBy, sortRatingAsc, sortPriceAsc]);

  const visibleFoods = filteredFoods.slice(0, visibleCount);

  const addToCart = (food, quantity) => {
    if (quantity > Number(food.foodQuantity)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Cannot add more than available stock (${food.foodQuantity})`,
      });
      return;
    }

    const storedCart = localStorage.getItem("cart");
    const cart = storedCart ? JSON.parse(storedCart) : [];

    const existingItem = cart.find((item) => item._id === food._id);
    let updatedCart;
    if (existingItem) {
      updatedCart = cart.map((item) =>
        item._id === food._id
          ? { ...item, quantity: Math.min(item.quantity + quantity, item.foodQuantity) }
          : item
      );
    } else {
      updatedCart = [...cart, { ...food, quantity }];
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: `${food.foodName} added to cart!`,
      showConfirmButton: false,
      timer: 1500,
      toast: true,
    });
  };

  const handleQuantityChange = (foodId, newQuantity) => {
    setQuantities((prev) => ({ ...prev, [foodId]: newQuantity }));
  };

  return (
    <div className="w-10/12 mx-auto mb-40 mt-20">
      <h1 className="text-center text-4xl font-bold mt-20 pb-10">Available Foods</h1>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 md:gap-2">
        <input
          type="text"
          placeholder="Search by food name..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setVisibleCount(6);
          }}
          className="input input-bordered w-full md:w-1/3"
        />

        <button
          onClick={() => {
            if (sortBy === "rating") {
              setSortRatingAsc((prev) => !prev);
            } else {
              setSortBy("rating");
              setSortRatingAsc(true);
            }
          }}
          className={`btn px-6 py-2 rounded-md transition duration-200 ${
            sortBy === "rating"
              ? "bg-[#89b758] text-white border-[#89b758]"
              : "text-[#89b758] border-[#89b758] bg-transparent hover:bg-[#89b758] hover:text-white"
          }`}
        >
          Sort by Rating: {sortRatingAsc ? "Low to High" : "High to Low"}
        </button>

        <button
          onClick={() => {
            if (sortBy === "price") {
              setSortPriceAsc((prev) => !prev);
            } else {
              setSortBy("price");
              setSortPriceAsc(true);
            }
          }}
          className={`btn px-6 py-2 rounded-md transition duration-200 ${
            sortBy === "price"
              ? "bg-[#89b758] text-white border-[#89b758]"
              : "text-[#89b758] border-[#89b758] bg-transparent hover:bg-[#89b758] hover:text-white"
          }`}
        >
          Sort by Price: {sortPriceAsc ? "Low to High" : "High to Low"}
        </button>
      </div>

      <div className="grid gap-10 grid-cols-1 md:grid-cols-3">
        {visibleFoods.map((food) => {
          const quantity = quantities[food._id] || 1;
          return (
            <div
              key={food._id}
              className="card card-compact bg-base-100 h-full border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              <figure>
                <img
                  className="h-[250px] w-full object-cover"
                  src={food.foodImage}
                  alt={food.foodName}
                />
              </figure>
              <div className="card-body flex flex-col flex-grow">
                <h2 className="card-title">{food.foodName}</h2>
                <p className="flex-grow">{food.additionalNotes}</p>
                <h3 className="text-base">
                  <span className="font-bold">Quantity Available:</span> {food.foodQuantity}
                </h3>
                <h3 className="text-base">
                  <span className="font-bold">Vendor:</span> {food.vendor}
                </h3>
                <div className="text-3xl font-bold text-[#89b758]">৳{food.price}</div>
                <div className="flex items-center gap-3 mt-4">
                  <QuantitySelector
                    food={food}
                    quantity={quantity}
                    onQuantityChange={(newQuantity) =>
                      handleQuantityChange(food._id, newQuantity)
                    }
                  />
                  <button
                    onClick={() => addToCart(food, quantity)}
                    className="btn bg-[#89b758] text-white border-0 text-lg px-10 hover:text-black"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center items-center mt-10">
        {visibleCount < filteredFoods.length && (
          <button
            onClick={() => setVisibleCount((v) => v + 6)}
            className="btn bg-transparent border-[#89b758] text-[#89b758] text-xl px-10 py-2 mr-4 hover:bg-[#89b758] hover:text-white"
          >
            Show More
          </button>
        )}
        {visibleCount > 6 && (
          <button
            onClick={() => setVisibleCount((v) => Math.max(v - 6, 6))}
            className="btn bg-transparent border-[#89b758] text-[#89b758] text-xl px-10 py-2 hover:bg-[#89b758] hover:text-white"
          >
            Show Less
          </button>
        )}
      </div>
    </div>
  );
};

export default AvailableFoods;
