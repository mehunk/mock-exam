import * as firebase from 'firebase/app';

export class User {
  userId: string;
  displayName: string;
  email: string;
  authState: firebase.User;
  roles: any;

  constructor(authState?: firebase.User) {
    if (authState) {
      this.authState = authState;
      this.userId = authState.uid;
      this.email = authState.providerData ? authState.providerData[0].email : authState.email;
      if (authState.providerData && authState.providerData[0].displayName) {
        this.displayName = authState.providerData[0].displayName;
      } else {
        this.displayName = this.email.split('@')[0] + new Date().getTime();
      }
    }
  }
}
