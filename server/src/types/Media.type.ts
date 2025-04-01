export type MediaAttibutes = {
  id?: string;
  type: "image" | "video";
  url: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}