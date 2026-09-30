from flask import Flask, render_template, request, jsonify, send_from_directory
import os
from werkzeug.utils import secure_filename

from preprocessing import preprocess_sketch


app = Flask(__name__)

UPLOAD_FOLDER = "uploads"
PROCESSED_FOLDER = "processed"

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(PROCESSED_FOLDER, exist_ok=True)


ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg"}


def allowed_file(filename):
    return (
        "." in filename
        and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS
    )


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/processed/<filename>")
def processed_file(filename):
    return send_from_directory(PROCESSED_FOLDER, filename)



@app.route("/uploads/<filename>")
def uploaded_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)

@app.route("/process", methods=["POST"])
def process_image():

    if "image" not in request.files:
        return jsonify({
            "success": False,
            "message": "No image uploaded."
        }), 400

    file = request.files["image"]

    if file.filename == "":
        return jsonify({
            "success": False,
            "message": "No file selected."
        }), 400

    if not allowed_file(file.filename):
        return jsonify({
            "success": False,
            "message": "Only PNG, JPG and JPEG files are allowed."
        }), 400

    filename = secure_filename(file.filename)

    input_path = os.path.join(
        UPLOAD_FOLDER,
        filename
    )

    processed_filename = "processed_" + filename

    output_path = os.path.join(
        PROCESSED_FOLDER,
        processed_filename
    )

    file.save(input_path)

    preprocess_sketch(
        input_path,
        output_path
    )

    return jsonify({
    "success": True,
    "message": "Sketch processed successfully!",
    "original": "/" + input_path.replace("\\", "/"),
    "image": "/" + output_path.replace("\\", "/"),
    "filename": processed_filename,
    "width": 512,
    "height": 512,
    "format": "PNG",
    "ready_for_ai": True
})


if __name__ == "__main__":
    app.run(debug=True)