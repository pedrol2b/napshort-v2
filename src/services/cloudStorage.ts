import { SDK } from '@/config/firebase'
import { randomBytes } from 'crypto'
import * as dotenv from 'dotenv'
import { credential, ServiceAccount, storage } from 'firebase-admin'
import { initializeApp } from 'firebase-admin/app'
dotenv.config()

const storageBucket = process.env.CLOUD_STORAGE_BUCKET

initializeApp({
  credential: credential.cert(SDK as ServiceAccount),
  storageBucket,
})

const bucket = storage().bucket()

interface IFile {
  originalname: string
  mimetype: string
  buffer: Buffer
  cloudStorageURL?: string
}

export default function (file: IFile): Promise<IFile> {
  return new Promise((resolve, reject) => {
    if (!file) reject()

    const filename = `${Date.now()}-${randomBytes(16).toString('hex')}.${file.originalname.split('.').pop()}`
    const bucketFile = bucket.file(filename)

    const stream = bucketFile.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    })

    stream.on('finish', async () => {
      await bucketFile.makePublic()
      file.cloudStorageURL = `${process.env.CLOUD_STORAGE_API}${storageBucket}/${filename}`
      resolve(file)
    })

    stream.end(file.buffer)
  })
}
