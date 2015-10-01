let Models = require('../../models')

module.exports = {
  list(req, res) {
    Models.Post.find({}, (err, posts) => {
      res.json(posts)
    })
  },

  getById(req, res) {
    Models.Post.find({_id: req.params.id}, (err, post) => {
      res.json(post)
    })
  },

  insert(req, res) {
    let newPost = Models.Post({

    })

    newPost.save((err, newPost) => {
      if (!err) {
        res.json(newPost)
      } else {
        res.status(400).json({error: 'There was an error saving the post.'})
      }
    })
  },

  seed(req, res) {
    let faker = require('faker')

    Models.Post.find({}, (err, posts) => {
      if (posts.length === 0) {
        console.log('no posts found, seeding...');
        for (let s=0; s < 5; s +=1) {
          let newPost = new Models.Post({
            title: faker.company.catchPhrase(),
            blurb: faker.lorem.sentences()
          })
          newPost.save((err, newPost) => console.log(`successfully inserted post: ${newPost._id}`))
        }

      } else {
        console.log(`found ${posts.length} existing posts!`)
      }
    })
    res.send('Success.')
  }
}
