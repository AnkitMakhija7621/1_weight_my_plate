const Food = require('../models/foodModel')
const mongoose = require('mongoose')
const axios = require("axios");
const fs = require("fs");









async function predictClass(image) {
    
    
  // console.log("in predictClass\n"+"image: "+image+"\n")
  try {
    // const image = fs.readFileSync(image, {
    //   encoding: "base64"
    //  });
    const response = await axios({
      method: "POST",
      url: "https://detect.roboflow.com/object-detection-oittp/1",
      params: {
        api_key: "7mviRdEfrnxMgQWHQIUY"
      },
      data: image,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    return response.data.predictions[0].class;
  } catch (error) {
    console.log("error with prediction\n")
    console.log(error.message);
    return null;
  }
}

async function runPrediction(image) {
  cl = await predictClass(image);
  // cl=predictClass;
  console.log("cl-")
  console.log(cl);
}








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


// create new food
// const createFood = async (req, res) => {
//   //predict functionality and all
//   const imagepath = req.body
//   const image = fs.readFileSync("/home/a-max/Desktop/img1.jpeg", {
//     encoding: "base64"
//   });
//   runPrediction()
//   .then(() => {
//     const title =cl;
//     const load = 0;
//     const reps = 0;

//     // const {title, load, reps}
//     let emptyFields = []

//     if(!title) {
//       emptyFields.push('title')
//     }
//     if(!load) {
//       emptyFields.push('load')
//     }
//     if(!reps) {
//       emptyFields.push('reps')
//     }
//     if(emptyFields.length > 0) {
//       return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
//     }

//     // add doc to db
//     try {
//       const user_id = req.user._id
//       const food = await Food.create({title, load, reps, user_id})
//       res.status(200).json(food)
//     } catch (error) {
//       res.status(400).json({error: error.message})
//     }


//   })





  
// }

//create food 2
const createFood = async (req, res) => {
  // console.log(req.body)
    // const imagepath = req.body.image;
    // const image = fs.readFileSync(imagepath, {
    //         encoding: "base64"
    //       });
    // await runPrediction(image);
    // const title = cl;

  


    // res.status(200).json(cl)
  try {

    // predict functionality and all
    const imagepath = req.body.image;
    // console.log(imagepath);
    const image = fs.readFileSync(imagepath, {
      encoding: "base64"
    });
    await runPrediction(image);
    const title = cl;
    const load = 1;
    const reps = 100;

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