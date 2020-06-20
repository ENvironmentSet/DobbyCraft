import { observable } from 'mobx';

export type User = {
  pid: string;
};

export class UserStore {
  @observable data?: User;
}

const userStore: UserStore = new UserStore();

export default userStore;
