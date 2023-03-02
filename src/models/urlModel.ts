import mongoose from '@/database/index'
import { Document, Schema, Types } from 'mongoose'
import { nanoid } from 'nanoid'

export interface IUrlModel extends Document {
  _id: Types.ObjectId
  url: string
  shorturl: string
  clicks: number
  createdBy: string
  createdAt: Date
}

const UrlSchema: Schema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    shorturl: {
      type: String,
      unique: true,
      index: { unique: true },
      default: () => nanoid(12),
    },
    clicks: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: String,
      ref: 'User',
      default: 'guest',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: 'url' }
)

const UrlModel = mongoose.model<IUrlModel>('Url', UrlSchema)

export { UrlModel }
