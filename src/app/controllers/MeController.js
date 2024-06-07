const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');

class MeController {

    // [GET] /me/stored/courses
    storedCourses(req, res, next) {

        Promise.all([
            Course.find({}),
            Course.countDocumentsWithDeleted({ deleted: true })
        ])
        .then(([courses, deletedCount]) => {
            res.render('me/stored-courses', {
                deletedCount: deletedCount,
                courses: multipleMongooseToObject(courses),
            })
        })
        .catch(next);

        // Course.countDocumentsWithDeleted({ deleted: true})
        //     .then((deletedCount) => {
        //         console.log(deletedCount);
        //     })
        //     .catch(() => {});

        // Course.find({})
        //     .then(function(courses){
        //         res.render('me/stored-courses', {courses: multipleMongooseToObject(courses)});
        //     })
        //     .catch(next);
    }

    // [GET] /me/trash/courses
    trashCourses(req, res, next) {
        Course.findWithDeleted({ deleted: true })
            .then(function(courses){
                res.render('me/trash-courses', {courses: multipleMongooseToObject(courses)});
            })
            .catch(next);
    }
}

module.exports = new MeController();
