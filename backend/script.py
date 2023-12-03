import sys
from roboflow import Roboflow

# Read the input file name from Node.js
file_name = sys.argv[1]

# Initialize Roboflow client
rf = Roboflow(api_key="7mviRdEfrnxMgQWHQIUY")

# Get the project and model
project = rf.workspace().project("object-detection-oittp")
model = project.version(1).model

# Infer on a local image
prediction = model.predict(file_name, confidence=40, overlap=30)


# Visualize the prediction
prediction.save("../frontend/src/components/prediction.jpg")
print(prediction.json())