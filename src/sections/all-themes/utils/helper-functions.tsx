import { ChangeEvent } from "react";


export const handleImageChange64 = (key: string) => (event: ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];

  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader();

    reader.onload = () => {
      const base64 = reader.result?.toString().split(',')[1]; // Get the base64 data
      console.log('Base64:', base64); // Log the base64 data
      // setImagePreview(reader.result?.toString() || null);
      // handleThemeConfig(key, reader.result?.toString() || "")
    };

    reader.readAsDataURL(file); // Read the file as data URL
  } else {
    alert('Please select a valid image file.');
  }
};
