// ApiError class bana rahe hain jo Node.js ke built-in Error class ko extend karegi
// Extend karne ka matlab: hum Error ki existing functionality reuse kar sakte hain
class ApiError extends Error {

  constructor(
    statusCode,                // HTTP status code (e.g. 400, 404, 500)
    message = "Something went wrong",  // Default error message
    errors = [],               // Extra error details (array format)
    stack = ""                 // Optional manual stack trace
  ){

    // Parent class (Error) ka constructor call kar rahe hain
    // Yeh internally message ko set karta hai
    super(message);

    // Custom properties jo hum API error response me bhejna chahte hain

    this.statusCode = statusCode;  // Client ko error ka HTTP status batane ke liye
    this.data = null;              // Error me normally data nahi hota
    this.message = message;        // Error ka readable message
    this.success = false;          // Error case me success always false hota hai
    this.errors = errors;          // Detailed validation errors etc.

    // STACK TRACE HANDLING (Debugging ke liye)

    // Agar manually stack pass kiya gaya hai:
    if(stack){
      this.stack = stack;  
      // Is case me existing stack ko directly attach kar do
    }

    // Agar stack manually nahi mila:
    else{
      // Node.js ka built-in method use karte hain
      // Yeh automatically function call history generate karega

      // Parameter 1: this
      // → current ApiError object me stack attach karo

      // Parameter 2: this.constructor
      // → stack trace ApiError constructor ke baad se start ho
      // taake unnecessary internal Error constructor info remove ho

      Error.captureStackTrace(this, this.constructor);
    }

  }

}

// Is class ko export kar rahe hain taake controllers me use kar sakein
export default ApiError;