const express = require('express')
const authCheck = require('../config/auth-check')
const Box = require('../models/Box')

const router = new express.Router()

function validateBoxCreateForm(payload) {
  const errors = {}
  let isFormValid = true
  let message = ''

  payload.price = parseFloat(payload.price)

  if (!payload || typeof payload.title !== 'string' || payload.title.length < 3) {
    isFormValid = false
    errors.name = 'Box name must be at least 3 symbols.'
  }

  if (!payload || typeof payload.description !== 'string' || payload.description.length < 10 || payload.description.length > 200) {
    isFormValid = false
    errors.description = 'Description must be at least 10 symbols and less than 120 symbols.'
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

router.post('/box', authCheck, (req, res) => {

  if (req.user.roles.indexOf('Admin') > -1) {
    const { text, newText, position } = req.body;

    Box
    .findOne({position: position})
    .then(box => {
      if (!box) {
        const message = 'Box not found.'
        return res.status(200).json({
          success: false,
          message: message
        })
      }

      box.text = newText
      box
        .save()
        .then(() => {
          res.status(200).json({
            success: true,
            message: 'Box updated successfully.'
          })
        })
      })
      .catch((err) => {
        console.log(err)
        let message = 'Something went wrong :( Check the form for errors.'
        if (err.code === 11000) {
          message = 'Bo with the given name already exists.'
        }
        return res.status(200).json({
          success: false,
          message: message
        })
      })
  } else {
    return res.status(200).json({
      success: false,
      message: 'Invalid credentials!'
    })
  }
})

// router.post('/box', authCheck, (req, res) => {
//   const { text, newText } = req.body;
//   //const product = req.body;
//   let orderObj = {
//     text,
//     newText
//   }
//   let textUpdate = {
//     newText
//   }

//   Box
//     .create(orderObj)
//     .then((createdOrder) => {
//       res.status(200).json({
//         success: true,
//         message: 'Box updated successfully.',
//         data: createdOrder
//       })
//     })
//     .catch((err) => {
//       console.log(err)
//       const message = 'Something went wrong :('
//       return res.status(200).json({
//         success: false,
//         message: message
//       })
//     })
// })

router.post('/edit/:id', authCheck, (req, res) => {
  if (req.user.roles.indexOf('Admin') > -1) {
    const BoxId = req.params.id
    const BoxObj = req.body
    const validationResult = validateBoxCreateForm(BoxObj)
    if (!validationResult.success) {
      return res.status(200).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors
      })
    }

    Box
      .findById(BoxId)
      .then(existingBox => {
        existingBox.title = BoxObj.title
        existingBox.author = BoxObj.author
        existingBox.genres = BoxObj.genres
        existingBox.description = BoxObj.description
        existingBox.price = BoxObj.price
        existingBox.image = BoxObj.image

        existingBox
          .save()
          .then(editedBox => {
            res.status(200).json({
              success: true,
              message: 'Box edited successfully.',
              data: editedBox
            })
          })
          .catch((err) => {
            console.log(err)
            let message = 'Something went wrong :( Check the form for errors.'
            if (err.code === 11000) {
              message = 'Box with the given name already exists.'
            }
            return res.status(200).json({
              success: false,
              message: message
            })
          })
      })
      .catch((err) => {
        console.log(err)
        const message = 'Something went wrong :( Check the form for errors.'
        return res.status(200).json({
          success: false,
          message: message
        })
      })
  } else {
    return res.status(200).json({
      success: false,
      message: 'Invalid credentials!'
    })
  }
})

router.get('/box', (req, res) => {
  Box
    .find()
    .then(box => {
      res.status(200).json(box)
    })
    .catch((err) => {
      console.log(err)
      let message = 'Something went wrong :( Check the form for errors.'
      // if (err.code === 11000) {
      //   message = 'Bo with the given name already exists.'
      // }
      return res.status(200).json({
        success: false,
        message: message
      })
    })

})

router.post('/review/:id', authCheck, (req, res) => {
  const id = req.params.id
  const review = req.body.review
  const username = req.user.username

  if (review.length < 4) {
    const message = 'Review must be at least 4 characters long.'
    return res.status(200).json({
      success: false,
      message: message
    })
  }

  Box
    .findById(id)
    .then(Box => {
      if (!Box) {
        return res.status(200).json({
          success: false,
          message: 'Product not found.'
        })
      }

      let reviewObj = {
        review,
        createdBy: username
      }

      let reviews = Box.reviews
      reviews.push(reviewObj)
      Box.reviews = reviews
      Box
        .save()
        .then((Box) => {
          res.status(200).json({
            success: true,
            message: 'Review added successfully.',
            data: Box
          })
        })
        .catch((err) => {
          console.log(err)
          const message = 'Something went wrong :( Check the form for errors.'
          return res.status(200).json({
            success: false,
            message: message
          })
        })
    })
    .catch((err) => {
      console.log(err)
      const message = 'Something went wrong :( Check the form for errors.'
      return res.status(200).json({
        success: false,
        message: message
      })
    })
})

router.post('/like/:id', authCheck, (req, res) => {
  const id = req.params.id
  const username = req.user.username
  Box
    .findById(id)
    .then(Box => {
      if (!Box) {
        const message = 'Product not found.'
        return res.status(200).json({
          success: false,
          message: message
        })
      }

      let likes = Box.likes
      if (!likes.includes(username)) {
        likes.push(username)
      }
      Box.likes = likes
      Box
        .save()
        .then((Box) => {
          res.status(200).json({
            success: true,
            message: 'Box liked successfully.',
            data: Box
          })
        })
        .catch((err) => {
          console.log(err)
          const message = 'Something went wrong :('
          return res.status(200).json({
            success: false,
            message: message
          })
        })
    })
    .catch((err) => {
      console.log(err)
      const message = 'Something went wrong :('
      return res.status(200).json({
        success: false,
        message: message
      })
    })
})

router.post('/unlike/:id', authCheck, (req, res) => {
  const id = req.params.id
  const username = req.user.username
  Box
    .findById(id)
    .then(Box => {
      if (!Box) {
        let message = 'Product not found.'
        return res.status(200).json({
          success: false,
          message: message
        })
      }

      let likes = Box.likes
      if (likes.includes(username)) {
        const index = likes.indexOf(username)
        likes.splice(index, 1)
      }

      Box.likes = likes
      Box
        .save()
        .then((Box) => {
          res.status(200).json({
            success: true,
            message: 'Product unliked successfully.',
            data: Box
          })
        })
        .catch((err) => {
          console.log(err)
          const message = 'Something went wrong :('
          return res.status(200).json({
            success: false,
            message: message
          })
        })
    })
    .catch((err) => {
      console.log(err)
      const message = 'Something went wrong :('
      return res.status(200).json({
        success: false,
        message: message
      })
    })
})

router.delete('/delete/:id', authCheck, (req, res) => {
  const id = req.params.id
  if (req.user.roles.indexOf('Admin') > -1) {
    Box
      .findById(id)
      .then((Box) => {
        Box
          .remove()
          .then(() => {
            return res.status(200).json({
              success: true,
              message: 'Box deleted successfully!'
            })
          })
      })
      .catch(() => {
        return res.status(200).json({
          success: false,
          message: 'Entry does not exist!'
        })
      })
  } else {
    return res.status(200).json({
      success: false,
      message: 'Invalid credentials!'
    })
  }
})

module.exports = router
