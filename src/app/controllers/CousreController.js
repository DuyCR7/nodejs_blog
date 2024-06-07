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
            req.body.image = 'https://files.fullstack.edu.vn/f8-prod/courses/6.png';
            const course = new Course(req.body);
            await course.save();
            // res.status(201).json({ message: 'Course created successfully', course });
            res.redirect('/me/stored/courses');
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server error, please try again later' });
        }
    }

    // [GET] /courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then(course => {
                res.render('courses/edit', { course: mongooseToObject(course) });
            })
            .catch(next);
    }

    // [PUT] /courses/:id
    update(req, res, next) {
        // res.json(req.body);
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }

    // [DELETE] /courses/:id
    destroy(req, res, next) {
        Course.delete({ _id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [DELETE] /courses/:id/force
    forceDestroy(req, res, next) {
        Course.deleteOne({ _id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [PATCH] /courses/:id/restore
    restore(req, res, next) {
        Course.restore({ _id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
    }
}

module.exports = new CousreController();
