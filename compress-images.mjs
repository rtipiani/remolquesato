import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const inputDir = path.join(process.cwd(), 'public/images');  // Carpeta donde se encuentran las imágenes
const outputDir = path.join(process.cwd(), 'public/optimized_images'); // Carpeta donde se guardarán las imágenes optimizadas

// Asegurarse de que la carpeta de salida exista
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

const compressAvifImages = async () => {
  try {
    const files = fs.readdirSync(inputDir);

    // Recorrer todas las imágenes
    for (const file of files) {
      const filePath = path.join(inputDir, file);
      const fileExt = path.extname(file).toLowerCase();

      // Comprobar si la imagen es del tipo .avif
      if (fileExt === '.avif') {
        const optimizedPath = path.join(outputDir, file);

        // Comprimir la imagen AVIF manteniendo el formato
        await sharp(filePath)
          .avif({ quality: 50 }) // Comprimir a AVIF con calidad 50
          .toFile(optimizedPath, (err, info) => {
            if (err) {
              console.error('Error al comprimir la imagen:', err);
            } else {
              console.log(`Imagen comprimida: ${optimizedPath}`);
            }
          });
      }
    }
  } catch (err) {
    console.error('Error al comprimir las imágenes:', err);
  }
};

compressAvifImages();
