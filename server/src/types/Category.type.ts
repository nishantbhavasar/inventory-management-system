export default interface CategoryAttribute {
  id?: number;
  category_name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}


export type InventoryCategoriesAttribute = {
  inventory_id:number,
  category_id:number
}