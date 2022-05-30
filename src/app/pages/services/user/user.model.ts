export interface User {
  idUser?: Number;
  name: String;
  email: String;
  status: Boolean;
}

export interface UserResponse {
  data: Array<User>;
  length?: Number;
  message: String;
  status: String;
}
