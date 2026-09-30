# 🎨 Sketch → AI Image

An AI-powered Sketch-to-Image application that allows users to draw or upload a rough sketch, preprocess the sketch using OpenCV, and prepare the processed image for an AI image-generation pipeline.

---

## 📌 Overview

The goal of this project is to make image creation easier by allowing users to begin with a simple hand-drawn sketch instead of manually creating a detailed image.

The application provides an interactive interface where users can:

- ✏️ Draw a sketch directly on a canvas
- 📤 Upload an existing sketch
- 🔍 Validate the image input
- 🧠 Preprocess the sketch using OpenCV
- 🖼️ Compare the original and processed sketches
- ⬇️ Download the processed sketch
- 🚀 Prepare the processed sketch for the AI pipeline

The current implementation focuses on the **Sketch Input & Image Preprocessing module** of the complete Sketch-to-Image system.

---

# 🎯 Project Objectives

The complete project aims to:

1. Accept a hand-drawn or uploaded sketch.
2. Process and understand the visual structure of the sketch.
3. Convert the sketch into an effective AI prompt.
4. Generate an image using an AI image-generation model.
5. Provide a simple and user-friendly interface.
6. Allow users to preview and save the generated result.

This repository implements the **input handling and preprocessing stage** of the overall system.

---

# ✨ Features

## ✏️ 1. Sketch Drawing

Users can draw directly on an interactive HTML5 canvas.

Features include:

- Mouse-based drawing
- Responsive drawing canvas
- Black brush
- Clear canvas functionality
- Smooth drawing
- Accurate mouse-to-canvas coordinate mapping

---

## 📤 2. Sketch Upload

Users can upload an existing sketch image.

Supported formats:

```text
PNG
JPG
JPEG
