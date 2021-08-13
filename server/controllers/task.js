const User = require("../models/user");

exports.createTask = (req, res) => {
  console.log("reached creation")
  User.findById(req.auth._id, (err, data) => {
    if (err || !data) {
      return res.status(400).json({ error: "Unable to find user" });
    } else {
      data.tasks.push(req.body);
      data.save((err) => {
        if (err)
          return res.status(400).json({ error: "Unable to create task" });
        else
          return res
            .status(200)
            .json({ message: "Task created successfully!" });
      });
    }
  });
};

exports.getTasks = (req, res) => {
  User.findById(req.auth._id, (err, data) => {
    if (err || !data)
      return res.status(400).json({ error: "Unable to find user" });
    else {
      return res
        .status(200)
        .json({ tasks: data.tasks });
    }
  });
};
exports.updateTask = (req, res) => {
  User.findById(req.auth._id, (err, data) => {
    if (err || !data) {
      return res.status(400).json({ error: "Unable to find user" });
    } else {
      var result = data.tasks.map((task, index) => {
        if (task._id.toString() === req.query.taskId.toString()) {
          task.detail = req.body.detail;
          task.task = req.body.task;
          data.save((err) => {
            if (err)
              return res.status(400).json({ error: "Unable to update task" });
            else
              return res
                .status(200)
                .json({ message: "Task updated successfully!" });
          });
        }
      });
    }
  });
};

exports.deleteTask = (req, res) => {
  User.findById(req.auth._id, (err, data) => {
    if (err || !data) {
      return res.status(400).json({ error: "Unable to find user" });
    } else {
      data.tasks.pull(req.query.taskId);
      data.save((err) => {
        if (err)
          return res.status(500).json({ error: "Unable to delete task" });
        else
          return res
            .status(200)
            .json({ message: "Task removed successfully!" });
      });
    }
  });
};
