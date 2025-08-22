const { User } = require("../../models");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
module.exports = {

    signup: async (req, res) => {
        try {
            const { name, email, password } = req.body;

            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await User.create({ name, email, password: hashedPassword });

            const token = jwt.sign({ id: user.id, email: user.email }, process.env.SECRET_KEY, { expiresIn: '1h' });

            return res.status(201).json({ message: 'User registered successfully', token });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },

    // LOGIN
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, process.env.SECRET_KEY, { expiresIn: '1h' });

            return res.status(200).json({
                message: 'Login successful', token, user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },

    getProfile: async (req, res) => {
        try {
            const userid = req.user.id
            const user = await User.findByPk(userid, {
                attributes: { exclude: ["password"] },
            });

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            return res.status(200).json(user);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    },

    updateProfile: async (req, res) => {
        try {
            const { name, phone, address, gender } = req.body;
            const userid = req.user.id
            const [updated] = await User.update(
                { name, phone, address, gender },
                { where: { id: userid } }
            );

            if (updated === 0) {
                return res.status(404).json({ message: "User not found or no changes applied" });
            }

            const updatedUser = await User.findByPk(req.user.id, {
                attributes: { exclude: ["password"] },
            });

            return res
                .status(200)
                .json({ message: "Profile updated successfully", user: updatedUser });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    },


}