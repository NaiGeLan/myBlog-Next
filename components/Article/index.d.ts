import { Author, Comment } from '@prisma/client';


interface Article {
  id: number
  title: string
  content: string
  views: number
  author: Author
  updatedAt: Date
  createdAt: Date
  comments: Comment[]
}

interface IProps {
  article: Article
}

export  {
  Article,
  IProps
};

