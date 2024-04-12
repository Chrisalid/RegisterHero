import mongoose from 'mongoose';
const { Schema } = mongoose;

const heroSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    secretName: {
        type: String,
        required: true
    },
    gender: {
        type: Boolean,
        required: true
    },
    birthDate: Date,
    superPowers: {
        type: [String],
        required: true
    }
});

const Hero = mongoose.model('Hero', heroSchema)

export default Hero