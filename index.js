const express = require("express");
const multer = require("multer");
const fs = require("fs");

const app = express();
const upload = multer({ dest: "uploads/" });

// Ruta de salud para Render
app.get("/ping", (req, res) => {
  res.status(200).send("pong");
});

app.post("/decrypt", upload.single("file"), async (req, res) => {
  try {
    const inputPath = req.file.path;
    const outputPath = `decrypted-${Date.now()}.ogg`;

    // ⚠️ Aquí deberías implementar la lógica de desencriptado real
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT}`));

