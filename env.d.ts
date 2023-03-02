declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly PORT?: string
      readonly MONGO_URL?: string
      readonly MONGO_DB?: string
      readonly CLOUD_STORAGE_API?: string
      readonly CLOUD_STORAGE_BUCKET?: string
    }
  }
}

export {}
