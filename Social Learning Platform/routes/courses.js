var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var User = require('../models/user');
var Course = require('../models/course');

router.get('/', function (req, res, next) {
    Course.find()
        .populate('user', 'firstName')
        .exec(function (err, courses) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            //console.log(courses.user.firstName);
            res.status(200).json({
                message: 'Success',
                obj: courses
            });
            //console.log(courses.user.lastName);
        });
});

router.get('/courses', function(req, res) {
    var courseName = req.query.search;
    console.log(req.query.search);
    router.log(courseName);
});

router.use('/', function (req, res, next) {
    jwt.verify(req.query.token, 'secret', function (err, decoded) {
        if (err) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: err
            });
        }
        next();
    })
});

router.post('/', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        var course = new Course({
            courseName: req.body.courseName,
            instructorName: req.body.instructorName,
            description: req.body.description,
            imagePath: req.body.imagePath,
            user: user
        });
        course.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            user.courses.push(result);
            user.save();
            res.status(201).json({
                message: 'Saved Course',
                obj: result
            });
        });
    });
});

router.patch('/:id', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    Course.findById(req.params.id, function (err, course) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!course) {
            return res.status(500).json({
                title: 'No Course Found!',
                error: {message: 'Course not found'}
            });
        }
        if (course.user != decoded.user._id) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: {message: 'Users do not match'}
            });
        }
        course.courseName = req.body.courseName;
        course.instructorName = req.body.instructorName;
        course.description = req.body.description;
        course.imagePath = req.body.imagePath;
        course.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Updated course',
                obj: result
            });
        });
    });
});

router.delete('/:id', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    Course.findById(req.params.id, function (err, course) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!course) {
            return res.status(500).json({
                title: 'No Course Found!',
                error: {message: 'Course not found'}
            });
        }
        if (course.user != decoded.user._id) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: {message: 'Users do not match'}
            });
        }
        course.remove(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Deleted Course',
                obj: result
            });
        });
    });
});

module.exports = router;
