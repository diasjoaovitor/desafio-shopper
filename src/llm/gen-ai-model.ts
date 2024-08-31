import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string)

export const genAIModel = genAI.getGenerativeModel({
  model: 'gemini-1.5-pro'
})
