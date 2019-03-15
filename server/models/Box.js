const mongoose = require('mongoose')

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'

let boxSchema = new mongoose.Schema({
  text: {type: mongoose.Schema.Types.String, required: REQUIRED_VALIDATION_MESSAGE},
  newText : {type: mongoose.Schema.Types.String, required: false },
  position: {type: mongoose.Schema.Types.String, unique: true, default: "first"}
})

let Box = mongoose.model('Box', boxSchema)

module.exports = Box