let Models = require('../../models')

module.exports = {
  list(req, res) {
    Models.Post.find({}, (err, posts) => {
      res.json(posts)
    })
  },

  getById(req, res) {
    Models.Post.find({_id: req.params.id}, (err, post) => {
      res.json(post[0])
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
        console.log('no posts found, seeding...')
        for (let s=0; s < 5; s +=1) {
          let newPost = new Models.Post({
            title: faker.company.catchPhrase(),
            blurb: faker.lorem.sentences(),
            body: faker.lorem.paragraphs() + faker.lorem.paragraphs() + faker.lorem.paragraphs()
          })
          newPost.save((err, newPost) => {
            console.log(`successfully inserted post: ${newPost._id}`)
            if (s === 0) {
              let holdPostID = newPost._id
              for (let c=0; c < 5; c += 1) {

                let newComment = new Models.Comment({
                  post_id: holdPostID,
                  email: faker.internet.email(),
                  name: `${faker.name.firstName()} ${faker.name.lastName()}`,
                  comment: faker.lorem.sentences(),
                  gravatar: faker.internet.avatar()
                })

                newComment.save((err, newComment) => {
                  console.log(`successfully inserted post comment: ${newComment._id}`);
                })
              }
            }
          })
        }

      } else {
        console.log(`found ${posts.length} existing posts!`)
      }
    })
    res.send('Success.')
  }
}
