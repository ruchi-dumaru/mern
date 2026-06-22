const { AppConfig } = require("../../config/config");
const MailService = require("../../service/mail.service");

class AuthMailService extends MailService {
  activateUserAccount(user) {
    let activationLink=AppConfig.frontendUrl+"/activate/"+user.activationToken
    try {
        console.log('activation:'+user)
      return this.sendMail({
        to: user.email,
        subject: "Activate your Account",
        // message: `Dear ${user.name.split("").shift()},\n
        // Thank you for registering with us.Your uesername is: ${user.email}\n
        // Click the link below to activate your account\n
        // <a href='${activationLink}'>Activate From Here</a>\n
        // This link will be valid till  ....`,

      message:`
<div style="
max-width:600px;
margin:auto;
background:#ffffff;
font-family:Arial,sans-serif;
border:1px solid #e5e7eb;
">

    <!-- Logo -->

    <div style="
    padding:30px 0 10px 0;
    text-align:center;
    ">

        <img
        src=""
        style="display:block;margin:auto;"
        />

    </div>


    <!-- Heading -->

    <div style="
    text-align:center;
    padding:10px 40px;
    ">

        <h2 style="
        margin:0;
        color:#1f2937;
        font-size:24px;
        ">
            Email Address Verification
        </h2>

    </div>



    <!-- Body -->

    <div style="
    padding:30px 50px;
    color:#374151;
    font-size:16px;
    line-height:1.8;
    ">

        <p>

            Hi ${user.name.split(" ").shift()},

        </p>


        <p>

            Thank you for registering with Nexsora.


        </p>


        <p>

            Your username is

            <strong>

                ${user.email}

            </strong>

        </p>



        <p>

            To finish setting up your account,

            please verify your email address.

        </p>



        <!-- Button -->


        <div style="
        text-align:center;
        margin:40px 0;
        ">


            <a

                href="${activationLink}"


                style="

                background:#166534;

                color:white;

                padding:15px 40px;

                text-decoration:none;

                border-radius:4px;

                display:inline-block;

                font-size:16px;

                font-weight:600;

                ">

                    Activate Account


            </a>



        </div>



        <p>

            This activation link will expire after
            <strong>1 day</strong>.


        </p>


        <p>

            If you did not create this account,
            you can safely ignore this email.

        </p>


    </div>



    <!-- Footer -->

    <div style="

    text-align:center;

    padding:25px;

    color:#9ca3af;

    font-size:13px;

    border-top:1px solid #f3f4f6;

    ">

        © 2026 ShopSphere

        <br>

        Kathmandu, Nepal

    </div>



</div>
`
      });
    } catch (exception) {
      throw exception;
    }
  }


 async WelcomeMessageToUser(userDetail){
  
    try{
        const loginLink=AppConfig.frontendUrl+'/login';

        return await this.sendMail({
            to:userDetail.email,
            subject:"Thank you for registering with us",
            message: `
<div style="
max-width:600px;
margin:auto;
background:#ffffff;
font-family:Arial,sans-serif;
border:1px solid #e5e7eb;
">

    <!-- Logo -->
    <div style="
    padding:30px 0 10px 0;
    text-align:center;
    ">

        <img
        src=""
        style="display:block;margin:auto;"
        />

    </div>


    <!-- Heading -->
    <div style="
    text-align:center;
    padding:10px 40px;
    ">

        <h2 style="
        margin:0;
        color:#1f2937;
        font-size:24px;
        ">
            Welcome to Nexsora 🎉
        </h2>

    </div>



    <!-- Body -->
    <div style="
    padding:30px 50px;
    color:#374151;
    font-size:16px;
    line-height:1.8;
    ">

        <p>
            Hi ${userDetail.name.split(" ").shift()},
        </p>


        <p>

            Thank you for joining
            <strong>Nexsera</strong>.

        </p>


        <p>

            We are delighted to have you as a member of our community.

        </p>


        <p>

            Your account has been successfully activated and is now ready to use.

        </p>


        <p>

            You can now securely sign in using your registered email address:

        </p>


        <p>

            <strong>
                ${userDetail.email}
            </strong>

        </p>



        <!-- Login Button -->

        <div style="
        text-align:center;
        margin:40px 0;
        ">


            <a

                href="${loginLink}"

                style="

                background:#166534;

                color:white;

                padding:15px 40px;

                text-decoration:none;

                border-radius:4px;

                display:inline-block;

                font-size:16px;

                font-weight:600;

                ">

                    Login to Nexsera

            </a>


        </div>



        <p>

            Thank you for choosing Nexsera.

        </p>


        <p>

            We look forward to helping you enjoy a seamless shopping experience.

        </p>


        <p>

            Happy Shopping!

        </p>


    </div>



    <!-- Footer -->

    <div style="

    text-align:center;

    padding:25px;

    color:#9ca3af;

    font-size:13px;

    border-top:1px solid #f3f4f6;

    ">

        © 2026 Nexsera

        <br>

        Kathmandu, Nepal

    </div>

</div>
`,

        })
      
    }catch (exception) {
      throw exception;
    }
}
async resendTokenActivation(userDetail){
   let activationLink=AppConfig.frontendUrl+"/activate/"+userDetail.activationToken
    try {
     console.log("helooo"+userDetail)
      return await this.sendMail({
        to: userDetail.email,
        subject: "Re-Activate your Account",
  
message: `
<div style="
max-width:600px;
margin:auto;
background:#ffffff;
font-family:Arial,sans-serif;
border:1px solid #e5e7eb;
">

    <!-- Logo -->
    <div style="
    padding:30px 0 10px 0;
    text-align:center;
    ">

        <img
        src=""
        style="display:block;margin:auto;"
        />

    </div>

    <!-- Heading -->
    <div style="
    text-align:center;
    padding:10px 40px;
    ">

        <h2 style="
        margin:0;
        color:#1f2937;
        font-size:24px;
        ">
            New Verification Link
        </h2>

    </div>


    <!-- Body -->
    <div style="
    padding:30px 50px;
    color:#374151;
    font-size:16px;
    line-height:1.8;
    ">

        <p>
            Hi ${userDetail.name.split(" ").shift()},
        </p>


        <p>
            We received a request to resend your account verification link.
        </p>


        <p>
            Your registered email address is:
            <strong>${userDetail.email}</strong>
        </p>


        <p>
            To activate your Nexsora account, please click the button below.
        </p>


        <!-- Button -->

        <div style="
        text-align:center;
        margin:40px 0;
        ">

            <a
                href="${activationLink}"

                style="
                background:#166534;
                color:white;
                padding:15px 40px;
                text-decoration:none;
                border-radius:4px;
                display:inline-block;
                font-size:16px;
                font-weight:600;
                ">

                Verify Email

            </a>

        </div>


        <p>
            This verification link will expire after
            <strong>1 day</strong>.
        </p>


        <p>
            If you did not request a new verification link, you may safely ignore this email.
            Your account will remain inactive until verified.
        </p>

    </div>



    <!-- Footer -->

    <div style="
    text-align:center;
    padding:25px;
    color:#9ca3af;
    font-size:13px;
    border-top:1px solid #f3f4f6;
    ">

        © 2026 Nexsora

        <br>

        Kathmandu, Nepal

    </div>

</div>
`


      });
    } catch (exception) {
      throw exception;
    }
}
};

 

const authMailSvc = new AuthMailService();
module.exports = authMailSvc;
