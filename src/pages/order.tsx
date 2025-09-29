// src/pages/Orders.tsx
import React, { useState } from "react";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  date: string;
  status: "Pending" | "Shipped" | "Delivered" | "Cancelled";
  total: number;
  items: OrderItem[];
}

const sampleOrders: Order[] = [
  {
    id: "ORD-1001",
    date: "2025-09-01",
    status: "Delivered",
    total: 1249,
    items: [
      {
        id: "P1",
        name: "iPhone 15 Pro",
        price: 999,
        quantity: 1,
        image: "https://via.placeholder.com/60x60.png?text=iPhone",
      },
      {
        id: "P2",
        name: "AirPods Pro",
        price: 250,
        quantity: 1,
        image: "https://via.placeholder.com/60x60.png?text=AirPods",
      },
    ],
  },
  {
    id: "ORD-1002",
    date: "2025-09-15",
    status: "Shipped",
    total: 599,
    items: [
      {
        id: "P3",
        name: "Samsung Galaxy Tab S9",
        price: 599,
        quantity: 1,
        image: "https://via.placeholder.com/60x60.png?text=Galaxy+Tab",
      },
    ],
  },
  {
    id: "ORD-1003",
    date: "2025-09-20",
    status: "Pending",
    total: 120,
    items: [
      {
        id: "P4",
        name: "Gaming Mouse",
        price: 60,
        quantity: 2,
        image: "https://via.placeholder.com/60x60.png?text=Mouse",
      },
    ],
  },
];

const statusColors: Record<Order["status"], string> = {
  Pending: "bg-yellow-100 text-yellow-800",
  Shipped: "bg-blue-100 text-blue-800",
  Delivered: "bg-green-100 text-green-800",
  Cancelled: "bg-red-100 text-red-800",
};

const Orders: React.FC = () => {
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggleExpand = (orderId: string) => {
    setExpanded(expanded === orderId ? null : orderId);
  };

  return (
    <div className="min-h-screen bg-grey py-22 flex justify-center">
      <div className="w-full max-w-5xl bg-white rounded-2xl p-6">
        <h2 className="text-2xl font-semibold mb-6">My Orders</h2>

        <div className="space-y-4">
          {sampleOrders.map((order) => (
            <div
              key={order.id}
              className="border rounded-lg p-4 hover:shadow-md transition"
            >
              {/* Order Header */}
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">Order #{order.id}</p>
                  <p className="text-sm text-gray-500">Date: {order.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={`px-3 py-1 text-sm rounded-full ${
                      statusColors[order.status]
                    }`}
                  >
                    {order.status}
                  </span>
                  <p className="font-medium">${order.total}</p>
                  <button
                    onClick={() => toggleExpand(order.id)}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    {expanded === order.id ? "Hide Details" : "View Details"}
                  </button>
                </div>
              </div>

              {/* Order Details */}
              {expanded === order.id && (
                <div className="mt-4 border-t pt-4 space-y-3">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded border"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="font-medium">${item.price}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
