import { UserAttribute } from "./UserTypes";
import { MEDIA_TYPE } from "@/types/Enum.type"; // Ensure MEDIA_TYPE is properly imported

export default interface CreateInventoryAttribute {
  id?: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  created_by: number;
  categories?: number[]; // Array of category IDs
  images?: {
    originalname: string;
    mimetype: typeof MEDIA_TYPE[keyof typeof MEDIA_TYPE]; // Correctly extract the values
    buffer: Buffer;
  }[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}


export default interface InventoryAttribute {
  id?: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  created_by: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
