import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()
export const languageAtom = atom({
  key: 'language',
  default: 'en',
  effects_UNSTABLE: [persistAtom],
})

export const nameAtom = atom({
  key: 'user.name',
  default: null,
  effects_UNSTABLE: [persistAtom],
})

