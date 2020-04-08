module.exports = {
  Post: {
    author: (parent, args, context, info) => parent.getAuthor(),
  },
  Query: {
    posts: (parent, args, { db }, info) => db.post.findAll(),
    post: (parent, { id }, { db }, info) => db.post.findByPk(id),
  },
  Mutation: {
    createPost: (parent, { title, content, authorId }, { db }, info) =>
      db.post.create({
        title: title,
        content: content,
        authorId: authorId,
      }),
    updatePost: (parent, { title, content, id }, { db }, info) =>
      db.post.update(
        {
          title: title,
          content: content,
        },
        {
          where: {
            id: id,
          },
        }
      ),
    deletePost: (parent, { id }, { db }, info) =>
      db.post.destroy({
        where: {
          id: id,
        },
      }),
  },
};
