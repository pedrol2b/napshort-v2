import { readdirSync, readFileSync } from 'fs'
import { resolve } from 'path'

const projectRoot = resolve(__dirname, '../', '../')
const SDKPath = readdirSync(projectRoot).filter((file) => file.includes('firebase-adminsdk') && file.endsWith('.json'))

const SDK = JSON.parse(readFileSync(resolve(projectRoot, SDKPath[0]), 'utf-8'))

export { SDK }
