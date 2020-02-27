const express = require('express')
const authCheck = require('../config/auth-check')
const Power = require('../models/Power')
const Review = require('../models/Review')

const router = new express.Router()

router.get('/all', (req, res) => {
  Review
    .find({})
    .then(reviews => {

      if (!reviews) {
        return res.status(400).json({
          success: false,
          message: 'Reviews not found.'
        })
      }

      res.status(200).json(reviews)

    }).catch(err => {
      return res.status(400).json({
        success: false,
        message: `Get Reviews error: ${err}`
      })
    })
})

router.post('/create/:powerId', authCheck, (req, res) => {
  const powerId = req.params.powerId
  const review = req.body.review
  const username = req.user.username

  if (review.length < 4) {
    const message = 'Review must be at least 4 characters long.'
    return res.status(400).json({
      success: false,
      message: message
    })
  }

  Power
    .findById(powerId)
    .then(power => {
      if (!power) {
        return res.status(400).json({
          success: false,
          message: 'Product not found.'
        })
      }

      let reviewObj = {
        reviewText: review,
        creatorUsername: username
      }

      Review
        .create(reviewObj)
        .then(review => {
          let reviews = power.reviews
          reviews.push(review._id)
          power.reviews = reviews
          power
            .save()
            .then(() => {
              res.status(200).json({
                success: true,
                message: 'Review added successfully.',
                data: review
              })
            })
            .catch((err) => {
              console.log(err)
              const message = 'Something went wrong :( Check the form for errors.'
              return res.status(400).json({
                success: false,
                message: message
              })
            })
        })
        .catch((err) => {
          console.log(err)
          const message = 'Something went wrong :( Check the form for errors.'
          return res.status(400).json({
            success: false,
            message: message
          })
        })
    })
    .catch((err) => {
      console.log(err)
      const message = 'Something went wrong :( Check the form for errors.'
      return res.status(400).json({
        success: false,
        message: message
      })
    })
})

router.post('/edit/:reviewId', authCheck, (req, res) => {
  const reviewId = req.params.reviewId
  const reviewText = req.body.reviewText

  Review
    .findById(reviewId)
    .then((review) => {

      if (req.user.username !== review.creatorUsername) {
        return res.status(401).json({
          success: false,
          message: 'Only creator can edit this post!'
        })
      }

      review.reviewText = reviewText

      review
        .save()
        .then((review) => {
          return res.status(200).json({
            success: true,
            message: 'Review comment edited successfully!',
            data: review
          })

        }).catch((err) => {
          return res.status(400).json({
            success: false,
            message: `Review edit error: ${err}`
          })
        })

    }).catch(() => {
      return res.status(400).json({
        success: false,
        message: 'Review does not exist!'
      })
    })

})

router.delete('/delete/:powerId/:reviewId', authCheck, (req, res) => {
  const powerId = req.params.powerId
  const reviewId = req.params.reviewId

  Review
    .findById(reviewId)
    .then((review) => {

      if (req.user.username === review.creatorUsername || req.user.roles.includes('Admin')) {

        Power
          .findById(powerId)
          .then((power) => {

            const revId = power.reviews.filter(r => r.toString() === reviewId)
            if (!revId) {

              return res.status(400).json({
                success: false,
                message: 'Power-ReviewID does not exist!'
              })
            }

            const reviews = power.reviews.filter(r => r.toString() !== reviewId)

            power.reviews = reviews
            power
              .save()
              .then(() => {

                review.remove()
                  .then(() => {
                    return res.status(200).json({
                      success: true,
                      message: 'Review comment deleted successfully!',
                    })
                  }).catch(() => {
                    return res.status(400).json({
                      success: false,
                      message: 'Power-Review delete error'
                    })
                  })


              }).catch(() => {
                return res.status(400).json({
                  success: false,
                  message: 'Power-Review delete error'
                })
              })

          }).catch((err) => {
            return res.status(400).json({
              success: false,
              message: `Power-Review error: ${err}`
            })
          })

      } else {

        return res.status(401).json({
          success: false,
          message: 'Only creator can delete this post!'
        })
      }

    }).catch(() => {
      return res.status(400).json({
        success: false,
        message: 'Review Entry does not exist!'
      })
    })

})

module.exports = router
