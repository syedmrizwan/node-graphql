import * as yup from "yup";
import { generateResponse, formatYupError } from "../../utils/utils";

const schema = yup.object().shape({
  firstName: yup.string().min(3).max(255),
  lastName: yup.string().min(3).max(255),
  email: yup.string().min(3).max(255).email(),
});

module.exports = {
  Author: {
    posts: (parent, args, context, info) => parent.getPosts(),
  },
  Query: {
    authors: (parent, args, { db }, info) => db.author.findAll(),
    author: (parent, { id }, { db }, info) => db.author.findByPk(id),
  },
  Mutation: {
    createAuthor: async (parent, args, { db }, info) => {
      try {
        await schema.validate(args, { abortEarly: false });
        const { firstName, lastName, email } = args;
        const res = db.author.create({
          firstName: firstName,
          lastName: lastName,
          email: email,
        });
        if (res) {
          return generateResponse(200, true, `Author created successfully`);
        }
      } catch (err) {
        return generateResponse(422, false, formatYupError(err));
      }
    },
  },
};
