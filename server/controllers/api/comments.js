let Models = require('../../models')
let faker = require('faker')

module.exports = {
  getCommentsByPostId(req, res) {
    Models.Comment.find({ post_id: req.params.id }, (err, comments) => {
      res.json(comments)
    })
  },
  createNewComment(req, res) {
    Models.Post.findOne({ _id: req.params.id }, (err, post) => {
      let newComment = new Models.Comment({
        post_id: post._id,
        email: req.body.email,
        name: req.body.name,
        comment: req.body.comment,
        gravatar: faker.internet.avatar()
      })

      newComment.save((err, newComment) => {
        res.json({success: true, comment: newComment })
      })
    })

  }
}
