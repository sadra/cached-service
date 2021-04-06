import mongoose from 'mongoose';
require('dotenv').config();

/**
 * Connect to the in-memory database.
 */
export const connectDB = async () => {
  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  await mongoose.connect(
    `mongodb://localhost:${process.env.MONGO_DB_PORT}/${process.env.MONGO_TEST_DB_NAME}`,
    mongooseOpts,
  );
};

/**
 * Drop database, close the connection and stop mongod.
 */
export const closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
};

/**
 * Remove all the data for all db collections.
 */
export const clearDatabase = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};
