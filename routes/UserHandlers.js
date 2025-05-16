// Just handler logic
const user = require("../model/user");
const User = require("../model/user");

async function createUser(req, res) {
    try {
        const { name, email, age, gender } = req.body;
        const newUser = new User(req.body);
        const result = await newUser.save();

        res.status(201).json({ success: true, message: "User created", data: result });

    } catch (err) {
        if (err.code === 11000) {
            const duplicateField = Object.keys(err.keyValue)[0];
            const value = err.keyValue[duplicateField];

            return res.status(400).json({
                success: false,
                message: `Duplicate ${duplicateField} found for ${value}`,
                error: err.message,
            });
        }

        res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message,
        });
    }
}

async function findUser(req, res) {
    try {

        const result = await User.find();
        if (result.length > 0) {

            // console.log("length ", result.length);
            console.log("Result ", result);
            res.status(200).json({
                message: "Valus are : ",
                data: result,
            })
        } else {
            res.json({
                message: "No data found!",
            })
        }
    } catch (err) {
        res.json({
            error: err.message,
        })
    }
}

async function updateUser(req, res) {
    const id = req.params.id;
    const { email, ...otherUpdates } = req.body;

    try {
        // Fetch existing user
        const existingUser = await user.findById(id);

        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Check if the new email is different and already taken
        // if (email && email !== existingUser.email) {
        //     const emailExists = await user.findOne({ email });
        //     if (emailExists) {
        //         return res.status(400).json({
        //             success: false,
        //             message: "Duplicate email found",
        //         });
        //     }
        // }

        // Safe to update
        const updated = await user.findByIdAndUpdate(id, req.body, { new: true });

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: updated,
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message,
        });
    }
}

async function deleteUser(req, res) {

    try {
        const id = req.params.id
        console.log("Id to be deleted ", id);

        const existingUser = await user.findById(id);

        if (!existingUser) {
            res.status(404).json({
                message: `${id} does not exist`
            })
        }

        const result = await existingUser.deleteOne();

        res.status(200).json({
            message: "deleted successfully",
        })

    } catch (err) {
        res.status(500).json({
            message: "server error",
            error: err.message
        })
    }

}


module.exports = { createUser, findUser, updateUser, deleteUser };
