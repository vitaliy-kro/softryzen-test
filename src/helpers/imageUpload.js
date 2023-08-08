import axios from "axios";

export const imageUpload = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "upload_preset",
    process.env.REACT_APP_CLOUDINARY_PRESET_NAME,
  );
  try {
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/upload`,
      formData,
    );
    return res.data;
  } catch (e) {
    console.log(e);
    console.log("Something get wrong, try again later");
  }
};
