export interface iUser {
  id: number;
  name: string;
  email: string;
  password: string;
  token: string;
}

export interface iUserCreate {
  name: string;
  email: string;
  gender: string;
  age: number;
  dedication: string;
  password: string;
  token: string;
}

export interface iToken {
  id: number;
}
