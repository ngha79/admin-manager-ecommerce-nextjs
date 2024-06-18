export interface IShop {
  id: string;
  userName: string;
  email: string;
  avatar: string;
  background: string;
  phoneNumber: number;
  money: number;
  isActive: string;
  description: string;
  address: [
    {
      phoneNumber: string;
      userName: string;
      address: string;
    }
  ];
}
