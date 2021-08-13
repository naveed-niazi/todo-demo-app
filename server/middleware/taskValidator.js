exports.taskValidator = (req, res, next) => {

    console.log("verifying data")
    const {task, detail}= req.body

    if(!task){
        return res.status(400).json({error:"Provide a task title"})
    }else if(task.length<4 || task.length>55){
        return res.status(400).json({
            errorIn: "task",
            error: "Task must be between 5-55 characters",
          });
    }else{
        next();
    }
  };
  