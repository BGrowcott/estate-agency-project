const { Schema, model } = require("mongoose");

const propertySchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        imageUrl: {
            type: [String]
        },
        bedroom: {
            type: Number
        },
        bathroom: {
            type: Number
        }
    },
    {
        timestamps: true,
    }
);

const Property = model("property", propertySchema);

module.exports = Property;