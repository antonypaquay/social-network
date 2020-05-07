const Feed = require('../models/Feed');

exports.createFeed = (req, res, next) => {
    const newFeed = new Feed({
        ...req.body.data
    });
    newFeed.save((err) => {
        if (err) return handleError(err);
        // saved!
    });
    console.log(newFeed);
    next();

}

exports.getAllFeed = (req, res, next) => {
    Feed.find()
        .then(feeds => res.status(200).json(feeds))
        .catch(err => res.status(400).json({err}));
}