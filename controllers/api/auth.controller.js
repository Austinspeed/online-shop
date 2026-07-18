const User = require('../../models/user.model');
const authUtil = require('../../util/authentication');
const validation = require('../../util/validation');


async function signup(req, res, next) {
    const {
        email,
        password,
        fullname,
        street,
        postal,
        city,
        confirmEmail
    } = req.body;


    if (
        !validation.userDetailsAreValid(
            email,
            password,
            fullname,
            street,
            postal,
            city
        ) ||
        !validation.emailIsConfirmed(email, confirmEmail)
    ) {
        return res.status(400).json({
            success: false,
            message: "Invalid user details"
        });
    }


    const user = new User(
        email,
        password,
        fullname,
        street,
        postal,
        city
    );


    try {

        const existsAlready = await user.existsAlready();

        if (existsAlready) {
            return res.status(409).json({
                success: false,
                message: "User already exists"
            });
        }


        await user.signup();


        res.status(201).json({
            success: true,
            message: "User created successfully"
        });


    } catch (error) {
        next(error);
    }
}



async function login(req, res, next) {

    const user = new User(
        req.body.email,
        req.body.password
    );


    try {

        const existingUser =
            await user.getUserWithSameEmail();


        if (!existingUser) {

            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });

        }


        const passwordIsCorrect =
            await user.hasMatchingPassword(
                existingUser.password
            );


        if (!passwordIsCorrect) {

            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });

        }

        // For EJS CODE

        // authUtil.createUserSession(
        //   req,
        //   existingUser,
        //   function(){

        //     res.status(200).json({
        //       success:true,
        //       message:"Login successful",
        //       user:{
        //         id: existingUser._id,
        //         email: existingUser.email,
        //         fullname: existingUser.fullname
        //       }
        //     });

        //   }
        // );

        const token = authUtil.createUserToken(existingUser);

        return res.status(200).json({
            success: true,
            message: "Login successful.",
            data: {
                token,
                user: {
                    id: existingUser._id,
                    email: existingUser.email,
                    fullname: existingUser.fullname,
                    isAdmin: existingUser.isAdmin
                }
            }
        });


    } catch (error) {
        next(error);
    }

}

//Because Of API
function logout(req, res) {
    authUtil.logoutUser();

    res.status(200).json({
        success: true,
        message: "Logout successful. Please discard the JWT on the client."
    });
}


// Because of EJS

// function logout(req,res){

//   authUtil.destroyUserAuthSession(req);


//   res.status(200).json({
//     success:true,
//     message:"Logout successful"
//   });

// }



module.exports = {
    signup,
    login,
    logout
};