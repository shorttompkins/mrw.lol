let Models = require('../../models')

module.exports = {
  getCommentsByPostId(req, res) {
    Models.Comment.find({ post_id: req.params.id }, (err, comments) => {
      res.json(comments)
    })
  }
}
