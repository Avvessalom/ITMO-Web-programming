export  interface User {
  login: string;
  password: string;
}

export class Point {
  x: number;
  y: number;
  r: number;
  token;
  isArea: boolean;
  login: User;
}
export class SimplePoint{
  id: number;
  x: number;
  y: number;
  r: number;
  result: string;
  isArea: boolean;
  login;
}

export class EToken{
  email: string;
  token: string;
}

