import mongoose from 'mongoose';

export async function connectToDatabase(uri) {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('✅ Connected to MongoDB Atlas');
    } catch (err) {
        console.error('❌ Error connecting to MongoDB:', err.message);
        process.exit(1);
    }
}
