import React from "react";
import { Star } from "lucide-react";

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

interface TopProductsProps {
  products: Gadget[];
}

const TopProducts: React.FC<TopProductsProps> = ({ products }) => {
  return (
    <div className="bg-grey rounded-xl shadow-sm border border-light-black/25 p-6">
      <h2 className="text-lg font-bold text-light-black mb-6">Top Products</h2>
      <div className="space-y-4">
        {products.length === 0 ? (
          <div className="text-center py-8">
            <Star className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium text-light-black">
              No products found
            </p>
            <p className="text-sm text-light-black">
              Top products will appear here once you have sales data.
            </p>
          </div>
        ) : (
          products.slice(0, 5).map((product, index) => (
            <div key={product.id} className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-3xl flex items-center justify-center text-2xl">
                {product.image}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-light-black truncate">
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
          ))
        )}
      </div>
    </div>
  );
};

export default TopProducts;
