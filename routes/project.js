const express = require("express");
const router = express.Router();
const Project = require("../model/projectModel");
const auth = require("../middlewares/auth");
const { Task } = require("../model/taskModel");

router.get("/", auth, async (req, res) => {
  try {
    const project = await Project.find();
    res.status(201).send(project);
  } catch (e) {
    res.status(500).send(e);
    console.log(e);
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('user', "name")
    res.status(201).send(project);
  } catch (e) {
    res.status(500).send(e);
    console.log(e)
  }
});

router.post("/", auth, async (req, res) => {
  const project = new Project({
    title: req.body.title,
    description: req.body.description
  });
  try {
    await project.save();
    res.status(200).send(project);
  } catch (e) {
    res.status(400).send(e);
    console.log(e);
  }
});


router.put("/", auth, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.body._id, {
      title: req.body.title,
      description: req.body.description,
      tasks: { task: req.body.task },
      user: req.body.user,
    }, { new: true })
      .populate("user", "name -_id")
    if (!project) {
      res.status(404).send('Project Not Found');
    }
    res.status(200).send(project);
  } catch (e) {
    res.status(404).send(e);
    console.log(e);
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({ _id: req.params.id })
    if (!project) {
      res.status(404).send("Project Not Found")
    }
    res.status(201).send(project)
  } catch (e) {
    res.status(404).send(e)
    console.log(e);
  }
})

module.exports = router;