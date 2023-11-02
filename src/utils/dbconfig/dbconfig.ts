/* eslint-disable import/no-extraneous-dependencies */
import mongoose from 'mongoose';

const URI = 'mongodb+srv://admin:admin@clusterzaki.h60y1ob.mongodb.net/test?retryWrites=true&w=majority'
export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI || URI);
        const { connection } = mongoose;

        connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        })

        connection.on('error', (err: string) => {
            console.log('MongoDB connection error. Please make sure MongoDB is running. ', err);
            process.exit();
        })

    } catch (error) {
        console.log('Something goes wrong!');
        console.log(error);

    }


}