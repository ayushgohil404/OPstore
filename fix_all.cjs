const fs = require('fs')
const path = require('path')

const files = [
  'src/routes/cart.tsx',
  'src/routes/checkout.tsx',
  'src/routes/search.tsx',
  'src/routes/account/orders.tsx',
  'src/routes/account/wishlist.tsx',
  'src/routes/p.$slug.tsx',
  'src/routes/admin/index.tsx',
  'src/routes/admin/orders/index.tsx'
]

files.forEach(f => {
  const p = path.join('/Users/ayush/Downloads/OPStore', f)
  if (fs.existsSync(p)) {
    let content = fs.readFileSync(p, 'utf8')
    content = content.replace(/\\`/g, '`')
    fs.writeFileSync(p, content)
    console.log('Fixed backticks in', f)
  }
})
