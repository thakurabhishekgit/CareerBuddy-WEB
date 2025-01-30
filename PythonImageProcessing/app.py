from flask import Flask, request, jsonify
from flask_cors import CORS  
import requests
import base64
import os
import subprocess

app = Flask(__name__)
CORS(app)

# Use environment variables for sensitive information
API_KEY = '87ebb7a3f88841c7a0227b4deb9d039f'
API_URL = 'https://api.clarifai.com/v2/models/general-image-recognition/outputs'

def encode_image_to_base64(image_path):
    """Encode an image file to base64."""
    with open(image_path, 'rb') as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')

def predict_image(base64_image):
    """Send an image to Clarifai for prediction using HTTP API."""
    headers = {
        'Authorization': f'Key {API_KEY}',
        'Content-Type': 'application/json'
    }
    
    data = {
        "inputs": [
            {
                "data": {
                    "image": {
                        "base64": base64_image
                    }
                }
            }
        ]
    }
    
    try:
        response = requests.post(API_URL, headers=headers, json=data)
        response.raise_for_status()

        result = response.json()

        # Handle cases where 'concepts' might not be available
        if 'outputs' in result and len(result['outputs']) > 0:
            first_concept = result['outputs'][0]['data']['concepts'][0]
            concept_name = first_concept['name']
            confidence = round(first_concept['value'], 2)
            return {"concept": concept_name, "confidence": confidence}
        else:
            return {"error": "No concepts found in the response."}

    except requests.exceptions.RequestException as e:
        return {"error": str(e)}

def get_description_from_gemini(concept_name):
    """Call the Node.js script to get a description from Gemini API."""
    try:
        result = subprocess.run(['node', 'gemini-api.js', concept_name], capture_output=True, text=True)
        
        if result.returncode == 0:
            return result.stdout.strip()
        else:
            return "Failed to fetch description from Gemini API."
    except Exception as e:
        return f"Error: {str(e)}"

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({"error": "No image provided"}), 400

    image = request.files['image']
    temp_image_path = "temp_image.jpg"
    image.save(temp_image_path)

    base64_image = encode_image_to_base64(temp_image_path)

    prediction = predict_image(base64_image)

    if 'error' in prediction:
        os.remove(temp_image_path)
        return jsonify(prediction)

    concept_name = prediction['concept']
    description = get_description_from_gemini(concept_name)

    os.remove(temp_image_path)

    return jsonify({
        "concept": concept_name,
        "confidence": prediction['confidence'],
        "description": description
    })

if __name__ == '__main__':
    app.run(port=5001, debug=True)
