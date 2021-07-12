export interface User {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
}

export const UNDEFINED_USER: User = {
  email: null,
  token: null,
  username: null,
  bio: null,
  image: null,
};
