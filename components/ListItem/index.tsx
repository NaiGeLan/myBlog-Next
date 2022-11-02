
import Link from 'next/link'
import { EyeOutlined } from '@ant-design/icons'
import styles from './index.module.scss'
import { Avatar } from 'antd'
import { formatDistanceToNow } from 'date-fns';
import { markdownToTxt } from 'markdown-to-txt'
import { Article } from '@prisma/client'
interface IProp {
  article: Article
}

export const ListItem = (props: IProp) => {
  const { article } = props
  const { author } = article
  return (
    <Link href={`/article/${article.id}`} className={styles.link}>
      <div className={styles.container}>
        <div className={styles.article}>
          <h3 className={styles.title}> {article.title}</h3>
          <p className={styles.content}>{markdownToTxt(article.content)}</p> 
          <span className={styles.date}>{formatDistanceToNow(new Date(article?.updatedAt))}</span>
        </div>
        <div className={styles.user}>
          <Avatar size={48} src={author?.avatar}/>
          <span className={styles.name}>{author?.nickname}</span>
          <span className={styles.view}>
              <EyeOutlined />
              <span className={styles.date}>{article?.views}</span>
            </span>
        </div>
        
      </div>
    </Link>
  )
}