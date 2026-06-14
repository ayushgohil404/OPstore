import { updateProfile as updateProfileFn, updatePassword as updatePasswordFn } from '../../server/functions/settings'

export interface SettingsAdapter {
  updateProfile: (data: { name: string; email: string }) => Promise<{ success: boolean; user?: any }>
  updatePassword: (data: { currentPassword: string; newPassword: string }) => Promise<{ success: boolean }>
}

export const settingsApi: SettingsAdapter = {
  updateProfile: async (data) => {
    return await updateProfileFn({ data })
  },
  updatePassword: async (data) => {
    return await updatePasswordFn({ data })
  }
}
