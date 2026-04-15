// Utility to upload an image file to Cloudinary and return the URL
// Usage: await uploadImageToCloudinary(file)

export async function uploadImageToCloudinary(file: File): Promise<string> {
  const url = "https://api.cloudinary.com/v1_1/<your_cloud_name>/image/upload";
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "<your_upload_preset>"); // Set your unsigned upload preset

  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Image upload failed");
  }
  const data = await response.json();
  return data.secure_url;
}
