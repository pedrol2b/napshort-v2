import { readdirSync, readFileSync } from 'fs'
import { resolve } from 'path'

export interface ISDK {
  type: string
  project_id: string
  private_key_id: string
  private_key: string
  client_email: string
  client_id: string
  auth_uri: string
  token_uri: string
  auth_provider_x509_cert_url: string
  client_x509_cert_url: string
}

const projectRoot = resolve(__dirname, '../..')
const SDKPath = readdirSync(projectRoot).filter((file) => file.includes('firebase-adminsdk') && file.endsWith('.json'))
const SDKFile = SDKPath[0]

const SDK: ISDK = JSON.parse(readFileSync(resolve(projectRoot, SDKFile), 'utf-8'))

export { SDK }
