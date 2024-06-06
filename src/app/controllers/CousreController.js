const Course = require('../models/Course');
const { mongooseToObject } = require('../../util/mongoose');

class CousreController {

    // [GET] /courses/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then(course => {
                res.render('courses/show', { course: mongooseToObject(course) });
            })
            .catch(next);
        // res.send('show: ' + req.params.slug); // định nghĩa là gì thì phải viết giống
    }

    // [GET] /courses/create
    create(req, res, next) {
        res.render('courses/create');
    }

    // [POST] /courses/store
    async store(req, res, next) {
        try {
            const formData = req.body;
            formData.image = 'https://files.fullstack.edu.vn/f8-prod/courses/6.png';
            const course = new Course(formData);
            await course.save();
            // res.status(201).json({ message: 'Course created successfully', course });
            res.redirect('/');
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server error, please try again later' });
        }
    }
}

module.exports = new CousreController();
