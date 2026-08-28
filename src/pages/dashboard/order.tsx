import React, { useState } from "react";
import { useProductContext } from "@/context/ProductContext";
import { Package, ShoppingBag, AlertCircle } from "lucide-react";
import { Link } from "react-router";
import toast from "react-hot-toast";

const Orders: React.FC = () => {
  const { orders, clearOrders } = useProductContext();

  const [localOrders, setLocalOrders] = useState(orders);

  // cancel/delete
  const handleCancelOrder = (orderId: string | number) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    // remove order
    const updatedOrders = localOrders.filter((order) => order.id !== orderId);

    setLocalOrders(updatedOrders);

    if (updatedOrders.length < 1) {
      clearOrders();
    }

    toast.success("Order cancelled successfully!");
  };

  return (
    <div className="mt-22 px-6 bg-color rounded-3xl py-10">
      <h2 className="text-2xl text-accent-secondary font-semibold mb-6 flex items-center gap-2">
        <Package className="text-primary" />
        Your Orders
      </h2>

      {localOrders.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-22 text-gray-500">
          <AlertCircle size={48} className="mb-4" />
          <p className="text-lg font-medium">
            You haven’t placed any orders yet.
          </p>
          <p className="text-sm">
            Go back to the{" "}
            <Link to="/products" className="text-accent-light hover:underline">
              store
            </Link>{" "}
            and add items to your cart.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {localOrders.map((order) => (
            <div
              key={order.id}
              className="text-dim p-5 rounded-2xl shadow-md border border-dim/25 bg-card"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-text">
                    Order ID: <span className="text-primary">{order.id}</span>
                  </h3>
                  <p className="text-sm text-dim">Date: {order.date}</p>
                </div>
                <span
                  className={`text-sm px-3 py-1 rounded-full ${
                    order.status === "Pending"
                      ? "bg-yellow-500/20 text-yellow-600"
                      : order.status === "Shipped"
                        ? "bg-blue-500/20 text-blue-600"
                        : order.status === "Delivered"
                          ? "bg-green-500/20 text-green-600"
                          : "bg-red-500/20 text-red-600"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              {/* Items */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-card border border-dim/25 rounded-xl p-4 flex items-center gap-4"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-contain rounded-lg"
                    />
                    <div>
                      <h4 className="text-sm font-semibold text-accent-secondary">
                        {item.name}
                      </h4>
                      <p className="text-xs text-muted">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-sm font-bold text-accent-secondary">
                        ₦{item.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center border-t border-dim/50 pt-3">
                <div className="flex items-center gap-2 text-sm text-dim">
                  <ShoppingBag size={16} />
                  <span>
                    {order.items.length} item{"(s)"}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <p className="font-semibold text-text">
                    Total: ₦{order.total.toLocaleString()}
                  </p>

                  {/* Cancel Order button */}
                  {order.status === "Pending" && (
                    <button
                      onClick={() => handleCancelOrder(order.id)}
                      className="bg-important hover:bg-important/80 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer"
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
