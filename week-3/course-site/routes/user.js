const { Router } = require("express");
const cookieParser = require('cookie-parser');
const router = Router();
const { User, Course, PurchasedCourse } = require('../db/index');
const userMiddleware = require("../middleware/user");
const z = require('zod');
const jwt = require('jsonwebtoken');
const SECRET = 'Rana';

router.use(cookieParser());
// router.use('/purchasedCourses', userMiddleware);
// router.use('/courses/:courseId', userMiddleware);

const userSchema = z.object({
    username: z.string().email(),
    password: z.string().min(8)
});

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const { username, password } = req.headers;
    const validFields = userSchema.safeParse({ username, password }).success;

    if (!validFields) {
        return res
            .status(401)
            .send('Input fields are not valid');
    }

    try {
        const user = new User({
            username,
            password
        });

        const savedUser = await user.save();

        res
        .status(200)
        .send('New user inserted! - ' + savedUser);
    } catch(err) {
        return res
            .status(401)
            .send('Could not save record');
    };
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    try {
        const courses = await Course.find({ published: true });

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

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const { username } = req;
    const { courseId } = req.params;

    try {
        const user = await User.findOne({ username });
        const course = await Course.findOne({_id: courseId});

        if (!course) {
            return res
                .status(401)
                .send('Course not found')
        }

        const pCourse = await PurchasedCourse.create({ user: user._id, course: course._id});

        res
            .status(200)
            .send('Course Purchased - ' + pCourse);
    } catch (err) {
        console.log('Error, failed to establish db connection - ' + err);

        res
            .status(500)
            .json(err);
    }
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const { username } = req;

    try {
        const user = await User.findOne({username});
        const purchasedCourses = await PurchasedCourse.find({user: user._id});

        if (purchasedCourses.length === 0) {
            return res
                .status(200)
                .send('No courses purchased');
        }
    
        res 
            .status(200)
            .json(purchasedCourses);
    } catch(err) {
        console.log('Could not fetch courses - ' + err);
        res 
            .status(400)
            .send('error, could not fetch courses');
    }
});


router.post('/signin', async (req, res) => {
    const user = await User.findOne({username: req.body.username});

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

router.get('/signout', userMiddleware, async (req, res) => {
    res.clearCookie('authorization');

    return res
        .status(200)
        .send('signed out successfully');
});

module.exports = router