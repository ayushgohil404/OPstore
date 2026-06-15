import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { Upload, ArrowLeft, Loader2 } from 'lucide-react'
import { productsApi } from '../../../lib/api'
import { uploadImage } from '../../../server/functions/upload'

export const Route = createFileRoute('/admin/products/new')({
  component: AddProduct
})

function AddProduct() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const formData = new FormData(e.currentTarget)
      
      const title = formData.get('title') as string
      const price = parseFloat(formData.get('price') as string)
      const originalPriceRaw = formData.get('originalPrice') as string
      const originalPrice = originalPriceRaw ? parseFloat(originalPriceRaw) : undefined
      const category = formData.get('category') as string
      const stock = parseInt(formData.get('stock') as string, 10)
      const description = formData.get('description') as string

      if (!imageFile) throw new Error('Please select an image')

      // 1. Upload image to Cloudinary via server function
      const imageFormData = new FormData()
      imageFormData.append('file', imageFile)
      const uploadRes = await uploadImage({ data: imageFormData })
      
      if (!uploadRes.url) throw new Error('Failed to get image URL')

      // 2. Create product via Prisma
      await productsApi.createProduct({
        title,
        price,
        originalPrice,
        category,
        stock,
        description,
        imageUrl: uploadRes.url
      })

      navigate({ to: '/admin/products' })
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8 pb-12">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate({ to: '/admin/products' })}
          className="p-2 border border-border rounded-lg hover:bg-secondary transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-muted-foreground" />
        </button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Add Product</h1>
          <p className="text-muted-foreground">Create a new product in your catalog.</p>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-destructive/10 text-destructive border border-destructive/20 rounded-xl">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 flex flex-col gap-6">
          <div className="bg-background border border-border p-6 rounded-2xl flex flex-col gap-4 shadow-sm">
            <h2 className="text-lg font-semibold">General Information</h2>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Product Title</label>
              <input name="title" required className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none" placeholder="e.g. Classic White Sneakers" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Description</label>
              <textarea name="description" required rows={4} className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none" placeholder="Product details..."></textarea>
            </div>
          </div>

          <div className="bg-background border border-border p-6 rounded-2xl flex flex-col gap-4 shadow-sm">
            <h2 className="text-lg font-semibold">Pricing & Inventory</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Price ($)</label>
                <input name="price" type="number" step="0.01" required className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none" placeholder="0.00" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Compare at Price ($)</label>
                <input name="originalPrice" type="number" step="0.01" className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none" placeholder="Optional" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Stock Quantity</label>
                <input name="stock" type="number" required className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none" placeholder="10" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Category</label>
                <select name="category" required className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none">
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                  <option value="kids">Kids</option>
                  <option value="accessories">Accessories</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-80 flex flex-col gap-6">
          <div className="bg-background border border-border p-6 rounded-2xl flex flex-col gap-4 shadow-sm">
            <h2 className="text-lg font-semibold">Product Image</h2>
            <div className="relative aspect-square w-full border-2 border-dashed border-border rounded-xl flex items-center justify-center overflow-hidden bg-secondary/20 hover:bg-secondary/40 transition-colors group cursor-pointer">
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer z-10" 
              />
              {imagePreview ? (
                <>
                  <img src={imagePreview} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <span className="text-white text-sm font-medium">Change Image</span>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center gap-2 text-muted-foreground p-6 text-center">
                  <Upload className="w-8 h-8 opacity-50" />
                  <span className="text-sm">Click or drag image to upload</span>
                </div>
              )}
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary text-primary-foreground font-medium py-3 rounded-xl hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Save Product'}
          </button>
        </div>
      </form>
    </div>
  )
}
