import { observable } from 'mobx';

export type UserType = {
  pid: string;
};

export interface UserStoreType {
  data?: UserType;
}

class UserStore implements UserStoreType {
  @observable data?: UserType;
}

const userStore: UserStore = new UserStore();

export default userStore;
