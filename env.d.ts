declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly PORT?: number
      readonly MONGO_URL?: string
      readonly MONGO_DB?: string
      readonly CLOUD_STORAGE_API?: string
      readonly CLOUD_STORAGE_BUCKET?: string
      readonly JSON_WEB_TOKEN_SECRET?: string
      readonly JSON_WEB_TOKEN_EXPIRATION?: number
    }
  }
}

export {}
