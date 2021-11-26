interface BlogData {
  _id: string;
  title: string;
  content: string;
  publishDate: Date;
  author: AuthorData;
  comments?: CommentData; // Debating whether to de-normalize data for easier retrieval
}

interface AuthorData {
  _id: string;
  username: string;
}

interface CommentData {
  content: string;
  post: string;
  author: AuthorData;
}
