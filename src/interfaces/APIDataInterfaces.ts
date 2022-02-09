export interface APIResponseBody<T> {
  content: T;
  success: boolean;
  errors?: APIError[];
}

export interface APIError {
  msg: string;
}

export interface BlogData {
  _id: string;
  title: string;
  content: string;
  publishDate: string;
  author: UserData;
  comments?: CommentData; // Debating whether to de-normalize data for easier retrieval
}

export interface UserData {
  _id: string;
  username: string;
}

export interface CommentData {
  _id: string;
  content: string;
  post: string;
  author: UserData;
  createdAt: string;
}
