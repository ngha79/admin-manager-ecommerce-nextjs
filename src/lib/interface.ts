export enum BrandProduct {
  FASHION = "Thời trang",
  FOOTWEAR = "Giày dép",
  BOOKS = "Sách",
  ELECTRONICS = "Thiết bị điện tử",
  BEAUTY = "Sắc đẹp",
  HEALTH = "Sức khỏe",
  TOYS = "Đồ chơi",
  PETCARE = "Chăm sóc thú cưng",
}

export interface TBlog {
  id: string;
  description: string;
  author: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  topic: { id: number; topic: string };
}
