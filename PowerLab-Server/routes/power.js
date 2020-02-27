const express = require('express')
const authCheck = require('../config/auth-check')
const Power = require('../models/Power')
const Review = require('../models/Review')

const router = new express.Router()

function validatePowerCreateForm (payload) {
  const errors = {}
  let isFormValid = true
  let message = ''

  payload.weight = parseInt(payload.weight)
  payload.price = parseFloat(payload.price)

  if (!payload || typeof payload.name !== 'string' || payload.name.length < 3) {
    isFormValid = false
    errors.name = 'Power name must be at least 3 symbols.'
  }

  if (!payload || payload.ingredients.length < 3 || payload.ingredients.indexOf(', ') > -1 || payload.ingredients === '') {
    isFormValid = false
    errors.ingredients = 'Ingredients must be at least 3 characters long and separated by comma.'
  }

  if (!payload || typeof payload.description !== 'string' || payload.description.length < 10 || payload.description.length > 200) {
    isFormValid = false
    errors.description = 'Description must be at least 10 symbols and less than 120 symbols.'
  }

  if (!payload || !payload.weight || payload.weight < 1 || payload.weight > 20000) {
    isFormValid = false
    errors.year = 'Weight must be between 1 and 20000 grams.'
  }

  if (!payload || !payload.price || payload.price < 0) {
    isFormValid = false
    errors.price = 'Price must be a positive number.'
  }

  if (!payload || typeof payload.image !== 'string' || !(payload.image.startsWith('https://') || payload.image.startsWith('http://')) || payload.image.length < 14) {
    isFormValid = false
    errors.image = 'Please enter valid Image URL. Image URL must be at least 14 symbols.'
  }

  if (!isFormValid) {
    message = 'Check the form for errors.'
  }

  return {
    success: isFormValid,
    message,
    errors
  }
}

router.get('/all', (req, res) => {
  Power
    .find()
    // .populate('reviews')
    .then(powers => {
      res.status(200).json(powers)
    })
})

router.post('/create', authCheck, (req, res) => {
  const powerObj = req.body
  if (req.user.roles.includes('Admin')) {
    const validationResult = validatePowerCreateForm(powerObj)
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors
      })
    }

    powerObj.ingredients = powerObj.ingredients.split(',').filter(i => i !== '')

    Power
      .create(powerObj)
      .then((createdPower) => {
        res.status(200).json({
          success: true,
          message: 'Power added successfully.',
          data: createdPower
        })
      })
      .catch((err) => {
        let message = 'Something went wrong :( Check the form for errors.'
        if (err.code === 11000) {
          message = 'Power with the given name already exists.'
        }
        return res.status(400).json({
          success: false,
          message: message
        })
      })
  } else {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials!'
    })
  }
})

router.post('/edit/:id', authCheck, (req, res) => {
  if (req.user.roles.includes('Admin')) {
    const powerId = req.params.id
    const powerObj = req.body
    const validationResult = validatePowerCreateForm(powerObj)
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors
      })
    }

    powerObj.ingredients = powerObj.ingredients.split(',').filter(i => i !== '')

    Power
      .findById(powerId)
      .then(existingPower => {
        existingPower.name = powerObj.name
        existingPower.ingredients = powerObj.ingredients
        existingPower.weight = powerObj.weight
        existingPower.description = powerObj.description
        existingPower.price = powerObj.price
        existingPower.image = powerObj.image

        existingPower
          .save()
          .then(editedPower => {
            res.status(200).json({
              success: true,
              message: 'Power edited successfully.',
              data: editedPower
            })
          })
          .catch((err) => {
            console.log(err)
            let message = 'Something went wrong :( Check the form for errors.'
            if (err.code === 11000) {
              message = 'Power with the given name already exists.'
            }
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
  } else {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials!'
    })
  }
})

router.delete('/delete/:id', authCheck, (req, res) => {
  const id = req.params.id
  if (req.user.roles.includes('Admin')) {
    Power
      .findById(id)
      .then((power) => {
        Review
          .deleteMany({
            _id: {
              '$in': power.reviews
            }
          })
          .then(() => {
            power
              .remove()
              .then(() => {
                return res.status(200).json({
                  success: true,
                  message: 'Power deleted successfully!'
                })
              })
          })
      })
      .catch(() => {
        return res.status(400).json({
          success: false,
          message: 'Entry does not exist!'
        })
      })
  } else {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials!'
    })
  }
})

router.post('/like/:id', authCheck, (req, res) => {
  const id = req.params.id
  const username = req.user.username
  Power
    .findById(id)
    .then(power => {
      if (!power) {
        const message = 'Product not found.'
        return res.status(400).json({
          success: false,
          message: message
        })
      }

      let likes = power.likes
      if (!likes.includes(username)) {
        likes.push(username)
      }
      power.likes = likes
      power
        .save()
        .then((power) => {
          res.status(200).json({
            success: true,
            message: 'Product liked successfully.',
            data: power
          })
        })
        .catch((err) => {
          console.log(err)
          const message = 'Something went wrong :('
          return res.status(400).json({
            success: false,
            message: message
          })
        })
    })
    .catch((err) => {
      console.log(err)
      const message = 'Something went wrong :('
      return res.status(400).json({
        success: false,
        message: message
      })
    })
})

router.post('/unlike/:id', authCheck, (req, res) => {
  const id = req.params.id
  const username = req.user.username
  Power
    .findById(id)
    .then(power => {
      if (!power) {
        let message = 'Product not found.'
        return res.status(400).json({
          success: false,
          message: message
        })
      }

      let likes = power.likes
      if (likes.includes(username)) {
        const index = likes.indexOf(username)
        likes.splice(index, 1)
      }

      power.likes = likes
      power
        .save()
        .then((power) => {
          res.status(200).json({
            success: true,
            message: 'Product unliked successfully.',
            data: power
          })
        })
        .catch((err) => {
          console.log(err)
          const message = 'Something went wrong :('
          return res.status(400).json({
            success: false,
            message: message
          })
        })
    })
    .catch((err) => {
      console.log(err)
      const message = 'Something went wrong :('
      return res.status(400).json({
        success: false,
        message: message
      })
    })
})

module.exports = router
