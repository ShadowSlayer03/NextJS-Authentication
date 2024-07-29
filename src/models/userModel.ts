import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide a username!"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password!"],
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
  },
  { timestamps: true }
);

// If model already created, then NextJS should use it, otherwise create a new one.
export const User =
  mongoose.models.users || mongoose.model("users", userSchema);

/* 
// FORGOT PASSWORD LOGIC

1) Backend part creates the forgotPasswordToken and forgotPasswordTokenExpiry 
and stores it in database as well as it is given to the user via email etc.

2) Now the user can access his mail and visit the link. The request is then
sent again to the backend, where thru URL params etc it has got the token details again.

3) Now all it needs to do is query the database and check if that particular token exists there.
If exists, then isVerified field in database can be made true.
*/
