import { createStore, useStore as baseUseStore, Store } from "vuex";
import { InjectionKey } from "vue";

import type { UsersState } from "./modules/users";
import type { SignsState } from "./modules/signs";
import type { ChecksState } from "./modules/checks";
import type { NewsState } from "./modules/news";

import users from "./modules/users";
import signs from "./modules/signs";
import checks from "./modules/checks";
import news from "./modules/news";

import VuexPersistence from "vuex-persist";

// 为 store state 声明类型
export interface State {}

export interface StateAll extends State {
  users: UsersState;
  signs: SignsState;
  checks: ChecksState;
  news: NewsState;
}

// 定义 injection key
export const key: InjectionKey<Store<StateAll>> = Symbol();

const vuexLocal = new VuexPersistence<State>({
  storage: window.localStorage,
  reducer: (state) => ({ users: { token: (state as StateAll).users.token } }),
});

export const store = createStore<State>({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    users,
    signs,
    checks,
    news,
  },
  plugins: [vuexLocal.plugin],
});

// 定义自己的 `useStore` 组合式函数
export function useStore() {
  return baseUseStore(key);
}
