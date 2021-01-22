const express = require("express");
const Project = require("../model/projectModel");
const router = express.Router();
const auth = require("../middlewares/auth");


router.get("/", async (req, res) => {
    try {
      const project = await Project.find();
      res.status(201).send(project);
    } catch (error) {
      res.status(500);
    }
});

router.post("/", async (req, res) => {
    const project = new Project({
      title: req.body.title,
      task : req.body.task,
      user: req.body.user,
    });
    try {
      await project.save();
      res.status(200).send(project);
    } catch (e) {
      res.status(400).send(e);
      console.log(e);
    }
  });

  router.delete('/:id', auth, async (req, res) => {
    try {
      const project = await Project.findOneAndDelete({
        _id: req.params.id,
        owner: req.user._id
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