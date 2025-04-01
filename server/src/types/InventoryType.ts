import { UserAttribute } from "./UserTypes";

export default interface InventoryAttribute {
  id?: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  created_by: UserAttribute;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
