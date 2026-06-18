import { vi, beforeEach } from 'vitest'

// Setup mock cookie store
const cookies: Record<string, string> = {}
globalThis.mockCookies = {
  get: (name: string) => cookies[name],
  set: (name: string, value: string) => { cookies[name] = value },
  delete: (name: string) => { delete cookies[name] },
  clear: () => {
    for (const key in cookies) {
      delete cookies[key]
    }
  }
}

// Mock @tanstack/react-start
vi.mock('@tanstack/react-start', () => {
  return {
    createServerFn: (options: any = {}) => {
      const builder = {
        validatorFn: null as any,
        validator: (validatorFn: any) => {
          builder.validatorFn = validatorFn
          return builder
        },
        handler: (handlerFn: any) => {
          const fn = async (args: any = {}) => {
            let data = args?.data
            if (builder.validatorFn) {
              data = await builder.validatorFn(data)
              if (data && typeof data === 'object' && 'error' in data) {
                throw new Error(JSON.stringify(data))
              }
            }
            return handlerFn({ ...args, data })
          }
          fn.options = options
          fn._handler = handlerFn
          fn._validator = builder.validatorFn
          return fn
        }
      }
      return builder
    }
  }
})

// Mock @tanstack/react-start/server
vi.mock('@tanstack/react-start/server', () => {
  return {
    getCookie: (name: string) => globalThis.mockCookies.get(name),
    setCookie: (name: string, value: string, options?: any) => {
      globalThis.mockCookies.set(name, value)
    },
    deleteCookie: (name: string) => {
      globalThis.mockCookies.delete(name)
    }
  }
})

// Define mock Prisma client
const mockPrismaInstance = {
  user: {
    findUnique: vi.fn(),
    findFirst: vi.fn(),
    findMany: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    count: vi.fn(),
  },
  product: {
    findUnique: vi.fn(),
    findFirst: vi.fn(),
    findMany: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    count: vi.fn(),
  },
  order: {
    findUnique: vi.fn(),
    findFirst: vi.fn(),
    findMany: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    count: vi.fn(),
    aggregate: vi.fn(),
  },
  review: {
    findUnique: vi.fn(),
    findFirst: vi.fn(),
    findMany: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    count: vi.fn(),
  },
  wishlist: {
    findUnique: vi.fn(),
    findFirst: vi.fn(),
    findMany: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    count: vi.fn(),
  },
  newsletter: {
    findUnique: vi.fn(),
    findFirst: vi.fn(),
    findMany: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    count: vi.fn(),
  }
}

// Mock @prisma/client using an ES6 class returning our mock instance
vi.mock('@prisma/client', () => {
  return {
    PrismaClient: class {
      constructor() {
        return mockPrismaInstance
      }
    }
  }
})

// Expose mock Prisma client globally so tests can access it and set return values
globalThis.prismaMock = mockPrismaInstance

// Set env variables
process.env.JWT_SECRET = 'test_secret_key_1234567890'
process.env.NODE_ENV = 'test'

// Reset all mocks and cookies before each test
beforeEach(() => {
  globalThis.mockCookies.clear()
  vi.clearAllMocks()
})
