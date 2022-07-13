const { Schema, model } = require("mongoose");

const baseSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
    }
);

const Base = model("base", baseSchema);

module.exports = Base;