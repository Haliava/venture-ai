export type User = {
  avatar?: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
}

export type UserData = {
  uuid: string;
  email: string;
  created_at: Date,
  updated_at: Date,
}

export type RegisterUserFields = {
  email: string;
  password: string;
}

export type RegisteredUserAPI = {
  token: string;
  user: UserData;
}