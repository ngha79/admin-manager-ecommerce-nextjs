export interface IProduct {
  name: string;
  brand: string;
  price: number;
  picture: IProductImage[];
  isPublish: boolean;
  detail: string;
  attributes: IProductAttribute[];
  sold: number;
  id: string;
}

export interface IProductImage {
  id: number;
  image_id: string;
  product_image_url: string;
  product_thumb: string;
}

export interface IProductAttribute {
  material: string;
  size: string;
  thumb: string;
  file: File;
  id: number;
}

export interface IListOrder {
  id: string;
  user: {
    id: string;
    userName: string;
    email: string;
    avatar: string;
    background: string;
  };
  order: IOrder[];
  tracking_number: string;
  total_price_apply_discount: number;
  total_price: number;
  status: string;
  discount: string | null;
}

export interface IOrder {
  id: number;
  product: IProduct;
  productAttribute: IProductAttribute[];
  quantity: number;
}
