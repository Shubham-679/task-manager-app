const express = require("express");
const Task = require("../model/taskModel");
const router = express.Router();
const auth = require("../middlewares/auth");
const User = require('../model/userModel');
const Project = require("../model/projectModel");
const {sendNewTaskEmail,sendUpdateTaskEmail} = require('../middlewares/email');

// get task by there id
router.get("/task/:id", auth, async (req, res) => {
  try {
    const tasks = await Task.find({_id: req.params.id})
      .populate("project", "title")
    res.status(201).send(tasks);
  } catch (e) {
    res.status(500);
    console.log(e)
  }
});

// get all task of particular project for admin 
router.get("/:id", auth, async (req, res) => {
  try {
    const tasks = await Task.find({project: req.params.id});
    res.status(201).send(tasks);
  } catch (e) {
    res.status(500).send(e);
    console.log(e)
  }
});

// get all task for user 
router.get("/users/:id", auth, async (req, res) => {
  try {
    const tasks = await Task.find({'owner._id': req.params.id})
      .populate("project", "title description _id")
      .select("description status");
    res.status(201).send(tasks);
  } catch (e) {
    res.status(500).send(e);
    console.log(e)
  }
});

router.post("/", auth, async (req, res) => {
  const user = await User.findById(req.body.user)
  if (!user) return res.status(404).send('User Not Found');
  
  const project = await Project.findById(req.body.projectId)
  if (!project) return res.status(404).send('Project Not Found');
  console.log(req.body)

  const task = new Task({
    description: req.body.task,
    owner: {
      _id: user._id,
      name: user.name
    },
    project: project._id,
    deadline : req.body.formattedDate
  })
  try {
    await task.save()
    res.status(200).send(task);
  } catch (e) {
    res.status(400).send(e);
    console.log(e);
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({_id: req.params.id})
    if (!task) {
      res.status(404).send()
    }
    res.status(201).send(task)
  } catch (e) {
    res.status(404).send(e)
    console.log(e);
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
    res.status(404).send(e)
    console.log(e);
  }
})

router.put('/task/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.body.user);
    if (!user) return res.status(404).send('User Not Found');

    const task = await Task.findByIdAndUpdate(req.params.id, {
      description: req.body.task,
      owner: {
        _id: user._id,
        name: user.name
      },
      deadline : req.body.formattedDate
    }, {
      new: true,
      runValidators: true
    })
    if (!task) {
      res.status(404).send();
    }
    res.status(200).send(task);
  } catch (e) {
    res.status(404).send(e)
    console.log(e);
  }
})


module.exports = router;