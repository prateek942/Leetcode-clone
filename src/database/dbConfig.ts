import mongoose from "mongoose";
import dns from "dns";

try {
    dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
    // Ignore in unsupported environments
}

const connectDB = async () => {
    if (mongoose.connections[0]?.readyState) {
        return;
    }
    try {
        await mongoose.connect(process.env.MONGO_URL!);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
    }
};

export default connectDB;