const mongoose = require('mongoose')

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'

let boxSchema = new mongoose.Schema({
  text: {type: mongoose.Schema.Types.String, required: REQUIRED_VALIDATION_MESSAGE}
})

let Box = mongoose.model('Box', boxSchema)

module.exports = Box