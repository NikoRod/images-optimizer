# Image Optimizer

This project automatically optimizes images by resizing and compressing them using the Tinify API. It's designed to be easy to use and efficient, processing multiple images concurrently with a limit on the number of active tasks running in parallel.

## Description

This image optimizer performs two main steps on images:

1. **Resizes** the images to a width of 1024 pixels using the `sharp` library.
2. **Compresses** the images using the Tinify API, reducing their file size without losing quality.

The process is fully automated for a directory of images, and the optimized images are saved in a separate folder.

## Requirements

Before using this project, make sure you have the following:

- Node.js installed (version 12 or higher).
- A Tinify API key (you can get it at [Tinify API](https://tinify.com/developers)).

## Installation

1. Clone this repository to your local machine:

    ```bash
    git clone https://github.com/your_username/image-optimizer.git
    ```

2. Navigate to the project directory:

    ```bash
    cd images-optimizer
    ```

3. Install the necessary dependencies:

    ```bash
    npm install
    ```

4. Add your Tinify API key to the `index.js` file by replacing the value of the `API_KEY` variable:

    ```js
    const API_KEY = "your_api_key_here";
    ```

## Usage

1. Place the images you want to optimize in a directory, for example, in a folder called `images`.

2. Run the script with Node.js:

    ```bash
    node optimizer.js
    ```

3. The script will process all images in the `images` folder. Each image will be resized to a width of 1024px and then compressed using the Tinify API. The optimized images will be saved in a subfolder called `compressed`.

4. During the process, you will see console messages indicating the progress, including processed files and the final result.

## File Structure

The project has the following structure:

  ``` bash
  ├── images/ # Directory where you'll place the images to optimize
      └──  compressed/ # Directory where optimized images will be saved
  ├── optimizer.js # Main script
  ├── package.json # File with dependencies and configuration
  └── README.md # This file
  ```

## Customization

- **Parallel task limit**: You can change the maximum number of parallel tasks by modifying the value of `pLimit(5)` in the `optimizer.js` file. This value controls how many images will be processed at the same time.
  
- **Resized image size**: The resized image width is set to `1024px` by default. You can change this in the `optimizer.js` file inside the `resizeAndCompress` function.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
