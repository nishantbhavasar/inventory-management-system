import axios from "axios";

export async function uploadImageToImgDD(key: string, imageFile: any) {
  try {
    const base64Image = imageFile.toString('base64');
    const form = new FormData();
    form.append('image', base64Image);

    const response = await axios.postForm(`https://api.imgbb.com/1/upload?key=${process.env.IMAGE_UPLOAD_ACCESS_TOKEN}`,form);
    
    if (response.data) {
      return {
        Location: response?.data?.data?.url,
        success: true,
      };
    }
  } catch (error) {
    return {
      success:false,
      Location:null,
    }
  }
}