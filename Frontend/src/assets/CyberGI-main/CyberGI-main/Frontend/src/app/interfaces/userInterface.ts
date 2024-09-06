export interface UserInterface {
    email: string;
    token: string;
}

export interface Role {
    id: number;
    name: string;
  }
  
  export interface Emp {
    id: number;
    username: string;
    email: string;
    password: string;
    roles: Role[];
  }