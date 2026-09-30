# 🎨 Sketch → AI Image

An AI-powered Sketch-to-Image application that allows users to draw or upload a rough sketch, preprocess the sketch using OpenCV, and prepare the processed image for an AI image-generation pipeline.

---

## 📌 Project Overview

The goal of this project is to simplify image creation by allowing users to start with a rough hand-drawn sketch instead of creating a detailed image from scratch.

The application accepts a sketch through either:

- ✏️ An interactive drawing canvas
- 📤 An image upload

The sketch is then sent to a Python Flask backend where OpenCV performs image preprocessing before the resulting image is passed to the next stage of the AI pipeline.

### Architecture

```text
User
 │
 ├── Draw Sketch
 │
 └── Upload Sketch
        │
        ▼
   Input Handling
        │
        ▼
      Flask
        │
        ▼
     OpenCV
        │
        ├── Resize
        ├── Grayscale
        ├── Noise Reduction
        └── Adaptive Thresholding
        │
        ▼
 Processed 512×512 PNG
        │
        ├── Preview
        ├── Download
        │
        ▼
  AI Pipeline
        │
        ▼
 Sketch → Prompt → AI Image
