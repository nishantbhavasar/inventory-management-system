export interface UserAttribute {
  id?: string;
  name?:string;
  email: string;
  password: string;
  role_id?: number;
  is_active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface LoginAttribute {
  email: string;
  password: string;
}