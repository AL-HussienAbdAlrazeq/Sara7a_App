import mongoose, { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import { decrypt, encrypt } from "../../utils/security/encryption.utils.js";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 200,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 200,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: 18,
      max: 60,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      default: "male",
      required: true,
    },
    DOB: Date,

    address: String,
    image: String,
    confirmEmail: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    changeCredintialTime: Date,
    isDeleted: { type: Boolean, default: false },
    forgetPasswordCode: String,
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    virtuals: {
      fullName: {
        get() {
          return `${this.firstName} ${this.lastName}`;
        },
      },
    },
    methods: {
      getFullName() {
        return `${this.firstName} ${this.lastName}`;
      },
    },
  }
);

userSchema.pre("save", async function (next) {
  try {
    const salt = Number(process.env.SALT);
    const hashPassword = await bcrypt.hash(this.password, salt);
    this.password = hashPassword;
    next();
  } catch (error) {
    console.log(error);
  }
});

userSchema.pre("save", function (next) {
  if (this.isModified("phone")) {
    this.phone = encrypt(this.phone);
  }
  next();
});

const User = mongoose.models.User || model("User", userSchema);
export default User;
