import React from "react";
import { Plus, MoreVertical, Package } from "lucide-react";

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
  products,
  onAddGadget,
}) => {
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

  return (
    <div className="bg-grey rounded-xl shadow-sm border border-light-black/25 mb-8">
      <div className="p-6 border-b border-light-black/25">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-light-black">
            Gadgets Inventory
          </h2>
          <button
            onClick={onAddGadget}
            className="px-4 py-2 bg-pink text-white rounded-3xl hover:bg-background transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm font-medium">Add Gadget</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-grey border-b border-light-black/25">
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
          <tbody className="bg-grey divide-y divide-gray-200">
            {products.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center">
                  <div className="text-gray-500">
                    <Package className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-medium text-light-black">
                      No gadgets found
                    </p>
                    <p className="text-sm text-light-black">
                      Start by adding your first gadget to the inventory.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              products.map((product) => (
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="p-2 rounded-3xl hover:bg-gray-100 transition-colors">
                      <MoreVertical className="w-5 h-5 text-gray-600" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GadgetsInventory;
