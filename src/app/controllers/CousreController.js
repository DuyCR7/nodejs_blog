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
}

module.exports = new CousreController();
