const { Base, User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const dotenv = require("dotenv");
const Property = require("../models/Property");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_SK);

const resolvers = {
  Query: {
    base: async () => {
      return Base.find({});
    },
    singleBase: async (parent, { _id }) => {
      return Base.findById(_id);
    },
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
      return User.findOne({ username });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      // const order = new Order({ products: "testProduct" });
      const line_items = [];

      // const { products } = await order.populate('products');
      // let product;
      // let price;
      // try {
      //   product = await stripe.products.create({
      //     name: "testProduct",
      //     description: "testy",
      //   });
      // } catch (err) {
      //   console.log(err);
      // }
      // try {
      //   price = await stripe.prices.create({
      //     product: product,
      //     unit_amount: 100,
      //     // currency: "usd",
      //   });
      // } catch (err) {
      //   console.log(err);
      // }

      try {
        const session = await stripe.checkout.sessions.create({
          // payment_method_types: ["card"],
          line_items: [
            {
              name: "testProduct",
              description: "this is a description",
              amount: 1000,
              quantity: 1,
              currency: "cny",
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

    createBase: async (_parent, { name }) => {
      try {
        const newBase = await Base.create({ name });
        return newBase;
      } catch (err) {
        throw new AuthenticationError(`Whoops something went wrong: ${err}`);
      }
    },

    createProperty: async (
      parent,
      { title, description, address, price, bedroom, bathroom }
    ) => {
      try {
        const newProperty = await Property.create({
          title,
          description,
          address,
          price,
          bedroom,
          bathroom,
        });
        return newProperty;
      } catch (err) {
        throw new AuthenticationError(`Whoops something went wrong: ${err}`);
      }
    },
  },
};

module.exports = resolvers;
