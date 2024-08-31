import { ILLM } from '@/interfaces'
import { genAIModel } from '@/llm'
import { TMeasureType } from '@/models'

export class LLMService implements ILLM {
  async measureImage({
    imageBase64,
    measureType
  }: {
    imageBase64: string
    measureType: TMeasureType
  }): Promise<number> {
    const prompt = `Analyze the image and measure the consumption of ${measureType}. Return only a numeric value. If the measurement cannot be made, return the value -1.`
    const generatedContent = await genAIModel.generateContent([
      prompt,
      {
        inlineData: {
          data: imageBase64,
          mimeType: 'image/jpg'
        }
      }
    ])
    const result = generatedContent.response.text()
    const numericValue = Number(result)
    return !isNaN(numericValue) ? numericValue : -2
  }
}
