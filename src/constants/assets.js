import userDefaultAvatar from '@/assets/default/avatar/user.jpg'
import therapistMale from '@/assets/default/avatar/male-technician.jpg'
import therapistFemale from '@/assets/default/avatar/female-technician.jpg'
import storeDefault from '@/assets/default/avatar/merchant.jpg'
import profileCoverGg from '@/assets/default/gg.png'
import licenseBg from '@/assets/default/bg.png'

export const USER_DEFAULT_AVATAR = userDefaultAvatar
export const THERAPIST_AVATAR_BY_GENDER = {
  male: therapistMale,
  female: therapistFemale,
}
export const STORE_DEFAULT_AVATAR = storeDefault
export const PROFILE_COVER_GG = profileCoverGg
export const LICENSE_BG = licenseBg

export function resolveTherapistAvatar(therapist) {
  if (therapist?.avatar) return therapist.avatar
  const g = therapist?.gender === 'female' ? 'female' : 'male'
  return THERAPIST_AVATAR_BY_GENDER[g]
}

export function resolveStoreImage(store) {
  if (store?.image) return store.image
  return STORE_DEFAULT_AVATAR
}

export function resolveUserAvatar(user) {
  if (user?.avatar) return user.avatar
  return USER_DEFAULT_AVATAR
}
