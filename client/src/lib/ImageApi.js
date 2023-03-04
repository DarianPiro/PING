import axios from 'axios';
import { imageToDB } from './ApiService';
import JSZip from 'jszip';

export const uploadImageToCloudinary = async (dataUrl, username) => {
  const formData = new FormData();
  const blob = await (await fetch(dataUrl)).blob();
  formData.append('file', blob);

  const cloudName = 'dc3ejnypr';
  const uploadPreset = 'gt3o75k1';
  const apiKey = '717653153467268';
  const apiSecret = 'rU2cuoBsYXF4Zk03PxMMdYy9tmY';

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

  const headers = {
    'Content-Type': 'multipart/form-data',
  };

  const data = {
    upload_preset: uploadPreset,
    api_key: apiKey,
    api_secret: apiSecret,
    folder: 'ping',
  };

  try {
    const response = await axios.post(url, formData, {
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
