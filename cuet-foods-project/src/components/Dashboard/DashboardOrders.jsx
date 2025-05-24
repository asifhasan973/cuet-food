import React, { useState } from "react";
import Swal from "sweetalert2";

const initialOrders = [
  {
    orderId: "ORD001",
    customerName: "Asif Rahman",
    productName: "Vegetable Biryani",
    quantity: 2,
    status: "Out for Delivery",
  },
  {
    orderId: "ORD002",
    customerName: "Sadia Islam",
    productName: "Chicken Kebab",
    quantity: 1,
    status: "Pending",
  },
  
];

const VendorOrders = () => {
  const [orders, setOrders] = useState(initialOrders);

  const updateStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.orderId === orderId ? { ...order, status: newStatus } : order
      )
    );
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: `Order ${orderId} marked as "${newStatus}"`,
      showConfirmButton: false,
      timer: 1500,
      toast: true,
    });
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Orders Received</h1>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border rounded-lg shadow-lg">
            <thead>
              <tr className="bg-[#89b758] text-white">
                <th>Order ID</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(({ orderId, customerName, productName, quantity, status }) => (
                <tr key={orderId} className="hover:bg-gray-100">
                  <td>{orderId}</td>
                  <td>{customerName}</td>
                  <td>{productName}</td>
                  <td>{quantity}</td>
                  <td>
                    <span
                      className={`badge`}
                    >
                      {status}
                    </span>
                  </td>
                  <td className="flex justify-center gap-2">
                    {status !== "Delivery Done" && status !== "Cancelled" && (
                      <>
                        <button
                          onClick={() => updateStatus(orderId, "Delivery Done")}
                          className="btn btn-success btn-sm"
                        >
                          Delivery Done
                        </button>
                        <button
                          onClick={() => updateStatus(orderId, "Cancelled")}
                          className="btn btn-error btn-sm"
                        >
                          Cancel Order
                        </button>
                        <button
                          onClick={() => updateStatus(orderId, "Out for Delivery")}
                          className="btn btn-warning btn-sm"
                        >
                          Out for Delivery
                        </button>
                      </>
                    )}
                    {(status === "Delivery Done" || status === "Cancelled") && (
                      <span className="text-gray-500 italic select-none">No Actions</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default VendorOrders;
