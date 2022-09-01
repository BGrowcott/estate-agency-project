const { Base, User, Property } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_SK);
const co = require("co");
const OSS = require("ali-oss");
var fs = require("fs");

var client = new OSS({
  region: process.env.OSS_REGION,
  accessKeyId: process.env.AK_ID,
  accessKeySecret: process.env.AK_SECRET,
  bucket: process.env.BUCKET,
  endpoint: process.env.ENDPOINT,
});

const resolvers = {
  Query: {
    property: async (parent, { _id }) => {
      return Property.findById(_id);
    },
    properties: async () => {
      return Property.find({});
    },
    users: async () => {
      return User.find();
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("properties");
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("properties");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    checkout: async (parent, { propertyId }, context) => {
      const url = new URL(context.headers.referer).origin;

      try {
        const property = await Property.findById(propertyId);
        const session = await stripe.checkout.sessions.create({
          // payment_method_types: ["card"],
          line_items: [
            {
              price_data: {
                currency: "gbp",
                unit_amount: property.deposit * 100,
                product_data: {
                  name: property.address,
                  description: "Security Deposit",
                },
              },
              quantity: 1,
            },
          ],
          mode: "payment",
          success_url: `${url}/`,
          cancel_url: `${url}/`,
        });

        return { session: session.id };
      } catch (err) {
        console.log(err);
      }
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, { email, password }, context) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },

    createProperty: async (
      parent,
      {
        title,
        shortDescription,
        description,
        address,
        price,
        deposit,
        bedroom,
        bathroom,
        vrUrl,
      },
      context
    ) => {
      if (context.user.role !== "admin") {
        throw new AuthenticationError(
          `You need to be logged in as a administrator to perform this action`
        );
      }
      try {
        const newProperty = await Property.create({
          title,
          shortDescription,
          description,
          address,
          price,
          deposit,
          bedroom,
          bathroom,
          vrUrl,
        });
        return newProperty;
      } catch (err) {
        throw new AuthenticationError(`Whoops something went wrong: ${err}`);
      }
    },

    updateProperty: async (
      parent,
      {
        _id,
        title,
        shortDescription,
        description,
        address,
        price,
        deposit,
        bedroom,
        bathroom,
        vrUrl,
        isAvailable,
      },
      context
    ) => {
      if (context.user.role !== "admin") {
        throw new AuthenticationError(
          `You need to be logged in as a administrator to perform this action`
        );
      }
      try {
        const property = await Property.findByIdAndUpdate(
          _id,
          {
            $set: {
              title,
              shortDescription,
              description,
              address,
              price,
              deposit,
              bedroom,
              bathroom,
              vrUrl,
              isAvailable,
            },
          },
          {
            new: true,
          }
        );
        property.save();
        return property;
      } catch (err) {
        throw new AuthenticationError(`Whoops something went wrong: ${err}`);
      }
    },

    deleteProperty: async (parent, { propertyId }, context) => {
      if (context.user.role !== "admin") {
        throw new AuthenticationError(
          `You need to be logged in as a administrator to perform this action`
        );
      }
      try {
        const property = await Property.findByIdAndDelete(propertyId);
        return property;
      } catch (err) {
        throw new AuthenticationError(`Whoops something went wrong: ${err}`);
      }
    },

    updateUser: async (
      parent,
      {
        _id,
        username,
        email,
        title,
        dob,
        passportNumber,
        phone,
        weChat,
        school,
        specialty,
        emergencyContactName,
        emergencyContactNumber,
        emergencyContactAddress,
        otherInformation,
      },
      context
    ) => {
      if (!context.user) {
        throw new AuthenticationError(
          `You need to be logged in to perform this action`
        );
      }
      try {
        const user = await User.findByIdAndUpdate(
          _id,
          {
            $set: {
              username,
              email,
              title,
              dob,
              passportNumber,
              phone,
              weChat,
              school,
              specialty,
              emergencyContactName,
              emergencyContactNumber,
              emergencyContactAddress,
              otherInformation,
            },
          },
          { new: true }
        );
        user.save();
        return user;
      } catch (err) {
        throw new AuthenticationError(`Whoops something went wrong: ${err}`);
      }
    },

    saveForLater: async (parent, { userId, propertyId }, context) => {
      try {
        const user = await User.findByIdAndUpdate(
          userId,
          {
            $addToSet: { properties: propertyId },
          },
          { new: true }
        );
        user.save();
        return user;
      } catch (err) {
        throw new AuthenticationError(`Whoops something went wrong: ${err}`);
      }
    },

    uploadImage: async (
      parent,
      { imageFile, fileName, fileExtension, propertyId },
      context
    ) => {
      if (context.user.role !== "admin") {
        throw new AuthenticationError(
          `You need to be logged in as a administrator to perform this action`
        );
      }
      try {
        const buffer = Buffer.from(
          imageFile.replace(/^data:image\/\w+;base64,/, ""),
          "base64"
        );
        co(function* () {
          const result = yield client.put(
            `/hizoomNewProject/propertyImages/${fileName}.${fileExtension}`,
            buffer
          );
        });
        const property = await Property.findByIdAndUpdate(
          propertyId,
          {
            $addToSet: {
              imageUrl: `${fileName}.${fileExtension}`,
            },
          },
          { new: true }
        );
        property.save();
        return property;
      } catch (error) {
        throw new AuthenticationError(`Whoops something went wrong: ${err}`);
      }
    },
  },
};

module.exports = resolvers;
