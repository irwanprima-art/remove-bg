# routes/general_routes.py
from flask import Blueprint, jsonify
from app.service import gpu_info

general_bp = Blueprint('general_bp', __name__)

@general_bp.route("/", methods=["GET"])
def index():
    return jsonify({"service": "Background Remover API", "version": "1.0.0"})

@general_bp.route("/health", methods=["GET"])
def health_check():
    return jsonify({"status": "ok", "gpu": gpu_info()})
