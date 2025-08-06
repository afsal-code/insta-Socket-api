import dataSchema from './models/model.js'
import bcrypt from 'bcrypt'
import pkg from 'jsonwebtoken'
const { sign } = pkg

// Register user
export async function addUser(req, res) {
    const { name, email, pass, cpass } = req.body;

    if (!(name && email && pass && cpass)) {
        return res.status(400).send({ msg: "All fields are required" });
    }

    if (pass !== cpass) {
        return res.status(400).send({ msg: "Passwords do not match" });
    }

    try {
        const existing = await dataSchema.findOne({ email });
        if (existing) {
            return res.status(409).send({ msg: "Email already registered" });
        }

        const hashedPass = await bcrypt.hash(pass, 10);
        await dataSchema.create({ name, email, pass: hashedPass });
        res.status(201).send({ msg: "User registered successfully" });
    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).send({ msg: "Server error", error });
    }
}

// Login user
export async function login(req, res) {
    const { email, pass } = req.body;

    if (!(email && pass)) {
        return res.status(400).send({ msg: "Email and password are required" });
    }

    try {
        const user = await dataSchema.findOne({ email });
        if (!user) {
            return res.status(401).send({ msg: "User not found" });
        }

        const match = await bcrypt.compare(pass, user.pass);
        if (!match) {
            return res.status(401).send({ msg: "Incorrect password" });
        }

        const token = sign({ userID: user._id }, process.env.JWT_KEY, { expiresIn: '1h' });
        res.status(200).send({ msg: "Login successful", token });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).send({ msg: "Server error", error });
    }
}

 export async function getData(req, res) {
    try {
        const usr = await dataSchema.findById(req.user.userID).select("-pass");
        if (!usr) {
            return res.status(404).send({ msg: "User not found" });
        }
        res.status(200).send({ user: usr });
    } catch (error) {
        console.error("GetUserData Error:", error);
        res.status(500).send({ msg: "Server error", error });
    }
}

