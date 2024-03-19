import db from "./db/connection.js";

const resolvers = {
  Course: {
    id: (parent) => parent.id ?? parent._id,
  },
  Query: {
    async Course(_, { id }) {
      let collection = await db.collection("Courses");
      let query = { _id: new ObjectId(id) };

      return await collection.findOne(query);
    },
    async Courses(_, __, context) {
      let collection = await db.collection("Courses");
      const Courses = await collection.find({}).toArray();
      return Courses;
    },
  },
  Mutation: {
    async createCourse(_, { name, position, level }, context) {
      let collection = await db.collection("Courses");
      const insert = await collection.insertOne({ name, position, level });
      if (insert.acknowledged)
        return { name, position, level, id: insert.insertedId };
      return null;
    },
    async updateCourse(_, args, context) {
      const id = new ObjectId(args.id);
      let query = { _id: new ObjectId(id) };
      let collection = await db.collection("Courses");
      const update = await collection.updateOne(
        query,
        { $set: { ...args } }
      );

      if (update.acknowledged)
        return await collection.findOne(query);

      return null;
    },
    async deleteCourse(_, { id }, context) {
      let collection = await db.collection("Courses");
      const dbDelete = await collection.deleteOne({ _id: new ObjectId(id) });
      return dbDelete.acknowledged && dbDelete.deletedCount == 1 ? true : false;
    },
  },
};

export default resolvers;