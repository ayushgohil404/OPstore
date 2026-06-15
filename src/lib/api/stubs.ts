// Shipping API
export const shippingApi = {
  getRates: async () => [{ id: 'standard', name: 'Standard', price: 15 }]
}

// Tax API
export const taxApi = {
  calculateTax: async () => 0
}

// Customers API
export const customersApi = {
  listCustomers: async () => [],
  getCustomer: async () => null
}


// Promotions API
export const promotionsApi = {
  validateCode: async () => ({ valid: true, discount: 0 })
}

// CMS API
export const cmsApi = {
  getPage: async () => null
}

// Reports API
export const reportsApi = {
  getDashboardStats: async () => ({})
}

// Uploads API
export const uploadsApi = {
  uploadImage: async () => 'https://example.com/image.jpg'
}
