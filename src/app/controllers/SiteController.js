const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');

class SiteController {
    // [GET] /
    async index(req, res, next) {

        // try {
        //     const courses = await Course.find({});
        //     res.json(courses);
        // } catch (err) {
        //     res.status(400).json({error: "Lỗi!!!"})
        // }

        // Promise
        Course.find({})
            .then(courses => {
                res.render('home', {
                    courses: multipleMongooseToObject(courses) // convert lại
                });
            })
            .catch(error => next(error));

        // res.render('home');
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
