import React from "react";
import { useProductContext } from "@/context/ProductContext";
import { Package, ShoppingBag, AlertCircle } from "lucide-react";

const Orders: React.FC = () => {
  const { orders } = useProductContext();

  return (
    <div className="pt-24 px-6 bg-white">
      <h2 className="text-2xl text-black font-semibold mb-6 flex items-center gap-2">
        <Package className="text-primary" />
        Your Orders
      </h2>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-22 text-gray-500">
          <AlertCircle size={48} className="mb-4" />
          <p className="text-lg font-medium">
            You haven’t placed any orders yet.
          </p>
          <p className="text-sm">
            Go back to the{" "}
            <a href="/products" className="text-background hover:underline">
              store
            </a>{" "}
            and add items to your cart.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white text-gray-700 p-5 rounded-2xl shadow-md border border-gray-800"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-semibold">
                    Order ID: <span className="text-primary">{order.id}</span>
                  </h3>
                  <p className="text-sm text-gray-400">Date: {order.date}</p>
                </div>
                <span
                  className={`text-sm px-3 py-1 rounded-full ${
                    order.status === "Pending"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : order.status === "Shipped"
                      ? "bg-blue-500/20 text-blue-400"
                      : order.status === "Delivered"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
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
                    className="bg-grey rounded-xl p-4 flex items-center gap-4"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-contain rounded-lg"
                    />
                    <div>
                      <h4 className="text-sm font-semibold">{item.name}</h4>
                      <p className="text-xs text-gray-400">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-sm font-bold text-primary">
                        ₦{item.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center border-t border-gray-700 pt-3">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <ShoppingBag size={16} />
                  <span>{order.items.length} items</span>
                </div>
                <p className="font-semibold text-primary">
                  Total: ₦{order.total.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
