import React, { useState } from "react";
import { Plus, MoreVertical, Package, Edit, Trash2 } from "lucide-react";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/firebase";
import toast from "react-hot-toast";

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

interface GadgetsInventoryProps {
  products: Gadget[];
  onAddGadget: () => void;
}

const GadgetsInventory: React.FC<GadgetsInventoryProps> = ({
  products: initialProducts,
  onAddGadget,
}) => {
  const [products, setProducts] = useState<Gadget[]>(initialProducts);
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Gadget>>({});
  const [isEditing, setIsEditing] = useState(false);
  const getProductStatusBadge = (status: Gadget["status"]) => {
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

  // Edit handler
  const handleEdit = async (id: string) => {
    setIsEditing(true);
    try {
      const gadgetRef = doc(db, "gadgets", id);
      await updateDoc(gadgetRef, {
        name: editForm.name,
        price: editForm.price,
        color: editForm.color,
        description: editForm.description,
        // Add more fields as needed
      });
      toast.success("Gadget updated!");
      setEditId(null);
    } catch (err) {
      toast.error("Failed to update gadget");
    } finally {
      setIsEditing(false);
    }
  };

  // Delete handler
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this gadget?")) return;
    try {
      await deleteDoc(doc(db, "gadgets", id));
      setProducts((prev) => prev.filter((g) => g.id !== id));
      toast.success("Gadget deleted!");
    } catch (err) {
      toast.error("Failed to delete gadget");
    }
    setMenuOpenId(null);
  };

  return (
    <div className="bg-card rounded-xl shadow-sm border border-dim/50 mb-8">
      <div className="p-6 border-b border-dim/50">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-text">Gadgets Inventory</h2>
          <button
            onClick={onAddGadget}
            className="px-4 py-2 bg-accent-light text-color rounded-3xl hover:bg-accent transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-white">Add Gadget</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl">
        <table className="w-full">
          <thead className="bg-card border-b border-dim/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-text/80 textse tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text/80 textse tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text/80 textse tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text/80 textse tracking-wider">
                Sales
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text/80 textse tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text/80 textse tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-card divide-y divide-gray-200">
            {products.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center">
                  <div className="text-gray-500">
                    <Package className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-lg font-medium text-text">
                      No gadgets found
                    </p>
                    <p className="text-sm text-text">
                      Start by adding your first gadget to the inventory.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              products.map((product) => [
                <tr
                  key={product.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-3xl flex items-center justify-center text-2xl">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {product.name}
                        </div>
                        <div className="text-sm text-text">
                          ID: {product.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {product.price}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {product.stock} units
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{product.sales}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getProductStatusBadge(product.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium relative">
                    <button
                      className="p-2 rounded-3xl hover:bg-gray-100 transition-colors"
                      onClick={() =>
                        setMenuOpenId(
                          menuOpenId === product.id ? null : product.id,
                        )
                      }
                    >
                      <MoreVertical className="w-5 h-5 text-gray-600" />
                    </button>
                    {menuOpenId === product.id && (
                      <div className="absolute right-0 mt-2 w-32 bg-color border border-gray-200 rounded shadow-lg z-10">
                        <button
                          className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100"
                          onClick={() => {
                            setEditId(product.id);
                            setEditForm(product);
                            setMenuOpenId(null);
                          }}
                        >
                          <Edit className="w-4 h-4 mr-2" /> Edit
                        </button>
                        <button
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                          onClick={() => handleDelete(product.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" /> Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>,
                editId === product.id ? (
                  <tr key={product.id + "-edit"} className="bg-gray-50">
                    <td colSpan={6} className="px-6 py-4">
                      <form
                        className="flex flex-col md:flex-row gap-2 items-center"
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleEdit(product.id);
                        }}
                      >
                        <input
                          type="text"
                          value={editForm.name || ""}
                          onChange={(e) =>
                            setEditForm((f) => ({ ...f, name: e.target.value }))
                          }
                          placeholder="Name"
                          className="border px-2 py-1 rounded"
                        />
                        <input
                          type="text"
                          value={editForm.price || ""}
                          onChange={(e) =>
                            setEditForm((f) => ({
                              ...f,
                              price: e.target.value,
                            }))
                          }
                          placeholder="Price"
                          className="border px-2 py-1 rounded"
                        />
                        <input
                          type="text"
                          value={editForm.color || ""}
                          onChange={(e) =>
                            setEditForm((f) => ({
                              ...f,
                              color: e.target.value,
                            }))
                          }
                          placeholder="Color"
                          className="border px-2 py-1 rounded"
                        />
                        <input
                          type="text"
                          value={editForm.description || ""}
                          onChange={(e) =>
                            setEditForm((f) => ({
                              ...f,
                              description: e.target.value,
                            }))
                          }
                          placeholder="Description"
                          className="border px-2 py-1 rounded"
                        />
                        <button
                          type="submit"
                          disabled={isEditing}
                          className="bg-accent-light text-color px-3 py-1 rounded disabled:opacity-50"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditId(null)}
                          className="bg-gray-200 px-3 py-1 rounded"
                        >
                          Cancel
                        </button>
                      </form>
                    </td>
                  </tr>
                ) : null,
              ])
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GadgetsInventory;
