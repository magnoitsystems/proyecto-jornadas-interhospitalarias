// test-cloudinary.js versión type script

const { readFile } = require('fs/promises');
const path = require('path');
require('dotenv').config(); // carga .env.local
const cloudinary = require('./src/libs/cloudinary');


const testUpload = async () => {
  try {
    const filePath = path.resolve('./public/backgrounds/home.png'); // cambiá el nombre si es otro archivo
    const fileBuffer = await readFile(filePath);

    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: 'pruebas',
          resource_type: 'image',
          public_id: `test-${Date.now()}`,
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      stream.end(fileBuffer);
    });

    console.log('✅ Subida exitosa:', uploadResult.secure_url);
  } catch (error) {
    console.error('❌ Error al subir a Cloudinary:', error);
  }
};

testUpload();



