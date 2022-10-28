import type { IUserStore } from './userStore'
import userStore from './userStore'

export interface IStore {
  user: IUserStore
}

export default function createStore(initialValue: any): () => IStore {
  return () => {
    return {
      user: { ...userStore(), ...initialValue?.user },
    }
  }
}
