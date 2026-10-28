import { IUser } from "../../common/types";
import { BlogStatus } from "./blog.constants";

export type IBlogAuthor = Pick<
  IUser,
  "id" | "firstName" | "lastName" | "email"
>;

export interface IBlog {
  id: string;
  title: string;
  content: string;
  status: BlogStatus;
  authorId: IBlogAuthor;
  createdAt: Date;
  updatedAt: Date;
}
