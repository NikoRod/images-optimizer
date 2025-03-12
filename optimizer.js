const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const sharp = require("sharp");

let pLimit;
(async () => {
  pLimit = (await import("p-limit")).default;

  const API_KEY = "your_api_key";
  const limit = pLimit(5);

  async function resizeAndCompress(filePath) {
  
    const resizedImagePath = path.join(path.dirname(filePath), "compressed", path.basename(filePath));

    await sharp(filePath)
      .resize(1024)
      .toFile(resizedImagePath);

    console.log(`The image was resized and saved in: ${resizedImagePath}`);

    const file = fs.readFileSync(resizedImagePath);

    try {
      const response = await axios.post("https://api.tinify.com/shrink", file, {
        headers: {
          Authorization: `Basic ${Buffer.from("api:" + API_KEY).toString("base64")}`,
          "Content-Type": "application/octet-stream",
        },
      });

      const compressedImageUrl = response.data.output.url;
      const compressedImageResponse = await axios.get(compressedImageUrl, {
        responseType: "arraybuffer",
      });

      const compressedFilePath = path.join(
        path.dirname(resizedImagePath),
        path.basename(resizedImagePath)
      );

      fs.writeFileSync(compressedFilePath, compressedImageResponse.data);
      console.log(`The image was compressed and saved in: ${compressedFilePath}`);
    } catch (error) {
      console.error("\x1b[31mError compressing images:\x1b[0m", error.response ? error.response.data : error.message);
    }
  }

  async function processDirectory(directory) {
    const files = await fs.readdir(directory);
    const tasks = [];

    for (const file of files) {
      const filePath = path.join(directory, file);

      if (fs.statSync(filePath).isFile() && /\.(jpg|jpeg|png)$/i.test(file)) {
        console.log(`Processing image: ${file}`);
        tasks.push(limit(() => resizeAndCompress(filePath)));
      }
    }

    await Promise.all(tasks);

    console.log("\x1b[32mOptimization finished\x1b[0m");
  }

  const imagesDirecrtory = "./images";
  processDirectory(imagesDirecrtory);
})();
