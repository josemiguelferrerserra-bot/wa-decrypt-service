const express = require("express");
const multer = require("multer");
const fs = require("fs");

const app = express();
const upload = multer({ dest: "uploads/" });

app.post("/decrypt", upload.single("file"), async (req, res) => {
  try {
    const inputPath = req.file.path;
    const outputPath = `decrypted-${Date.now()}.ogg`;

    // ⚠️ Aquí deberías implementar la lógica de desencriptado real
    // Por ahora simulamos "desencriptar" copiando el archivo
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
