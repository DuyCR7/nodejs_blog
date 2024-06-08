const Course = require('../../models/Course');
const { multipleMongooseToObject } = require('../../../util/mongoose');

class MeController {

    // [GET] /me/stored/courses
    storedCourses(req, res, next) {

        Promise.all([
            Course.find({}),
            Course.countDocumentsWithDeleted({ deleted: true })
        ])
        .then(([courses, deletedCount]) => {
            res.json({
                courses: multipleMongooseToObject(courses),
                deletedCount: deletedCount,
                api: 'Test API'
            })
        })
        .catch(next);
    }

    // [GET] /me/trash/courses
    trashCourses(req, res, next) {
        Course.findWithDeleted({ deleted: true })
            .then(function(courses){
                res.json({
                    courses: multipleMongooseToObject(courses),
                })
            })
            .catch(next);
    }
}

module.exports = new MeController();
