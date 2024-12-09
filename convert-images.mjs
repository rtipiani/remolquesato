import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const inputDir = path.join(process.cwd(), 'public/images');
const outputDir = inputDir;

const convertImagesToWebP = (inputDir, outputDir) => {
  const files = fs.readdirSync(inputDir);

  files.forEach((file) => {
    const extname = path.extname(file).toLowerCase();
    if (extname === '.jpg' || extname === '.png') {
      const inputPath = path.join(inputDir, file);
      const outputFileName = path.basename(file, extname) + '.webp';
      const outputPath = path.join(outputDir, outputFileName);

      sharp(inputPath)
        .webp({ quality: 80 })
        .toFile(outputPath, (err, info) => {
          if (err) {
            console.error('Error al convertir la imagen:', err);
          } else {
            console.log(`Imagen convertida a WebP: ${outputPath}`);
            fs.unlinkSync(inputPath);
          }
        });
    }
  });
};

convertImagesToWebP(inputDir, outputDir);