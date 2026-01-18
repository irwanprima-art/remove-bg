import os
import argparse
import sys

# Ensure backend directory is in python path
current_dir = os.path.dirname(os.path.abspath(__file__))
if current_dir not in sys.path:
    sys.path.append(current_dir)

from app.service import remove_background
from config import setup_folders, OUTPUT_DIR

def process_image(input_path, output_dir):
    try:
        if not os.path.exists(output_dir):
            os.makedirs(output_dir)
            
        print(f"Processing: {input_path}")
        output_file = remove_background(input_path, output_dir)
        print(f"Saved to: {output_file}")
        return True
    except Exception as e:
        print(f"Error processing {input_path}: {e}")
        return False

def main():
    parser = argparse.ArgumentParser(description="Background Removal CLI")
    parser.add_argument("--input", required=True, help="Path to input image file or directory")
    parser.add_argument("--output", default=OUTPUT_DIR, help="Path to output directory")
    
    args = parser.parse_args()
    
    # Run setup folders
    setup_folders()
    
    input_path = args.input
    output_dir = args.output
    
    if os.path.isfile(input_path):
        process_image(input_path, output_dir)
    elif os.path.isdir(input_path):
        print(f"Processing directory: {input_path}")
        success_count = 0
        total_count = 0
        
        valid_extensions = {'.png', '.jpg', '.jpeg', '.webp', '.bmp'}
        
        for filename in os.listdir(input_path):
            ext = os.path.splitext(filename)[1].lower()
            if ext in valid_extensions:
                file_path = os.path.join(input_path, filename)
                total_count += 1
                if process_image(file_path, output_dir):
                    success_count += 1
        
        print(f"Finished. Successfully processed {success_count}/{total_count} images.")
    else:
        print(f"Error: Invalid input path: {input_path}")

if __name__ == "__main__":
    main()
