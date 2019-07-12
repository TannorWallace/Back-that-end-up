import mongoose from 'mongoose'

let ObjectId = mongoose.Schema.Types.ObjectId

let _schema = new mongoose.Schema({
  title: { type: String, required: true, unique: true, lowercase: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  summary: { type: String, unique: true, lowercase: true },
  author: { type: String, required: true, unique: true, lowercase: true },
  body: { type: String, unique: true, lowercase: true },
  tags: [{ type: String, unique: true, lowercase: true }],

}, { timestamps: true })

export default mongoose.model('Blog', _schema)