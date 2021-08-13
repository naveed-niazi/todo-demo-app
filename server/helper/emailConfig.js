const nodemailer = require("nodemailer");
const { user, pass } = require("../variables");
require('dotenv').config();

const transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
            user: user,
            pass: pass
      },
      tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
      }
});

module.exports.sendConfirmationEmail = (name, email, confirmationCode) => {
      transport
            .sendMail({
                  from: "TODO " + user,
                  to: email,
                  subject: "Verify Email Address | TODO",
                  html: `
            <div style="margin:0px auto;max-width:640px;background:#ffffff">
                  <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:#ffffff" align="center" border="0">
                        <tbody>
                              <tr>
                                    <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:40px 50px">
                                          <div aria-labelledby="mj-column-per-100" class="m_-6536726100743519615mj-column-per-100" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%">
                                                <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                                      <tbody>
                                                            <tr>
                                                                  <td style="word-break:break-word;font-size:0px;" >
                                                                        <div style="color:#737f8d;font-family:Whitney,Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif;font-size:16px;line-height:24px;">
                                                                              <h2 style="font-family:Helvetica Neue,Arial;font-weight:500;font-size:20px;color:#4f545c;letter-spacing:0.27px">
                                                                              <b>Hello ${name}</b>,</h2>
                                                                              <p>Welcome to TODO. One more step to complete your registration. 
                                                                                    Click the link below to verify your email address:
                                                                              </p>
                                                                        </div>
                                                                  </td>
                                                            </tr>
                                                            <tr>
                                                                  <td style="word-break:break-word;font-size:0px;padding:10px 25px;padding-top:20px" align="center">
                                                                        <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:separate" align="center" border="0">
                                                                              <tbody>
                                                                                    <tr>
                                                                                          <td style="border:none;border-radius:3px;color:white;padding:15px 19px" align="center" valign="middle" bgcolor="#7289DA">
                                                                                                <a href=https://todo-front-demo.herokuapp.com/confirm/${confirmationCode} style="text-decoration:none;line-height:100%;background:#7289da;color:white;font-family:Helvetica;font-size:15px;font-weight:normal;text-transform:none;margin:0px" target="_blank" >
                                                                                                      Verify Email
                                                                                                </a
                                                                                          </td>
                                                                                    </tr>
                                                                              </tbody>\
                                                                        </table>
                                                                  </td>
                                                            </tr>
                                                            <tr>
                                                                  <td style="word-break:break-word;font-size:0px;padding:30px 0px">
                                                                        <p style="font-size:1px;margin:0px auto;border-top:1px solid #dcddde;width:100%"></p>
                                                                  </td></tr><tr><td style="word-break:break-word;font-size:0px;padding:0px" align="left">
                                                                        <div style="color:#747f8d;font-family:Whitney,Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif;font-size:13px;line-height:16px;text-align:left">
                                                                              <p>
                                                                                    This email is sytem generated, if you did not make this request, then simply <a href=https://todo-front-demo.herokuapp.com/delete/${confirmationCode}>click here </a> to remove your email.
                                                                                    <br><br>Thank you,
                                                                                    <br>TODO
                                                                                          </a>
                                                                                          <br>                                                                              
                                                                                    </p>
                                                                              </div>
                                                                        </td>
                                                                  </tr>
                                                            </tbody>
                                                      </table>
                                                </div>
                                          </td>
                                    </tr>
                              </tbody>
                  </table>
            </div>`,
            })
            .catch((err) => console.log(err));
};

module.exports.resetPasswordEmail = (name, email, confirmationCode) => {
      console.log("Sending Reset Password Email...");
      console.log(name);
      transport
            .sendMail({
                  from: "TODO " + user,
                  to: email,
                  subject: "Reset Password",
                  html: `
           <div style="margin:0px auto;max-width:640px;background:#ffffff">
                  <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:#ffffff" align="center" border="0">
                        <tbody>
                              <tr>
                                    <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:40px 50px">
                                          <div aria-labelledby="mj-column-per-100" class="m_-6536726100743519615mj-column-per-100" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%">
                                                <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                                      <tbody>
                                                            <tr>
                                                                  <td style="word-break:break-word;font-size:0px;" >
                                                                        <div style="color:#4f545c;font-family:Whitney,Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif;font-size:16px;line-height:24px;" >
                                                                              <h1 style="color:#4f545c; letter-spacing: 0.2px;line-height: 1;">Forgot your password? Let's get you a new one.</h1>
                                                                              <h2 style="font-family:Helvetica Neue,Arial;font-weight:500;font-size:20px;color:#4f545c;letter-spacing:0.27px"align="center">
                                                                              <b>Hello ${name}</b>,</h2>
                                                                              <p align="center">This email is generated in response to the request to reset your password of TODO Account. Click the button below
                                                                                    to reset your password.
                                                                              </p>
                                                                        </div>
                                                                  </td>
                                                            </tr>
                                                            <tr>
                                                                  <td style="word-break:break-word;font-size:0px;padding:10px 25px;padding-top:20px" align="center">
                                                                        <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:separate" align="center" border="0">
                                                                              <tbody>
                                                                                    <tr>
                                                                                          <td style="border:none;border-radius:3px;color:white;padding:15px 19px" align="center" valign="middle" bgcolor="#dc3545">
                                                                                                <a href=https://todo-front-demo.herokuapp.com/reset-password/${confirmationCode} style="text-decoration:none;line-height:100%;color:white;font-family:Helvetica;font-size:15px;font-weight:normal;text-transform:none;margin:0px" target="_blank" >
                                                                                                      Reset Password
                                                                                                </a>
                                                                                          </td>
                                                                                    </tr>
                                                                              </tbody>
                                                                        </table>
                                                                  </td>
                                                            </tr>
                                                            <tr>
                                                                  <td>
                                                                        <div style=" color:#4f545c;font-family:Whitney,Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif;font-size:16px;line-height:24px;" >
                                                                              <b><p style="color:#4f545c" align="center">(Just confirming you're you)</p>
                                                                              </b><p >If you did not request a password reset, please ignore this email.
                                                                             </p>
                                                                        </div>
                                                                  </td>
                                                            </tr>
                                                            <tr>
                                                                  <td style="word-break:break-word;font-size:0px;padding:30px 0px">
                                                                        <p style="font-size:1px;margin:0px auto;border-top:1px solid #dcddde;width:100%"></p>
                                                                  </td></tr><tr><td style="word-break:break-word;font-size:0px;padding:0px" align="left">
                                                                        <div style="color:#747f8d;font-family:Whitney,Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif;font-size:13px;line-height:16px;text-align:left">
                                                                              <p>
                                                                                    This email id autogenerated by <b>TODO</b>, please feel free to contact us on <a href=mailto: "${user}">${user}</a> for further information.
                                                                                    <br><br>Thank you,
                                                                                    <br>TODO Team
                                                                                          </a>
                                                                                          <br>                                                                              
                                                                                    </p>
                                                                              </div>
                                                                        </td>
                                                                  </tr>
                                                            </tbody>
                                                      </table>
                                                </div>
                                          </td>
                                    </tr>
                              </tbody>
                  </table>
            </div>`,
            })
            .catch((err) => console.log(err));
}; 