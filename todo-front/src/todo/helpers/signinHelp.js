var nameRegex =
  /(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/;
var emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

export const validation = (name, email, password) => {
  if (!nameRegex.test(name))
    return { error: "Invalid name", errorIn: "name" };
  else if (!email.match(emailRegex))
    return { error: "Invalid Email", errorIn: "email" };
  else if (!password.match(passwordRegex))
    return {
      error:
        "Password between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter",
      errorIn: "password",
    };
  else return { error: "", errorIn: "" };
};
export const signinValidation = (email, password) => {
  if (!email.match(emailRegex))
    return { error: "Invalid email", errorIn: "email" };
  else if (!password.length===0)
    return {
      error:
        "Password Required",
      errorIn: "password",
    };
  else if (password.length < 1)
    return { error: "Password Required", errorIn: "password" };
  else return { error: "", errorIn: "" };
};
