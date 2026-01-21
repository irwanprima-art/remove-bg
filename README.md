# Background Remover Web App

A full-stack web application for removing image backgrounds using [rembg](https://github.com/danielgatis/rembg). This project consists of a Next.js frontend and a Flask backend.

## Features

- 🎨 **Modern UI**: built with Next.js and Shadcn UI.
- 🚀 **Real-time Preview**: Uses Blob URLs for instant "Before" image preview.
- 🖼️ **High-Quality Removal**: Powered by `rembg`.
- 📁 **Processed Image Serving**: Backend serves processed images directly from the `outputs` directory.

## Project Structure

```
remove-bg/
├── backend/            # Flask server
│   ├── app/            # Application logic
│   ├── outputs/        # Processed images
│   ├── uploads/        # Temporary uploads
│   └── main.py         # Entry point
└── frontend/           # Next.js client
    ├── app/            # Pages and layouts
    └── components/     # UI Components
```

## Requirements

- Python 3.10+
- Node.js 18+
- CUDA Toolkit 12.x (for GPU acceleration)

> [!IMPORTANT]
> **GPU Acceleration Note**
> The underlying `onnxruntime-gpu` library requires **CUDA Toolkit 12.x**. If you have **CUDA Toolkit 13.x** installed, the application will default to **CPU processing**, which may be slower.

## Troubleshooting

### CUDA Version Mismatch

If you encounter the following error, it is due to a mismatch between the installed CUDA version (files usually found in `C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v13.x`) and the version required by `onnxruntime` (v12.x).

```
[E:onnxruntime:Default, provider_bridge_ort.cc:2251 onnxruntime::TryGetProviderInfo_CUDA] ... onnxruntime::ProviderLibrary::Get [ONNXRuntimeError] : 1 : FAIL : Error loading "...\site-packages\onnxruntime\capi\onnxruntime_providers_cuda.dll" which depends on "cublasLt64_12.dll" which is missing. (Error 126: "The specified module could not be found.")
```

**Solution:**
Currently, the system successfully falls back to CPU processing. To enable GPU acceleration, you would need to install CUDA Toolkit 12.x.

## Installation & Setup

### Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv env
   # Windows
   .\env\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the server:
   ```bash
   python main.py
   ```
   The backend will start on `http://localhost:5111`.

### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:3111`.

## Usage

1. Open `http://localhost:3111` in your browser.
2. Upload an image in the "Single Image" tab.
3. The original image is shown instantly (via Blob).
4. Click "Remove Background" to process.
5. The result is fetched from the backend (`http://localhost:5111/outputs/...`) and displayed.

## Docker Deployment

### Quick Start with Docker Compose

1. Make sure Docker and Docker Compose are installed on your system.

2. Build and run the containers:

   ```bash
   docker-compose up --build
   ```

3. Access the application:
   - Frontend: `http://localhost:3111`
   - Backend API: `http://localhost:5111`

### Production Deployment

For production, you may want to configure the API URL:

```bash
# Build with custom API URL
docker-compose build --build-arg NEXT_PUBLIC_API_URL=https://api.yourdomain.com
docker-compose up -d
```

### Individual Container Builds

**Backend:**

```bash
cd backend
docker build -t bg-remover-backend .
docker run -p 5111:5000 bg-remover-backend
```

**Frontend:**

```bash
cd frontend
docker build -t bg-remover-frontend --build-arg NEXT_PUBLIC_API_URL=http://localhost:5111 .
docker run -p 3111:3000 bg-remover-frontend
```

> [!NOTE]
> The Docker containers run with CPU processing by default. For GPU acceleration with NVIDIA CUDA, you'll need to use `nvidia-docker` and modify the backend Dockerfile to use a CUDA base image.
