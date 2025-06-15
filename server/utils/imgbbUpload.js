import axios from 'axios';
import qs from 'qs'; 

export async function uploadImageToImgBB(imageBase64) {
  const apiKey = process.env.IMGBB_API_KEY;
  const url = `https://api.imgbb.com/1/upload?key=${apiKey}`;

  const data = qs.stringify({ image: imageBase64 });

  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.data.data.url;
  } catch (error) {
    console.error("ImgBB upload error:", error.response?.data || error.message);
    throw new Error("Image upload failed");
  }
}
