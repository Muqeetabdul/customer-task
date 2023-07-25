export interface User {
  id: String;
  name: String;
  email: String;
  password: String | undefined;
}
export interface Login {
  token: String;
  user: User;
}
