# routes/image_routes.py
import os
from flask import Blueprint, request, jsonify, send_file
from werkzeug.utils import secure_filename
from config import UPLOAD_DIR, OUTPUT_DIR
from app.utils import allowed_file
from app.service import remove_background

# Definisikan Blueprint
image_bp = Blueprint('image_bp', __name__)

# Base URL for output files - configurable via environment variable
BASE_URL = os.environ.get('BASE_URL', 'http://localhost:5111')

@image_bp.route("/remove-bg", methods=["POST"])
def remove_bg():
    if "images" not in request.files:
        return jsonify({"error": "No images provided"}), 400
    
    files = request.files.getlist("images")
    results = []
    
    for file in files:
        if file.filename == '' or not allowed_file(file.filename):
            continue

        try:
            filename = secure_filename(file.filename)
            input_path = os.path.join(UPLOAD_DIR, filename)
            file.save(input_path)
            
            output_path = remove_background(input_path, OUTPUT_DIR)
            
            # Construct URL using configurable BASE_URL
            results.append({
                "original": file.filename, # Only filename, frontend uses blob
                "processed": f"{BASE_URL}/outputs/{os.path.basename(output_path)}",
                "filename": os.path.basename(output_path)
            })
        except Exception as e:
            results.append({
                "original": file.filename,
                "error": str(e)
            })

    return jsonify({"results": results})

