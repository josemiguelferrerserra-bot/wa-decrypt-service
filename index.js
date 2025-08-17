const express = require("express");
const multer = require("multer");
const fs = require("fs");

const app = express();
const upload = multer({ dest: "uploads/" });

/**
 * Endpoint raíz
 */
app.get("/", (req, res) => {
  res.send("🚀 Microservicio WA Decrypt en funcionamiento");
});

/**
 * Endpoint de salud (/ping)
 */
app.get("/ping", (req, res) => {
  res.send("pong 🏓 - el microservicio está vivo!");
});

/**
 * Endpoint para desencriptar archivos
 */
app.post("/decrypt", upload.single("file"), async (req, res) => {
  try {
    const inputPath = req.file.path;
    const outputPath = `decrypted-${Date.now()}.ogg`;

    // ⚠️ Aquí deberías implementar la lógica real de desencriptado
    // Por ahora solo copiamos el archivo como simulación
    fs.copyFileSync(inputPath, outputPath);

    res.download(outputPath, () => {
      fs.unlinkSync(inputPath);
      fs.unlinkSync(outputPath);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al desencriptar archivo" });
  }
});

/**
 * Levantar servidor
 */
const PORT = process.env.PORT || 10000; // usa el puerto que Render te asigna
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
