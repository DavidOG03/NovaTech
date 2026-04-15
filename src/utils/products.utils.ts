import { Gadget } from "@/types/gadgets.types";

export const getSelectedCategoryNames = (
  activeCategories: number[],
  categories: { text: string }[],
): string[] =>
  activeCategories
    .map((index) => categories[index]?.text)
    .filter((category): category is string => Boolean(category));

export const getProductCategory = (item: Gadget): string => {
  const content = `${item.name} ${item.description}`.toLowerCase();

  if (
    content.includes("iphone") ||
    content.includes("phone") ||
    content.includes("android")
  ) {
    return "Phones";
  }

  if (
    content.includes("laptop") ||
    content.includes("macbook") ||
    content.includes("notebook")
  ) {
    return "Laptops";
  }

  if (content.includes("tablet") || content.includes("ipad")) {
    return "Tablets";
  }

  if (
    content.includes("ps5") ||
    content.includes("playstation") ||
    content.includes("xbox") ||
    content.includes("console")
  ) {
    return "Consoles";
  }

  return "Accessories";
};

export const filterProducts = (
  items: Gadget[],
  selectedCategoryNames: string[],
  searchQuery: string,
): Gadget[] =>
  items.filter((item) => {
    const byCategory =
      selectedCategoryNames.length === 0 ||
      selectedCategoryNames.includes(getProductCategory(item));
    const bySearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return byCategory && bySearch;
  });

export async function uploadGadgetImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "upload_preset",
    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
  );

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
    { method: "POST", body: formData },
  );

  const data = await res.json();
  return data.secure_url; // save this to Firestore
}
