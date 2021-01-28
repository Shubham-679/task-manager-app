const express = require("express");
const Task = require("../model/taskModel");
const router = express.Router();
const auth = require("../middlewares/auth");
const User = require('../model/userModel');
const Project = require("../model/projectModel");

// router.get("/", async (req, res) => {
//   try {
//     const tasks = await Task.find({
//         owner: req.user._id
//       })
//       .populate("owner", "name _id")
//       .select("description completed");
//     res.status(201).send(tasks);
//     console.log(tasks)
//   } catch (error) {
//     res.status(500);
//   }
// });

router.get("/:id", async (req, res) => {
  try {
    const tasks = await Task.find({project : req.params.id})
      .populate("owner", "name _id")
      .select("description completed");
    res.status(201).send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    console.log("hello")
    const tasks = await Task.find({owner : req.params.id})
      .populate("project", "title description _id")
      .select("description completed");
      console.log(tasks)
    res.status(201).send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/", async (req, res) => {
 
  const user = await User.findById(req.body.user)
  const project = await Project.findById(req.body.projectId)
  
  const task = new Task({
    description: req.body.task,
    owner: user._id,
    project : project._id
  })
  try {
    await task.save();
    res.status(200).send(task);
  } catch (e) {
    res.status(400).send(e);
    console.log(e);
  }
});

// router.put("/:id", auth, async (req, res) => {
//   try {
//     const task = await Task.findByIdAndUpdate(req.body._id, req.body, {
//       new: true,
//     });
//     if (!task) {
//       res.status(404).send();
//     }
//     res.status(200).send(task);
//   } catch (e) {
//     console.log(e);
//     res.status(404).send();
//   }
// });

router.delete('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id
    })
    if (!task) {
      res.status(404).send()
    }
    res.status(201).send(task)
  } catch (e) {
    console.log(e);
    res.status(404).send()
  }
})

router.patch('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    if (!task) {
      res.status(404).send();
    }
    res.status(200).send(task);

  } catch (e) {
    console.log(e);
    res.status(404).send()
  }

})


module.exports = router;