var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('./user');

var schema = new Schema({
    courseName: {type: String, required: true},
    instructorName: {type: String, required: true},
    description: {type: String, required: true},
    imagePath: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User'}
}, {collection:'courses'});

schema.post('remove', function (course) {
    User.findById(course.user, function (err, user) {
        user.courses.pull(course);
        user.save();
    });
});

module.exports = mongoose.model('Course', schema);