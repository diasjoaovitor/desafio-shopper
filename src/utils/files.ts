import { promises as fs, existsSync } from 'fs'
import path from 'path'

export const getFilePath = async (fileName: string) => {
  const dir = path.resolve(__dirname, '..', '..', 'uploads')
  if (!existsSync(dir)) {
    await fs.mkdir(dir)
  }
  return path.resolve(dir, fileName)
}

export const saveImage = async ({
  imageBase64,
  filePath
}: {
  imageBase64: string
  filePath: string
}) => {
  const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '')
  const buffer = Buffer.from(base64Data, 'base64')
  await fs.writeFile(filePath, buffer)
}

export const readImage = async (filePath: string) => {
  const buffer = await fs.readFile(filePath)
  const imageBase64 = buffer.toString('base64')
  return imageBase64
}
