import React, { useState, useRef } from "react";
import { X } from "lucide-react";
import { db } from "@/firebase";
import { uploadImageToCloudinary } from "@/utils/cloudinary";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import toast from "react-hot-toast";

interface GadgetFormData {
  name: string;
  price: string;
  description: string;
  image: string; // will store URL after upload
  quantity: string;
  color: string;
}

interface AddGadgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGadgetAdded?: () => void;
}

const AddGadgetModal: React.FC<AddGadgetModalProps> = ({
  isOpen,
  onClose,
  onGadgetAdded,
}) => {
  const [gadgetForm, setGadgetForm] = useState<GadgetFormData>({
    name: "",
    price: "",
    description: "",
    image: "",
    quantity: "",
    color: "Black",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleAddGadget = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gadgetForm.name || !gadgetForm.price || !gadgetForm.quantity) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      let imageUrl = gadgetForm.image;
      // If a file is selected, upload to Cloudinary
      if (imageFile) {
        imageUrl = await uploadImageToCloudinary(imageFile);
      }
      const gadgetsCollection = collection(db, "gadgets");
      await addDoc(gadgetsCollection, {
        name: gadgetForm.name,
        price: `N${parseFloat(gadgetForm.price).toLocaleString()}`,
        description: gadgetForm.description,
        image: imageUrl || "/images/placeholder.png",
        quantity: parseInt(gadgetForm.quantity),
        color: gadgetForm.color,
        createdAt: serverTimestamp(),
      });

      toast.success("Gadget added to NovaTech!");
      onClose();
      setGadgetForm({
        name: "",
        price: "",
        description: "",
        image: "",
        quantity: "",
        color: "Black",
      });
      setImageFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      onGadgetAdded?.();
    } catch (error) {
      console.error("Error adding gadget:", error);
      toast.error("Failed to add gadget");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 z-50 grid grid-cols-2 p-4">
      <div className="bg-grey rounded-xl shadow-lg max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-light-black/25">
          <h2 className="text-xl font-bold text-gray-900">Add Gadget</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <form onSubmit={handleAddGadget} className="p-6 space-y-4">
          {/* Gadget Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gadget Name *
            </label>
            <input
              type="text"
              value={gadgetForm.name}
              onChange={(e) =>
                setGadgetForm({ ...gadgetForm, name: e.target.value })
              }
              placeholder="e.g., iPhone 13 Pro"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price (NGN) *
            </label>
            <input
              type="number"
              value={gadgetForm.price}
              onChange={(e) =>
                setGadgetForm({ ...gadgetForm, price: e.target.value })
              }
              placeholder="e.g., 1400000"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink"
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantity *
            </label>
            <input
              type="number"
              value={gadgetForm.quantity}
              onChange={(e) =>
                setGadgetForm({ ...gadgetForm, quantity: e.target.value })
              }
              placeholder="e.g., 5"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink"
            />
          </div>

          {/* Color */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Color
            </label>
            <input
              type="text"
              value={gadgetForm.color}
              onChange={(e) =>
                setGadgetForm({ ...gadgetForm, color: e.target.value })
              }
              placeholder="e.g., Black"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image Upload (or URL)
            </label>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={(e) => {
                const file = e.target.files?.[0];
                setImageFile(file || null);
                // If user clears file, keep text input value
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink mb-2"
            />
            <input
              type="text"
              value={gadgetForm.image}
              onChange={(e) =>
                setGadgetForm({ ...gadgetForm, image: e.target.value })
              }
              placeholder="https://... (optional if uploading)"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={gadgetForm.description}
              onChange={(e) =>
                setGadgetForm({
                  ...gadgetForm,
                  description: e.target.value,
                })
              }
              placeholder="Gadget details..."
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-pink text-white rounded-lg hover:bg-background transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Adding..." : "Add Gadget"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGadgetModal;
