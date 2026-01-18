# app.py
from flask import Flask, jsonify
from flask_cors import CORS
from config import MAX_FILE_SIZE, setup_folders
from app.routes.image import image_bp
from app.routes.general import general_bp

app = Flask(__name__)
CORS(app)
app.config['MAX_CONTENT_LENGTH'] = MAX_FILE_SIZE
setup_folders()

# Registrasi Blueprint dengan prefix URL jika diinginkan
app.register_blueprint(general_bp)
app.register_blueprint(image_bp, url_prefix='/api')

@app.errorhandler(413)
def too_large(e):
    return jsonify({"error": "File too large"}), 413

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
