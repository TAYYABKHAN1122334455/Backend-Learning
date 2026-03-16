import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';
import { asyncHandler } from '../utils/async-handler.js';
import { User } from '../models/user.models.js';
import { sendEmail, createVerificationTemplate } from '../utils/mail.js';


const generateAccessAndRefreshToken = async (userId) => {

    try {

        const user = await User.findById(userId);

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;

        await user.save({
            validateBeforeSave: false
        });

        return { accessToken, refreshToken };

    } catch (error) {

        throw new ApiError(
            500,
            "Something went wrong while generating access token"
        );
    }
};



const registerUser = asyncHandler(async (req, res) => {

    const { email, username, password } = req.body;

    // 1️⃣ Check if user already exists
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (existedUser) {
        throw new ApiError(
            409,
            "Username or email already exists"
        );
    }


    // 2️⃣ Create user
    const user = await User.create({
        email,
        username,
        password,
        isEmailVerified: false
    });


    // 3️⃣ Generate verification token
    const { unHashToken, hashedToken, tokenExpiry } =
        user.generateTemporaryToken();

    user.emailVerificationToken = hashedToken;
    user.emailVerificationExpiry = tokenExpiry;

    await user.save({
        validateBeforeSave: false
    });


    // 4️⃣ Generate verification link
    const verificationUrl =
        `${req.protocol}://${req.get("host")}/api/v1/auth/verify-email/${unHashToken}`;


    // 5️⃣ Send verification email
    await sendEmail({
        email: user.email,
        subject: "Please verify your email",
        mailGenContent: createVerificationTemplate(
            user.username,
            verificationUrl
        )
    });


    // 6️⃣ Remove sensitive data
    const createdUser = await User.findById(user._id)
        .select("-password -refreshToken -emailVerificationToken -emailVerificationExpiry");


    if (!createdUser) {

        throw new ApiError(
            500,
            "Something went wrong while registering user"
        );
    }


    return res.status(201).json(

        new ApiResponse(
            201,
            { user: createdUser },
            "User registered successfully. Verification email sent."
        )

    );

});
const login = asyncHandler(async (req, res) => {

    const { email, username, password } = req.body;

    if ((!email && !username) || !password) {
        throw new ApiError(400, "Email/Username and password are required");
    }

    const user = await User.findOne({
        $or: [{ email }, { username }]
    });

    if (!user) {
        throw new ApiError(400, "User does not exist");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(400, "Invalid credentials");
    }

    const { accessToken, refreshToken } =
        await generateAccessAndRefreshToken(user._id);

    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken -emailVerificationToken -emailVerificationExpiry"
    );

    const options = {
        httpOnly: true,
        secure: true
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser,
                    accessToken,
                    refreshToken
                },
                "User logged in successfully"
            )
        );
});
export { registerUser,login };
