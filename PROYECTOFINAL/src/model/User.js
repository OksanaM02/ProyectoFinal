import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true },
        phoneNumber: { type: Number, unique: true },
        password: { type: String, required: true },
        profilePicture: { type: String, default: "" }, // Campo para la URL de la imagen de perfil , haber como hago para que se cambien.
        role: { type: String, default: "user" },
        address: {
            //campos de direccion para el formulario
            street: { type: String, default: "" },
            city: { type: String, default: "" },
            state: { type: String, default: "" }
        },
    },
    { timestamps: true }
);

// Método para comparar contraseñas
userSchema.methods.comparePassword = function (newPassword) {
    return bcrypt.compare(newPassword, this.password);
};

export default model("User", userSchema);
