import app from "./app.js";
import cloudinary from "cloudinary";



cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
app.post('/predict', async (req, res) => {
  try {
    const data = req.body;

    // Make a POST request to the Flask API
    const response = await axios.post('http://localhost:5001/predict', data);

    // Send the response back to the client
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error making prediction');
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening at port ${process.env.PORT}`);
});
