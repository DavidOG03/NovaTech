"use client";

import React, { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  DollarSign,
  Users,
  TrendingUp,
  TrendingDown,
  Eye,
  BarChart3,
  Settings,
  Bell,
  Search,
  Filter,
  Download,
  Plus,
  MoreVertical,
  ChevronDown,
  Star,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useProductContext } from "@/context/ProductContext";

// Types
interface StatCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  color: string;
}

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  stock: number;
  sales: number;
  status: "active" | "low-stock" | "out-of-stock";
}

interface Order {
  id: string;
  customer: string;
  product: string;
  amount: number;
  status: "pending" | "processing" | "completed" | "cancelled";
  date: string;
}

const SellerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedPeriod, setSelectedPeriod] = useState("This Month");
  const [userName, setUserName] = useState<string>("");
  const { user } = useAuth();
  const { getCartTotal, orders } = useProductContext();
  const totalRevenue = getCartTotal();
  const [localOrders, setLocalOrders] = useState(orders);

  function generateInitialsAvatar(name: string): string {
    const initials = encodeURIComponent(name);
    return `https://ui-avatars.com/api/?name=${initials}&background=random`;
  }

  useEffect(() => {
    const storedName = user?.name || "Admin";
    setUserName(storedName);
  }, [user]);

  // Mock data
  const stats = [
    {
      title: "Total Revenue",
      value: totalRevenue,
      // change: 12.5,
      icon: <DollarSign className="w-6 h-6" />,
      color: "blue",
    },
    {
      title: "Total Orders",
      value: orders.length,
      // change: 8.2,
      icon: <ShoppingCart className="w-6 h-6" />,
      color: "green",
    },
    {
      title: "Total Products",
      value: "5",
      // change: -3.1,
      icon: <Package className="w-6 h-6" />,
      color: "purple",
    },
    {
      title: "Total Customers",
      value: "5",
      // change: 15.3,
      icon: <Users className="w-6 h-6" />,
      color: "orange",
    },
  ];

  const products: Product[] = [
    {
      id: 1,
      name: "Wireless Headphones",
      image: "🎧",
      price: 79.99,
      stock: 45,
      sales: 234,
      status: "active",
    },
  ];

  const recentOrders: Order[] = [
    {
      id: "#ORD-001",
      customer: "John Doe",
      product: "Wireless Headphones",
      amount: 79.99,
      status: "completed",
      date: "2 min ago",
    },
  ];

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "processing":
        return <Clock className="w-4 h-4" />;
      case "pending":
        return <AlertCircle className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
    }
  };

  const getProductStatusBadge = (status: Product["status"]) => {
    switch (status) {
      case "active":
        return (
          <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
            Active
          </span>
        );
      case "low-stock":
        return (
          <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
            Low Stock
          </span>
        );
      case "out-of-stock":
        return (
          <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
            Out of Stock
          </span>
        );
    }
  };

  const StatCard: React.FC<StatCardProps> = ({
    title,
    value,
    // change,
    icon,
    color,
  }) => {
    const colorClasses: Record<string, string> = {
      blue: "bg-blue-500",
      green: "bg-green-500",
      purple: "bg-purple-500",
      orange: "bg-orange-500",
    };

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className={`${colorClasses[color]} p-3 rounded-3xl text-white`}>
            {icon}
          </div>
          {/* <div
            className={`flex items-center space-x-1 text-sm font-medium ${
              change >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {change >= 0 ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            {/* <span>{Math.abs(change)}%</span>
          </div> */}
        </div>
        <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-pink to-background p-2 rounded-3xl">
                  <LayoutDashboard className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Seller Dashboard
                  </h1>
                  <p className="text-sm text-light-black">
                    Welcome back, Admin!
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products, orders..."
                  className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Notifications */}
              <button className="relative p-2 rounded-3xl hover:bg-gray-100 transition-colors">
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Settings */}
              <button className="p-2 rounded-3xl hover:bg-gray-100 transition-colors">
                <Settings className="w-6 h-6 text-gray-600" />
              </button>

              {/* Profile */}
              <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
                <div className="text-right hidden md:block">
                  <p className="text-sm font-medium text-gray-900">
                    {userName}
                  </p>
                  <p className="text-xs text-light-black">Premium Account</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-pink to-background rounded-full flex items-center justify-center text-white font-semibold">
                  <img
                    src={generateInitialsAvatar(userName)}
                    alt="profile picture"
                    className="w-full h-full rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-8">
        {/* Period Selector */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-3xl hover:bg-gray-50 transition-colors flex items-center space-x-2">
              <span className="text-sm font-medium text-light-black">
                {selectedPeriod}
              </span>
              <ChevronDown className="w-4 h-4 text-light-black" />
            </button>
            <button className="p-2 bg-white border border-gray-300 rounded-3xl hover:bg-gray-50 transition-colors">
              <Filter className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <button className="px-4 py-2 bg-pink text-white rounded-3xl hover:bg-background transition-colors flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span className="text-sm font-medium">Export Report</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Charts and Data Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Sales Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">
                Sales Overview
              </h2>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1.5 text-sm bg-blue-50 text-pink rounded-3xl font-medium">
                  Week
                </button>
                <button className="px-3 py-1.5 text-sm text-gray-600 rounded-3xl font-medium hover:bg-gray-100">
                  Month
                </button>
                <button className="px-3 py-1.5 text-sm text-gray-600 rounded-3xl font-medium hover:bg-gray-100">
                  Year
                </button>
              </div>
            </div>

            {/* Simple Chart Placeholder */}
            <div className="h-64 flex items-end justify-between space-x-2">
              {[65, 45, 75, 55, 80, 60, 90].map((height, i) => (
                <div
                  key={i}
                  className="flex-1 flex flex-col items-center space-y-2"
                >
                  <div
                    className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all hover:from-pink hover:to-blue-500 cursor-pointer"
                    style={{ height: `${height}%` }}
                  />
                  <span className="text-xs text-light-black font-medium">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6">
              Top Products
            </h2>
            <div className="space-y-4">
              {products.slice(0, 5).map((product, index) => (
                <div key={product.id} className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-3xl flex items-center justify-center text-2xl">
                    {product.image}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {product.name}
                    </p>
                    <p className="text-xs text-light-black">
                      {product.sales} sales
                    </p>
                  </div>
                  <div className="flex items-center space-x-1 text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium">4.{9 - index}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">
                Products Inventory
              </h2>
              <button className="px-4 py-2 bg-pink text-white rounded-3xl hover:bg-background transition-colors flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span className="text-sm font-medium">Add Product</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-light-black uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-light-black uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-light-black uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-light-black uppercase tracking-wider">
                    Sales
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-light-black uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-light-black uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-3xl flex items-center justify-center text-2xl">
                          {product.image}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {product.name}
                          </div>
                          <div className="text-sm text-light-black">
                            ID: {product.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        ${product.price}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {product.stock} units
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {product.sales}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getProductStatusBadge(product.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="p-2 rounded-3xl hover:bg-gray-100 transition-colors">
                        <MoreVertical className="w-5 h-5 text-gray-600" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
              <button className="text-sm text-pink hover:text-background font-medium">
                View All
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-light-black uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-light-black uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-light-black uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-light-black uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-light-black uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-light-black uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {order.id}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {order.customer}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {order.product}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        ${order.amount}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {getStatusIcon(order.status)}
                        <span className="capitalize">{order.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-light-black">
                        {order.date}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

// // export default SellerDashboard;
// import React from "react";
// export default function SellerDashboard() {
//   return (
//     <div className="w-full h-full grid place-content-center">Coming soon</div>
//   );
// }
