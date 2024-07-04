// import mongoose from "mongoose";

// async function connectDB() {
//   try {
//     mongoose.set("strictQuery", false);
//     await mongoose.connect(process.env.MONGO_URL!);
//     console.log("connected with server");
//   } catch (error: any) {
//     console.log(error.message);
//   }
// }

// export default connectDB;

// import mongoose from "mongoose";

// type connectionObject = {
//   isConnected?: Number;
// };

// const connection: connectionObject = {};
// async function connectDB(): Promise<void> {
//   if (connection.isConnected) {
//     console.log("Already connected to database");
//   }
//   try {
//     mongoose.set("strictQuery", false);
//     let db = await mongoose.connect(process.env.MONGO_URL || "", {});
//     console.log("connected with server");
//   } catch (error: any) {
//     console.log("Database connection is failed", error);
//     process.exit(1);
//   }
// }

// export default connectDB;


import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  // Check if we have a connection to the database or if it's currently connecting
  if (connection.isConnected) {
    console.log("Already connected to the database");
    return;
  }

  try {
    // Attempt to connect to the database
    const db = await mongoose.connect(process.env.MONGO_URL || "", {});

    connection.isConnected = db.connections[0].readyState;

    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);

    // Graceful exit in case of a connection error
    process.exit(1);
  }
}

export default dbConnect;