import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true },
        phoneNumber: { type: String, unique: false },
        role: { type: String, default: "user" },
        password: { type: String, required: true },
        profilePicture: { type: String, default: "" },
        address: {
            street: { type: String, default: "" },
            city: { type: String, default: "" },
            state: { type: String, default: "" },
            zip: { type: String, default: "" },
        },
    },
    { timestamps: true }
);

// Método para comparar contraseñas
userSchema.methods.comparePassword = function (newPassword) {
    return bcrypt.compare(newPassword, this.password);
};

export default model("User", userSchema);
