import { ConnectionOptions, connect } from 'mongoose';
require('dotenv').config();

const connectDB = async () => {
  try {
    const mongoURI: string = `mongodb://localhost:${process.env.MONGO_DB_PORT}/${process.env.MONGO_DB_NAME}`;
    const options: ConnectionOptions = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    };
    await connect(mongoURI, options);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;
