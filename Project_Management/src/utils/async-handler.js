// asyncHandler ek higher-order function hai
// matlab yeh ek function ko argument me leta hai aur naya function return karta hai
const asyncHandler = (requestHandler) => {

    // Express middleware return kar raha hai (req, res, next)
    return (req, res, next) => {

        // Promise.resolve() ensure karta hai ke agar requestHandler async ho
        // ya normal function ho, dono cases me Promise ban jaye
        Promise
            .resolve(requestHandler(req, res, next))

            // agar requestHandler me koi error aaye (reject ho jaye)
            // toh catch block run hoga
            .catch((err) => next(err));  

            // next(err) Express ko batata hai ke error aayi hai
            // phir Express ka error middleware us error ko handle karega
    };
};

// export kar rahe hain taake controllers me use ho sake
export { asyncHandler };
