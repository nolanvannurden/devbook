const nodemailer = require("nodemailer");

const { EMAIL, PASSWORD } = process.env;

module.exports = {
  email: async (req, res) => {
    const { email } = req.body;
    console.log(email);

    let leftFrag = "<";
    let rightFrag = "/>";

    try {
      let transporter = nodemailer.createTransport({
        service: "Yahoo",
        auth: {
          user: EMAIL,
          pass: PASSWORD,
        },
      });
      let info = await transporter.sendMail(
        {
          from: EMAIL,
          to: `<${email}>`,
          subject: `Welcome to ${leftFrag}Devbook${rightFrag}`,
          text: `Thanks for signing up for ${leftFrag}Devbook${rightFrag}`,
          html: `<h1> Welcome To Devbook </h1> 
            <h3> Thanks for signing up and being a part of our Devmountain Alumni Network! </h3> 
            <h3> We hope you stay connected and find new opportunities. </h3> 
            <h3> -WR6 </h3> 
            <img style="width:250px;" src="cid:devbooknoreply@yahoo.com"/>`,
          attachments: [
            {
              //Embedded Image
              filename: "devbookpic.png",
              cid: "devbooknoreply@yahoo.com",
              path:
                "https://cdn.discordapp.com/attachments/789197223237910528/789287051991973938/devbook-logo.png",
            },
          ],
        },
        (err, res) => {
          if (err) {
            console.log("err", err);
          } else {
            console.log("res", res);
            res.status(200).send(info);
          }
        }
      );
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  },
};
