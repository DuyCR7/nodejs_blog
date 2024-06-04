const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1/blog');
        console.log('Connected to DB successfully!');
    } catch (error) {
        console.log('Connected to DB failure!');
    }
}

module.exports = { connect };
