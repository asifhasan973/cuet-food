import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const DashboardProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    foodName: "",
    foodImage: "",
    price: "",
    foodQuantity: "",
    vendor: "",
  });
  const [cart, setCart] = useState({});
  const [quantities, setQuantities] = useState({}); // per product quantity selector

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      const fetchedProducts = [
        {
          id: 1,
          foodName: "Vegetable Biryani",
          foodImage:
            "https://plus.unsplash.com/premium_photo-1698867575634-d39ef95fa6a7?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          price: 120,
          foodQuantity: 10,
          vendor: "Shah Hall Canteen",
        },
        {
          id: 2,
          foodName: "Chicken Kebab",
          foodImage:
            "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          price: 150,
          foodQuantity: 5,
          vendor: "TSC Canteen",
        },
      ];
      setProducts(fetchedProducts);
      setLoading(false);

      // Initialize quantities state with 1 per product
      const initialQuantities = {};
      fetchedProducts.forEach((p) => (initialQuantities[p.id] = 1));
      setQuantities(initialQuantities);

      // Load cart from localStorage
      const storedCart = localStorage.getItem("cart");
      setCart(storedCart ? JSON.parse(storedCart) : {});
    }, 1000);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleDeleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== id));
      Swal.fire({
        icon: "success",
        title: "Product deleted successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const newId = Date.now();
    const productToAdd = { ...newProduct, id: newId };
    productToAdd.price = Number(productToAdd.price);
    productToAdd.foodQuantity = Number(productToAdd.foodQuantity);

    setProducts((prev) => [...prev, productToAdd]);
    setQuantities((prev) => ({ ...prev, [newId]: 1 }));
    setIsModalOpen(false);
    Swal.fire({
      icon: "success",
      title: "Product added successfully",
      showConfirmButton: false,
      timer: 1500,
    });
    setNewProduct({
      foodName: "",
      foodImage: "",
      price: "",
      foodQuantity: "",
      vendor: "",
    });
  };

  const handleQuantityChange = (id, delta) => {
    setQuantities((prev) => {
      const current = prev[id] || 1;
      const product = products.find((p) => p.id === id);
      let newQuantity = current + delta;
      if (newQuantity < 1) newQuantity = 1;
      if (newQuantity > product.foodQuantity) newQuantity = product.foodQuantity;
      return { ...prev, [id]: newQuantity };
    });
  };

  const addToCart = (productId) => {
    const quantityToAdd = quantities[productId];
    const product = products.find((p) => p.id === productId);

    setCart((prev) => {
      const prevQuantity = prev[productId]?.quantity || 0;
      let newQuantity = prevQuantity + quantityToAdd;
      if (newQuantity > product.foodQuantity) {
        newQuantity = product.foodQuantity;
        Swal.fire({
          icon: "warning",
          title: "Stock limit reached",
          text: `Cannot add more than available quantity (${product.foodQuantity})`,
          timer: 2000,
          showConfirmButton: false,
        });
      }
      return {
        ...prev,
        [productId]: { ...product, quantity: newQuantity },
      };
    });

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: `${product.foodName} added to cart!`,
      showConfirmButton: false,
      timer: 1500,
      toast: true,
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Your Products</h1>

      {/* Add New Product Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn bg-[#8fbf5b] text-white hover:text-black"
        >
          Add New Product
        </button>
      </div>

      {/* Modal for adding new product */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add New Product</h2>
            <form onSubmit={handleAddProduct}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Food Name</label>
                <input
                  type="text"
                  name="foodName"
                  value={newProduct.foodName}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Photo URL</label>
                <input
                  type="text"
                  name="foodImage"
                  value={newProduct.foodImage}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Price</label>
                <input
                  type="number"
                  name="price"
                  value={newProduct.price}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                  required
                  min={0}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Quantity</label>
                <input
                  type="number"
                  name="foodQuantity"
                  value={newProduct.foodQuantity}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                  required
                  min={1}
                />
              </div>
              
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button type="submit" className="btn bg-[#8fbf5b] text-white">
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Product List */}
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all rounded-lg overflow-hidden flex flex-col"
            >
              <img
                src={product.foodImage}
                alt={product.foodName}
                className="h-48 w-full object-cover"
              />
              <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-xl font-semibold">{product.foodName}</h2>
                <p className="text-sm text-gray-500">{product.vendor}</p>
                <p className="mt-2">
                  <span className="font-bold">Price:</span> ৳{product.price}
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-bold">Quantity Available:</span> {product.foodQuantity}
                </p>

                {/* Quantity Selector */}
                <div className="flex items-center gap-2 mt-auto">
                  <button
                    onClick={() => handleQuantityChange(product.id, -1)}
                    disabled={quantities[product.id] <= 1}
                    className="btn btn-sm btn-outline"
                  >
                    -
                  </button>
                  <span className="text-lg font-semibold">{quantities[product.id]}</span>
                  <button
                    onClick={() => handleQuantityChange(product.id, 1)}
                    disabled={quantities[product.id] >= product.foodQuantity}
                    className="btn btn-sm btn-outline"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => addToCart(product.id)}
                  className="btn bg-[#8fbf5b] text-white mt-4 hover:text-black"
                  disabled={product.foodQuantity === 0}
                >
                  Add to Cart
                </button>

                {/* Edit & Delete */}
                <div className="flex gap-4 mt-4">
                  <button className="btn btn-outline btn-sm text-blue-500">Edit</button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="btn btn-outline btn-sm text-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardProducts;
