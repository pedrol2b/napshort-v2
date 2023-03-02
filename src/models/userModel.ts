import mongoose from '@/database/index'
import bcrypt from 'bcryptjs'
import { Document, Schema, Types } from 'mongoose'

export interface IUserModel extends Document {
  _id: Types.ObjectId
  username: string
  email: string
  name: string
  role: 'user' | 'admin'
  avatar: string
  password: string | undefined
  isVerified: boolean
  emailVerificationCode: string
  emailVerificationExpiresIn: Date
  passwordResetToken: string
  passwordResetExpiresIn: Date
  createdAt: Date
}

const UserSchema: Schema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      index: { unique: true },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: { unique: true },
      lowercase: true,
    },
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'user',
    },
    avatar: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationCode: {
      type: String,
      select: false,
    },
    emailVerificationExpiresIn: {
      type: Date,
      select: false,
    },
    passwordResetToken: {
      type: String,
      select: false,
    },
    passwordResetExpiresIn: {
      type: Date,
      select: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: 'user' }
)

UserSchema.pre('save', async function (next): Promise<void> {
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(this.password, salt)
  this.password = hash
  next()
})

const UserModel = mongoose.model<IUserModel>('User', UserSchema)

export { UserModel }
