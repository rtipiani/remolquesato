import fs from "fs";
import path from "path";
import sharp from "sharp";

const inputDir = path.join(process.cwd(), "public/images");

const convertImagesToAvif = (dir) => {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // Recursividad en subcarpetas
      convertImagesToAvif(fullPath);
    } else {
      const extname = path.extname(file).toLowerCase();
      if ([".jpg", ".jpeg", ".png", ".webp"].includes(extname)) {
        const outputFileName = path.basename(file, extname) + ".avif";
        const outputPath = path.join(dir, outputFileName);

        sharp(fullPath)
          .avif({ quality: 70 }) // calidad ajustable (60-80 recomendado)
          .toFile(outputPath, (err) => {
            if (err) {
              console.error("❌ Error al convertir la imagen:", err);
            } else {
              console.log(`✅ Imagen convertida a AVIF: ${outputPath}`);
              // Esperar un poco antes de borrar el original (Windows fix)
              setTimeout(() => {
                try {
                  fs.unlinkSync(fullPath);
                  console.log(`🗑️ Original eliminado: ${fullPath}`);
                } catch (unlinkErr) {
                  console.warn(`⚠️ No se pudo eliminar ${fullPath}: ${unlinkErr.message}`);
                }
              }, 200);
            }
          });
      }
    }
  });
};

// Inicia desde public/images
convertImagesToAvif(inputDir);
