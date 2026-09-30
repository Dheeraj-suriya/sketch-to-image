import cv2


def preprocess_sketch(input_path, output_path):
    # 1. Read the uploaded image
    image = cv2.imread(input_path)

    if image is None:
        raise ValueError("Unable to read the uploaded image.")

    # 2. Resize to a standard size
    image = cv2.resize(image, (512, 512))

    # 3. Convert image to grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # 4. Reduce small amounts of noise
    blurred = cv2.GaussianBlur(gray, (3, 3), 0)

    # 5. Convert into a clean black-and-white sketch
    sketch = cv2.adaptiveThreshold(
        blurred,
        255,
        cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
        cv2.THRESH_BINARY,
        11,
        2
    )

    # 6. Save processed sketch
    success = cv2.imwrite(output_path, sketch)

    if not success:
        raise ValueError("Unable to save the processed image.")

    return output_path