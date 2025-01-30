from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib

# Load data and preprocess
file_path = 'bhai.csv.xlsx'
data = pd.read_excel(file_path)

# Encode the categorical 'Fav_Sub' feature
label_encoder = LabelEncoder()
data['Fav_Sub'] = label_encoder.fit_transform(data['Fav_Sub'])

# Define features and target variable
X = data.drop(columns=['Stream', 'Total_Marks'])
y = data['Stream']

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train a RandomForestClassifier
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Save the model and label encoder
joblib.dump(model, 'model.pkl')
joblib.dump(label_encoder, 'label_encoder.pkl')

# Load the model and label encoder
model = joblib.load('model.pkl')
label_encoder = joblib.load('label_encoder.pkl')

# Calculate the accuracy of the model
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f'Model accuracy: {accuracy:.2f}')

# Initialize Flask application
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Define a route for prediction
@app.route('/predict', methods=['POST'])
def predict():
    # Get JSON data from request
    data = request.json
    try:
        # Extract data from the JSON
        new_data = [
            data['Marks1'],
            data['Marks2'],
            data['Marks3'],
            data['Marks4'],
            data['Fav_Sub']
        ]

        # Transform the categorical feature
        new_data[4] = label_encoder.transform([new_data[4]])[0]

        # Convert to numpy array and reshape for prediction
        new_data_array = np.array(new_data).reshape(1, -1)

        # Make prediction
        probabilities = model.predict_proba(new_data_array)[0]
        probability_dict = dict(zip(model.classes_, probabilities))
        
        # Round and format probabilities
        formatted_probabilities = {k: round(v * 100, 2) for k, v in probability_dict.items()}

        # Combine probabilities for duplicated stream names
        combined_probabilities = {}
        for stream, prob in formatted_probabilities.items():
            clean_stream = stream.strip()
            if clean_stream in combined_probabilities:
                combined_probabilities[clean_stream] += prob
            else:
                combined_probabilities[clean_stream] = prob

        # Extract the maximum probability and its corresponding stream
        max_stream = max(combined_probabilities, key=combined_probabilities.get)
        max_probability = combined_probabilities[max_stream]

        # Return the prediction as JSON
        return jsonify({
            'Predicted Stream': max_stream,
            'Probability': int(max_probability),
            'All Probabilities': combined_probabilities
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# Run the Flask application
if __name__ == '__main__':
    app.run(debug=True)
