import { CurrentUserInterface } from './currentUser.inteface';

export interface CurrentUserRequestInterface {
  user: CurrentUserInterface & { password: string };
}
