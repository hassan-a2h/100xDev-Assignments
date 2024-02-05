const { Router, application } = require("express");
const { Admin, User, Course } = require('../db/index');
const z = require('zod');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const adminMiddleware = require("../middleware/admin");
const SECRET = 'Rana';

const router = Router();
router.use(cookieParser());

const adminSchema = z.object({
    username: z.string().email(),
    password: z.string().min(8)
});

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const { username, password } = req.headers;
    const validFields = adminSchema.safeParse({ username, password }).success;

    if (!validFields) {
        return res
            .status(401)
            .send('Input fields are not valid');
    }

    try {
        const admin = new Admin({
            username,
            password
        });

        const savedAdmin = await admin.save();

        res
        .status(200)
        .send('New admin inserted! - ' + savedAdmin);
    } catch(err) {
        return res
            .status(401)
            .send('Could not save record');
    };
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const { title, 
        description, 
        price,
        published,
        imageUrl} = req.body;

    try {
        const course = await Course.create({
            title,
            description,
            price,
            published,
            imageUrl
        });

        res
            .status(200)
            .json({ course });
    } catch(err) {
        console.error('Could not save record - ' + err);
        res
            .status(401)
            .send('Could not save record - ' + err);
    }
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    try {
        const courses = await Course.find({});

        if (courses.length === 0) {
            return res
                .status(200)
                .send('No courses found');
        }
    
        res 
            .status(200)
            .json(courses);
    } catch(err) {
        console.log('Could not fetch courses - ' + err);
        res 
            .status(400)
            .send('error, could not fetch courses');
    }
});

router.post('/signin', async (req, res) => {
    const user = await Admin.findOne({username: req.body.username});

    if (!user || req.body.password !== user.password) {
        return res
            .status(404)
            .send('Invalid username or password');
    }

    const token = jwt.sign({ user }, SECRET);

    res.cookie('authorization', 'Bearer ' + token, { httpOnly: true });

    console.log(token);

    res
        .status(200)
        .send('successfully signed in');
});

router.get('/signout', adminMiddleware, async (req, res) => {
    res.clearCookie('authorization');

    return res
        .status(200)
        .send('signed out successfully');
});

module.exports = router;