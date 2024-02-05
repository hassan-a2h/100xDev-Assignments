const mongoose = require('mongoose');
const { SchemaTypes } = mongoose;

// Connect to MongoDB
mongoose.connect('mongodb+srv://user_1122:1122@0123.hgnbueb.mongodb.net/course_store?retryWrites=true&w=majority');

// Define schemas
const AdminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const CourseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    published: {
        type: Boolean,
        default: false
    },
    imageUrl: {
        type: String,
        required: true,
        // validate: {
        //     validator: (value) => {
        //         const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
        //         return urlRegex.test(value);
        //     },
        //     message: props => `${props.value} is not a valid URL for an image!`
        // }
    }
});

const purchasedCourseSchema = new mongoose.Schema({
    user: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    course: {
        type: SchemaTypes.ObjectId,
        ref: 'Course',
        required: true
    }
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);
const PurchasedCourse = mongoose.model('PurchasedCourse', purchasedCourseSchema);

module.exports = {
    Admin,
    User,
    Course,
    PurchasedCourse
}