import { Schema, model } from 'mongoose'
import Student from '../controller/Student'

const StudentSchema = new Schema({
  numericId: {
    type: Number,
    required: true,
  },

  fName: {
    type: String,
    required: true,
  },

  lName: {
    type: String,
    required: true,
  },

  major: {
    type: String,
    required: true,
  },

  grade: {
    type: Number,
    required: true,
  },

  entrance: {
    type: Number,
    required: true,
  },

  department: {
    type: Schema.Types.ObjectId,
    required: true,
  },
})

const StudentModel = model('Student', StudentSchema)
export default StudentModel
