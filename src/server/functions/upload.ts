import { createServerFn } from '@tanstack/react-start'
import { cloudinary } from '../cloudinary'

export const uploadImage = createServerFn({ method: 'POST' })
  .validator((formData: FormData) => formData)
  .handler(async ({ data }) => {
    const file = data.get('file') as File | null
    if (!file) {
      throw new Error('No file provided')
    }

    // Convert the File object to a Buffer, then to a Base64 string
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const base64String = buffer.toString('base64')
    const mimeType = file.type || 'image/jpeg'
    const dataUri = `data:${mimeType};base64,${base64String}`

    try {
      const result = await cloudinary.uploader.upload(dataUri, {
        folder: 'opstore_products'
      })
      
      return { url: result.secure_url }
    } catch (error) {
      console.error('Cloudinary upload error:', error)
      throw new Error('Failed to upload image')
    }
  })
