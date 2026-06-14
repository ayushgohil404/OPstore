import { 
  login as loginFn, 
  register as registerFn, 
  logout as logoutFn, 
  getCurrentUser as getCurrentUserFn,
  verifyRegistration as verifyRegistrationFn,
  forgotPasswordStep1 as forgotPasswordStep1Fn,
  resetPassword as resetPasswordFn,
  getGoogleAuthUrl as getGoogleAuthUrlFn,
  loginWithGoogle as loginWithGoogleFn
} from '../../server/functions/auth'

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: 'customer' | 'admin' | string
}

export interface AuthAdapter {
  login: (credentials: any) => Promise<User>
  register: (data: any) => Promise<any>
  verifyRegistration: (data: any) => Promise<User>
  forgotPasswordStep1: (email: string) => Promise<{ success: boolean }>
  resetPassword: (data: any) => Promise<{ success: boolean }>
  loginWithOAuth: (provider: 'google') => Promise<void>
  loginWithGoogle: (data: any) => Promise<{ success: boolean }>
  getCurrentUser: () => Promise<User | null>
  logout: () => Promise<void>
}

export const authApi: AuthAdapter = {
  login: async (credentials) => {
    const user = await loginFn({ data: credentials })
    return user as unknown as User
  },
  
  register: async (data) => {
    return await registerFn({ data })
  },

  verifyRegistration: async (data) => {
    const user = await verifyRegistrationFn({ data })
    return user as unknown as User
  },

  forgotPasswordStep1: async (email) => {
    return await forgotPasswordStep1Fn({ data: { email } })
  },

  resetPassword: async (data) => {
    return await resetPasswordFn({ data })
  },

  loginWithOAuth: async (provider) => {
    if (provider === 'google') {
      const { url } = await getGoogleAuthUrlFn()
      window.location.href = url
    }
  },

  loginWithGoogle: async (data) => {
    return await loginWithGoogleFn({ data })
  },

  getCurrentUser: async () => {
    const user = await getCurrentUserFn()
    return user ? (user as unknown as User) : null
  },

  logout: async () => {
    await logoutFn()
  }
}
