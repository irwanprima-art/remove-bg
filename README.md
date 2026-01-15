# Background Remover

A GPU-accelerated background removal tool using [InSPyReNet](https://github.com/plemeri/InSPyReNet) via the `transparent-background` package.

## Features

- 🚀 GPU acceleration with CUDA
- 🖼️ Batch processing of images
- 🔍 High-quality background removal using InSPyReNet model
- 📁 Outputs PNG with transparent alpha channel

## Requirements

- Python 3.10+
- NVIDIA GPU with CUDA support

## Installation

1. **Create virtual environment**
   ```bash
   python -m venv env
   ```

2. **Activate environment**
   ```bash
   # Windows
   .\env\Scripts\activate
   
   # Linux/Mac
   source env/bin/activate
   ```

3. **Install PyTorch with CUDA**
   ```bash
   pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu124
   ```

4. **Install transparent-background**
   ```bash
   pip install transparent-background
   ```

5. **Install Jupyter (optional)**
   ```bash
   pip install jupyter
   ```

## Usage

1. Place your images in the `images/` folder
2. Run the notebook `main.ipynb`
3. Processed images with transparent backgrounds will be saved to `remove-bg/`

### Quick Start

```python
from transparent_background import Remover
from PIL import Image

remover = Remover()
img = Image.open("your_image.jpg").convert("RGB")
result = remover.process(img, type='rgba')
result.save("output.png")
```

## Project Structure

```
remove-bg/
├── images/           # Input images
├── remove-bg/        # Output images (transparent PNG)
├── main.ipynb        # Main processing notebook
└── README.md
```

## Performance

| GPU | Images | Time |
|-----|--------|------|
| RTX 4050 Laptop | 28 images | ~27 seconds |

## License

MIT
