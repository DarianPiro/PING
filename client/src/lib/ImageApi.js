import axios from 'axios';
import { imageToDB } from './ApiService';
import JSZip from 'jszip';

export const uploadImageToCloudinary = async (dataUrl, username) => {
  const formData = new FormData();
  const blob = await (await fetch(dataUrl)).blob();
  formData.append('file', blob);

  const headers = {
    'Content-Type': 'multipart/form-data',
  };

  const data = {
    upload_preset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET,
    api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
    api_secret: process.env.REACT_APP_CLOUDINARY_API_SECRET,
    folder: 'ping',
  };

  try {
    const response = await axios.post(process.env.REACT_APP_CLOUDINARY_URL, formData, {
      headers,
      params: data,
    });
    await imageToDB(response.data.secure_url, username);
    return response.data.secure_url;
  } catch (error) {
    console.error(error);
  }
};

export const createZip = async (files, username) => {
  const downloadedFiles = await Promise.all(
    files.map(async (file, index) => {
      const response = await fetch(file);
      const blob = await response.blob();
      return { name: (`${username}-${index}.png`), blob };
    })
  );

  const zip = new JSZip();
  const folder = zip.folder(username);
  downloadedFiles.forEach((file) => {
    folder.file(file.name, file.blob);
  });
  const content = await zip.generateAsync({ type: 'blob' });
  return content;
};
