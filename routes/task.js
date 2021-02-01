const express = require("express");
const Task = require("../model/taskModel");
const router = express.Router();
const auth = require("../middlewares/auth");
const User = require('../model/userModel');
const Project = require("../model/projectModel");
const { sendNewTaskEmail, sendUpdateTaskEmail } = require('../middlewares/email')

// get particular task by there id

router.get("/task/:id", async (req, res) => {
  try {
    const tasks = await Task.find({_id: req.params.id})
      .populate("project owner", "title name")
      .select("description completed");
    res.status(201).send(tasks);
  } catch (error) {
    res.status(500);
  }
});

// get all task of particular project for admin 

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

// get all task for user 

router.get("/users/:id", async (req, res) => {
  try {
    const tasks = await Task.find({owner : req.params.id})
      .populate("project", "title description _id")
      .select("description completed");
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
    console.log(user.email)
    console.log(user.name)
    await task.save();
    sendNewTaskEmail(user.email, user.name)
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

router.put('/task/:id', async (req, res) => {
  try {
    const user = await User.findById(req.body.user)
    console.log(user)
    const task = await Task.findByIdAndUpdate(req.params.id, {
      description : req.body.task,
      owner : req.body.user
    }, {
      new: true,
      runValidators: true
    })
    if (!task) {
      res.status(404).send();
    }
    sendUpdateTaskEmail(user.email, user.name)
    res.status(200).send(task);

  } catch (e) {
    console.log(e);
    res.status(404).send()
  }

})


module.exports = router;