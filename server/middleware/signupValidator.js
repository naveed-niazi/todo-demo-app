exports.signupValidator = (req, res, next) => {
    const {name, email, password}= req.body

    const nameRegex= /(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/
    const emailRegex= /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const passwordRegex=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/
    
    
    if(!name || !name.match(nameRegex)){
      return res.status(400).json({
        errorIn: "name",
        error: "Name must be between 5-50 characters",
      });
    }
    else if( !email || !email.match(emailRegex)){
      return res.status(400).json({
        
        errorIn: "email",
        error: "Provide a vaild email",
      });
    }
    else if(!password || !password.match(passwordRegex)){
      return res.status(400).json({
        errorIn: "password",
        error: "Provide a strong password with atleast on integer ",
      });
    }else{
      next();
    }
  };
  