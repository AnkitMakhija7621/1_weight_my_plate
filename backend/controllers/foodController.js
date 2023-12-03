const Food = require('../models/foodModel')
const mongoose = require('mongoose')
const axios = require("axios");
const fs = require("fs");
const { exec } = require('child_process');

const foodsar = [
  { name: 'samosa', calories: 1, protein: 0.1, carbohydrates: 0.2, density: 0.75 },
  { name: 'dhokla', calories: 1.6, protein: 0.3, carbohydrates: 0.4, density: 0.6 },
  { name: 'grapes', calories: 0.85, protein: 0.02, carbohydrates: 0.2, density: 0.92 },
  { name: 'roti', calories: 2.5, protein: 0.1, carbohydrates: 0.5, density: 0.85 },
  { name: 'cucumber', calories: 0.15, protein: 0.01, carbohydrates: 0.03, density: 0.95 },
  { name: 'cabbage', calories: 0.3, protein: 0.02, carbohydrates: 0.05, density: 0.65 },
  { name: 'jalebi', calories: 2.5, protein: 0.1, carbohydrates: 0.6, density: 1.1 },
  { name: 'kiwi', calories: 0.65, protein: 0.1, carbohydrates: 0.15, density: 0.95 },
  { name: 'sweetcorn', calories: 0.45, protein: 0.05, carbohydrates: 0.1, density: 0.7 },
  { name: 'tomato', calories: 0.25, protein: 0.02, carbohydrates: 0.05, density: 1.0 },
  { name: 'pineapple', calories: 0.55, protein: 0.1, carbohydrates: 0.12, density: 0.8 },
  { name: 'watermelon', calories: 0.25, protein: 0.01, carbohydrates: 0.06, density: 0.9 },
];
// async function predictClass(image) {
    
    
  // console.log("in predictClass\n"+"image: "+image+"\n")
  // try {
    // const image = fs.readFileSync(image, {
    //   encoding: "base64"
    //  });
    // const response = await axios({
    //   method: "POST",
    //   url: "https://detect.roboflow.com/object-detection-oittp/1",
    //   params: {
    //     api_key: "7mviRdEfrnxMgQWHQIUY"
    //   },
    //   data: image,
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded"
    //   }
    // });



//     return response.data.predictions[0].class;
//   } catch (error) {
//     console.log("error with prediction\n")
//     console.log(error.message);
//     return null;
//   }
// }

// async function runPrediction(image) {
//   cl = await predictClass(image);
//   // cl=predictClass;
//   console.log("cl-")
//   console.log(cl);
// }








// get all foods
const getFoods = async (req, res) => {
  const user_id = req.user._id

  const foods = await Food.find({user_id}).sort({createdAt: -1})

  res.status(200).json(foods)
}

// get a single food
const getFood = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such food'})
  }

  const food = await Food.findById(id)

  if (!food) {
    return res.status(404).json({error: 'No such food'})
  }
  
  res.status(200).json(food)
}


//create food 2
// const createFood = async (req, res) => {
  
//     // res.status(200).json(cl)
//     const pythonFilePath = 'script.py';
    
//   try {


//     // predict functionality and all
//     const imagepath = req.body.image;
//     var jsonObject = "initial";
//     console.log(imagepath,pythonFilePath);
//     await exec(`python3 ${pythonFilePath} ${imagepath}`, async (error, stdout, stderr) => {
//       // Process the output from the Python script
//       console.log("std out-"+ stdout) ;
//       var output = stdout.trim();
//       var output2 = output.split("\n");
//       console.log ("op-")
//       console.log(output);
//       jsonString = output2[output2.length - 1];
//       // jsonObject = JSON.parse(jsonString.replace(/'/g, '"'));
//       console.log(jsonObject.predictions[0].class);
//       // console.log(`Output from Python script: ${output2[2]}`);
//       console.log(jsonObject);
    
//       var title=jsonObject.predictions[0].class ;
//       const load = 1;
//       const reps = 100;
//       let emptyFields = [];

//       if (!title) {
//         emptyFields.push('title');
//       }
//       if (!load) {
//         emptyFields.push('load');
//       }
//       if (!reps) {
//         emptyFields.push('reps');
//       }
//       if (emptyFields.length > 0) {
//         return res.status(400).json({ error: 'Please fill in all the fields', emptyFields });
//       }

//       const user_id = req.user._id;
//       const food = await Food.create({ title, load, reps, user_id });
//       res.status(200).json(food);
//     });
//     // console.log(imagepath);
//     // const image = fs.readFileSync(imagepath, {
//     //   encoding: "base64"
//     // });
    
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

const createFood = async (req, res) => {
  const pythonFilePath = 'script.py';

  try {
    const imagepath = req.body.image;
    let jsonObject = "initial";
    console.log(imagepath, pythonFilePath);

    await exec(`python3 ${pythonFilePath} ${imagepath}`, async (error, stdout, stderr) => {
      // if (error) {
      //   console.error(`Error executing Python file: ${error.message}`);
      //   return;
      // }
      // if (stderr) {
      //   console.error(`Python script returned an error: ${stderr}`);
      //   return;
      // }

      // Process the output from the Python script
      console.log("std out-" + stdout);
      const output = stdout.trim();
      const output2 = output.split("\n");
      // console.log("op-");
      // console.log(output);
      const jsonString = output2[output2.length - 1];
      jsonObject = JSON.parse(jsonString.replace(/'/g, '"'));
      console.log(jsonObject.predictions[0].class);

      const title = jsonObject.predictions[0].class;
      const load = 1000;
      const reps = foodsar.find((food) => food.name === title).calories*load;
      let emptyFields = [];

      if (!title) {
        emptyFields.push('title');
      }
      if (!load) {
        emptyFields.push('load');
      }
      if (!reps) {
        emptyFields.push('reps');
      }
      if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields });
      }

      const user_id = req.user._id;
      const food = await Food.create({ title, load, reps, user_id });
      res.status(200).json(food);
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}; 

// delete a food
const deleteFood = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such food'})
  }

  const food = await Food.findOneAndDelete({_id: id})

  if (!food) {
    return res.status(400).json({error: 'No such food'})
  }

  res.status(200).json(food)
}

// update a food
const updateFood = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such food'})
  }

  const food = await Food.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!food) {
    return res.status(400).json({error: 'No such food'})
  }

  res.status(200).json(food)
}


module.exports = {
  getFoods,
  getFood,
  createFood,
  deleteFood,
  updateFood
}