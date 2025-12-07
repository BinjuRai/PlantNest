const { createUser, findUserByEmail } = require("../services/userService");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.registerUser = async (req, res) => {
    try {
        const exists = await findUserByEmail(req.body.email);
        if (exists) return res.status(400).json({ message: "Email already exists" });

        const user = await createUser(req.body);
        res.status(201).json({ message: "User Registered", user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const user = await findUserByEmail(req.body.email);
        if (!user) return res.status(404).json({ message: "User not found" });

        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({ message: "Login successful", token, user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
