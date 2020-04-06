import * as yup from "yup";
import { generateResponse, formatYupError } from "./utils/utils";

const schema = yup.object().shape({
  firstName: yup
    .string()
    .min(3)
    .max(255),
  lastName: yup
    .string()
    .min(3)
    .max(255),
  email: yup
    .string()
    .min(3)
    .max(255)
    .email()
});

export default {
  Author: {
    posts: (parent, args, context, info) => parent.getPosts()
  },
  Post: {
    author: (parent, args, context, info) => parent.getAuthor()
  },
  Query: {
    posts: (parent, args, { db }, info) => db.post.findAll(),
    authors: (parent, args, { db }, info) => db.author.findAll(),
    post: (parent, { id }, { db }, info) => db.post.findByPk(id),
    author: (parent, { id }, { db }, info) => db.author.findByPk(id)
  },
  Mutation: {
    createAuthor: async (parent, args, { db }, info) => {
      try {
        await schema.validate(args, { abortEarly: false });
        const { firstName, lastName, email } = args;
        const res = db.author.create({
          firstName: firstName,
          lastName: lastName,
          email: email
        });
        if (res){
          return generateResponse(200, true, `Author created successfully`);
        }
      } catch (err) {
        return generateResponse(422, false, formatYupError(err));
      }
    },
    createPost: (parent, { title, content, authorId }, { db }, info) =>
      db.post.create({
        title: title,
        content: content,
        authorId: authorId
      }),
    updatePost: (parent, { title, content, id }, { db }, info) =>
      db.post.update(
        {
          title: title,
          content: content
        },
        {
          where: {
            id: id
          }
        }
      ),
    deletePost: (parent, { id }, { db }, info) =>
      db.post.destroy({
        where: {
          id: id
        }
      })
  }
};