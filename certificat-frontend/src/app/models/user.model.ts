export class User {
    id!: number;
    username!: String;
    password!: String;
    role!: Role;
}

export enum Role {
  admin = 'admin',
  super_admin = 'super_admin'
}

