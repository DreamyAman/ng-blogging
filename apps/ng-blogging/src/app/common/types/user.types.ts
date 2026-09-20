export interface IUser {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  role: "user";
  createdAt: Date;
  updatedAt: Date;
}
