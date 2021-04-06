import mongoose, { ConnectionOptions, connect } from 'mongoose';

/**
 * Connect to the in-memory database.
 */
export const connectDB = async () => {
  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  await mongoose.connect('mongodb://localhost:27017/test', mongooseOpts);
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
