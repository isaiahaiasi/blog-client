interface APIResponseBody {
  content: any;
  success: boolean;
  errors?: APIError[];
}

interface APIError {
  msg: string;
}

interface BlogData {
  _id: string;
  title: string;
  content: string;
  publishDate: Date;
  author: UserData;
  comments?: CommentData; // Debating whether to de-normalize data for easier retrieval
}

interface UserData {
  _id: string;
  username: string;
}

interface CommentData {
  _id: string;
  content: string;
  post: string;
  author: UserData;
}
