const express = require("express");
const Project = require("../model/projectModel");
const router = express.Router();
const auth = require("../middlewares/auth");
const { Task } = require("../model/taskModel");


router.get("/", async (req, res) => {
    try {
      const project = await Project.find();
      res.status(201).send(project);
    } catch (error) {
      res.status(500);
    }
});

router.get("/:id", async (req, res) => {
  try {
    console.log(req.params.id)
    const project = await Project.findById(req.params.id)
    .populate('user' ,"name")
    res.status(201).send(project);
  } catch (error) {
    res.status(500);
  }
});

router.post("/", async (req, res) => {
    const project = new Project({
      title: req.body.title,
      description : req.body.description
    });
    try {
      await project.save();
      res.status(200).send(project);
    } catch (e) {
      res.status(400).send(e);
      console.log(e);
    }
  });


router.put("/", async (req, res) => {
  try {
    console.log(req.body)
    
    const project = await Project.findByIdAndUpdate(req.body._id, {
      title: req.body.title,
      description : req.body.description,
      tasks : {
        task : req.body.task
      },
      user: req.body.user,
    }, {
      new: true,
    }).populate("user" , "name -_id")
    if (!project) {
      res.status(404).send();
    }
    res.status(200).send(project);
    console.log(project)
  } catch (e) {
    console.log(e);
    res.status(404).send();
  }
});


  router.delete('/:id', auth, async (req, res) => {
    try {
      const project = await Project.findOneAndDelete({
        _id: req.params.id,
      })
      if (!project) {
        res.status(404).send()
      }
      res.status(201).send(project)
    } catch (e) {
      console.log(e);
      res.status(404).send()
    }
  })
  module.exports = router;