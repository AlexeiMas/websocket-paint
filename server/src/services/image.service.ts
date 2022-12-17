import { imagePrefix } from '../constants/index.js'
import fs from 'fs'
import path from 'path'

const __dirname = path.resolve()

export const write = (img: string, id: string) => {
  if (img.startsWith(imagePrefix)) {
    const data = img.replace(imagePrefix, '')
    fs.writeFileSync(path.resolve(__dirname, 'src', 'files', `${id}.jpg`), data, 'base64')
    return 'Downloaded successfully'
  }
  throw new Error(`Received value is not started for required prefix [${imagePrefix}]`)
}

export const read = (id: string) => {
  const file = fs.readFileSync(path.resolve(__dirname, 'src', 'files', `${id}.jpg`))
  const data = imagePrefix + file.toString('base64')
  return data
}
