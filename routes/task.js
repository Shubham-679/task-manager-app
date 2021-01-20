const express = require("express");
const Task = require("../model/taskModel");
const router = express.Router();
const auth = require("../middlewares/auth");

router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({
        owner: req.user._id
      })
      .populate("owner", "name _id")
      .select("description completed");
    res.status(201).send(tasks);
  } catch (error) {
    res.status(500);
  }
});

router.post("/", auth, async (req, res) => {
  const task = new Task({
    description: req.body.description,
    owner: req.user._id,
  });
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

  console.log("inside patch")

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