import { imagePrefix } from '../constants/index.js'
import fs from 'fs'
import path from 'path'

const __dirname = path.resolve()
const dir = path.resolve(__dirname, 'src', 'files')
const filePath = (id: string) => path.resolve(dir, `${id}.jpg`)

export const write = (img: string, id: string) => {
  if (img.startsWith(imagePrefix)) {
    const data = img.replace(imagePrefix, '')
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath(id), data, 'base64')
    return 'Downloaded successfully'
  }
  throw new Error(`Received value is not started for required prefix [${imagePrefix}]`)
}

export const read = (id: string) => {
  const file = fs.readFileSync(filePath(id))
  const data = imagePrefix + file.toString('base64')
  return data
}
