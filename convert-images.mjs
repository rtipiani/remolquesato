import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const inputDir = path.join(process.cwd(), 'public/images'); // Directorio de entrada
const outputDir = inputDir; // Usamos el mismo directorio para sobrescribir las imágenes originales

// Función para convertir imágenes a WebP
const convertImagesToWebP = (inputDir, outputDir) => {
  const files = fs.readdirSync(inputDir); // Leemos todos los archivos en el directorio

  files.forEach((file) => {
    const extname = path.extname(file).toLowerCase(); // Obtenemos la extensión del archivo
    if (extname === '.jpg' || extname === '.png') {   // Si el archivo es JPG o PNG
      const inputPath = path.join(inputDir, file);   // Ruta completa del archivo de entrada
      const outputFileName = path.basename(file, extname) + '.webp'; // Nombre del archivo de salida en formato WebP
      const outputPath = path.join(outputDir, outputFileName); // Ruta completa del archivo de salida

      // Usamos sharp para convertir la imagen
      sharp(inputPath)
        .webp({ quality: 80 }) // Convertimos a WebP con una calidad de 80 (ajustable)
        .toFile(outputPath, (err, info) => {
          if (err) {
            console.error('Error al convertir la imagen:', err);
          } else {
            console.log(`Imagen convertida a WebP: ${outputPath}`);
            // Elimina la imagen original (si deseas reemplazarla)
            fs.unlinkSync(inputPath);
          }
        });
    }
  });
};

// Ejecutamos la conversión
convertImagesToWebP(inputDir, outputDir);