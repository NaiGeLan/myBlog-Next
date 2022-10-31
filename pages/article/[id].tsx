import { AppDataSource } from 'db/index'
import { Article } from 'db/entity'
import {IArticle} from 'pages/api'
import { useStore } from 'store'
import styles from './index.module.scss'
import { formatDistanceToNow } from 'date-fns';
import { Avatar } from 'antd'
import Link from 'next/link'
import Markdown from 'markdown-to-jsx'
export async function getServerSideProps({params}: any) {
  console.log(params) 
  const articleId = params?.id
  const articleRep = (await AppDataSource).getRepository(Article)
  const article = await articleRep.findOne({
    where: {
      id: articleId
    },
    relations: ['user'],
  })
  console.log(article);
  if(article) {
    article.views += 1
    await articleRep.save(article)
  }
  return {
    props: {
      article: JSON.parse(JSON.stringify(article)),
    },
  }
}
interface IProps {
  article: IArticle
}
const ArticleDetail = (props: IProps) => {
  const { article } = props
  const store = useStore()
  const { userId } = store.user.userInfo
  const { user:{ nickname, avatar, id } } = article
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{article.title}</h2>
      <div className={styles.user}>
        <Avatar size={48} src={avatar}></Avatar>
        <div className={styles.info}>
          <div className={styles.name}>{nickname}</div>
          <div>
            <span className={styles.date}>{formatDistanceToNow(new Date(article?.updateTime))}</span>
            <span className={styles.views}>阅读：{article.views}</span>
            {
              Number(id) === Number(userId) && (
                <Link className={styles.edit} href={`/editor/${article.id}`}>编辑</Link>
              )
            }
          </div>
         
        </div>
      </div>
      {article.content && <Markdown className={styles.content}>{article.content}</Markdown>}
    </div>
  )
}

export default ArticleDetail