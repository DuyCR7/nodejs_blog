const Course = require('../models/Course');

class SiteController {
    // [GET] /
    async index(req, res) {
        // res.render('home');
        try {
            const courses = await Course.find({});
            res.json(courses);
        } catch (err) {
            res.status(400).json({error: "Lỗi!!!"})
        }
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
