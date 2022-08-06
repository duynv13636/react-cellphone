import axios from "axios";

export const upload = async (file: any) => {
  const CLOUNDINARY_URL =
    "https://api.cloudinary.com/v1_1/fpolyduy/image/upload";
  const CLOUNDINARY_PRESET = "ck8bz8wq";
  console.log(file);

  const formData = new FormData();
  formData.append("file", file.originFileObj);
  formData.append("upload_preset", CLOUNDINARY_PRESET);

  const { data } = await axios.post(CLOUNDINARY_URL, formData, {
    headers: { "Content-Type": "application/form-data" },
  });
  console.log(data);

  return data.url;
};
