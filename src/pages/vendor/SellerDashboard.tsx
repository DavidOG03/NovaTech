"use client";

import React, { useEffect, useState } from "react";
import { ShoppingCart, DollarSign, Users, Package } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useProductContext } from "@/context/ProductContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { db } from "@/firebase";
import { collection, getDocs, query, orderBy, where } from "firebase/firestore";

import StatCard from "./components/StatCard";
import DashboardHeader from "./components/DashboardHeader";
import SalesOverview from "./components/SalesOverview";
import TopProducts from "./components/TopProducts";
import GadgetsInventory from "./components/GadgetsInventory";
import RecentOrders from "./components/RecentOrders";
import AddGadgetModal from "./components/AddGadgetModal";

// Types
interface Gadget {
  id: string;
  name: string;
  image: string;
  price: string;
  stock: number;
  sales: number;
  status: "active" | "low-stock" | "out-of-stock";
  color: string;
  description: string;
  createdAt: any;
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
  const [selectedPeriod, setSelectedPeriod] = useState("This Month");
  const [userName, setUserName] = useState<string>("");
  const [showAddGadgetModal, setShowAddGadgetModal] = useState(false);
  const [gadgets, setGadgets] = useState<Gadget[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentUser, userProfile, switchRole, logout } = useAuth();
  const { getCartTotal, orders } = useProductContext();
  const navigate = useNavigate();
  const totalRevenue = getCartTotal();

  function generateInitialsAvatar(name: string): string {
    const initials = encodeURIComponent(name);
    return `https://ui-avatars.com/api/?name=${initials}&background=random`;
  }

  useEffect(() => {
    const storedName = userProfile?.name || "Admin";
    setUserName(storedName);
  }, [userProfile]);

  // Fetch gadgets from Firestore
  const fetchGadgets = async () => {
    if (!currentUser) return;
    try {
      setLoading(true);
      const gadgetsQuery = query(
        collection(db, "gadgets"),
        where("vendorId", "==", currentUser.uid),
      );
      const querySnapshot = await getDocs(gadgetsQuery);
      const gadgetsData: Gadget[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        stock: doc.data().quantity || 0,
        sales: 0, // TODO: Calculate from orders
        status: (doc.data().quantity > 0
          ? "active"
          : "out-of-stock") as Gadget["status"],
      })) as Gadget[];
      gadgetsData.sort(
        (a, b) => b.createdAt?.toMillis() - a.createdAt?.toMillis(),
      );
      setGadgets(gadgetsData);
    } catch (error) {
      console.error("Error fetching gadgets:", error);
      toast.error("Failed to load gadgets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchGadgets();
    }
  }, [currentUser]);

  // Handle switch to buyer
  const handleSwitchToBuyer = async () => {
    try {
      await switchRole("buyer");
      toast.success("Switched to customer mode");
      navigate("/products", {
        state: {
          userProfile: userProfile
            ? { ...userProfile, activeRole: "buyer" }
            : null,
        },
      });
    } catch (error) {
      console.error("Error switching role:", error);
      toast.error("Failed to switch role");
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      navigate("/signin");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Failed to log out");
    }
  };

  // Stats based on real data
  const stats = [
    {
      title: "Total Revenue",
      value: totalRevenue,
      icon: <DollarSign className="w-6 h-6" />,
      color: "blue",
    },
    {
      title: "Total Orders",
      value: orders.length,
      icon: <ShoppingCart className="w-6 h-6" />,
      color: "green",
    },
    {
      title: "Total Products",
      value: gadgets.length,
      icon: <Package className="w-6 h-6" />,
      color: "purple",
    },
    {
      title: "Total Customers",
      value: "0", // TODO: Calculate unique customers from orders
      icon: <Users className="w-6 h-6" />,
      color: "orange",
    },
  ];

  const recentOrders: Order[] = orders.map((order) => ({
    id: order.id,
    customer: "Customer", // TODO: Add customer info when available
    product: order.items?.[0]?.name || "Unknown Product",
    amount: order.total,
    status: order.status.toLowerCase() as Order["status"],
    date: order.date,
  }));

  return (
    <div className="min-h-screen bg-color relative w-full">
      {/* Header */}
      <DashboardHeader
        userName={userName}
        onSwitchToBuyer={handleSwitchToBuyer}
        onLogout={handleLogout}
        generateInitialsAvatar={generateInitialsAvatar}
      />

      {/* Main Content */}
      <main className="px-6 py-8">
        {/* Period Selector */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <button className="px-4 py-2 bg-accent-light border border-dim/50 rounded-3xl hover:bg-card/50 transition-colors flex items-center space-x-2">
              <span className="text-sm font-medium text-white">
                {selectedPeriod}
              </span>
            </button>
          </div>
          <button className="px-4 py-2 bg-accent-light border border-dim/50 rounded-3xl hover:bg-card/50 transition-colors flex items-center space-x-2">
            <span className="text-sm font-medium text-white">
              Export Report
            </span>
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
          <SalesOverview />
          <TopProducts products={gadgets} />
        </div>

        {/* Gadgets Inventory */}
        <GadgetsInventory
          products={gadgets}
          onAddGadget={() => setShowAddGadgetModal(true)}
        />

        {/* Recent Orders */}
        <RecentOrders orders={recentOrders} />
      </main>

      {/* Add Gadget Modal */}
      <AddGadgetModal
        isOpen={showAddGadgetModal}
        onClose={() => setShowAddGadgetModal(false)}
        onGadgetAdded={fetchGadgets}
      />
    </div>
  );
};

export default SellerDashboard;
