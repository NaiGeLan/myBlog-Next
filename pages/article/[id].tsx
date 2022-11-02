import { observer } from 'mobx-react-lite'
import { prisma } from 'db/index'
import styles from './index.module.scss'
import { ArticleContent } from 'components/Article/ArticleContent'
import { PublishComment } from 'components/Article/PublishComment'
import { CommentList } from 'components/Article/CommentList'
import { IProps } from 'components/Article/'
export async function getServerSideProps({params}: any) {
  const articleId = params?.id
  const article = await prisma.article.findUnique({
    where: {
      id: Number(articleId)
    },
    include: {
      author: true,
      comments: {
        select: {
          childrenComment: {
            include: {
              author: true,
            }
          },
          id: true,
          content: true,
          updatedAt: true,
          author: true
        },
      },
    }
  })
  if(article) {
    article.views += 1
    await prisma.article.update({
      where: {
        id: Number(articleId)
      },
      data: {
        views: article.views
      }
    })
  }
  return {
    props: {
      article: JSON.parse(JSON.stringify(article)),
    },
  }
}
const ArticleDetail = (props: IProps) => {
  const { article } = props
  return (
    <div className={styles.container}>
      <ArticleContent article={article}></ArticleContent>
      <PublishComment article={article} isChild={false}></PublishComment>
      <CommentList article={article}></CommentList>
    </div>
  )
}

export default observer(ArticleDetail)