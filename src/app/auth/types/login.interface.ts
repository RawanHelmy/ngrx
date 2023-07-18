export interface LoginRequestInterface {
  user: {
    password: string | null;
    email: string | null;
  };
}
