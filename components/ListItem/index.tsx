import Link from 'next/link'
import type { IArticle } from 'pages/api'
import { EyeOutlined } from '@ant-design/icons'
import styles from './index.module.scss'
import { Avatar } from 'antd'
import { formatDistanceToNow } from 'date-fns';
import { markdownToTxt } from 'markdown-to-txt'
interface IProp {
  article: IArticle
}

export const ListItem = (props: IProp) => {
  const { article } = props
  const { user } = article
  return (
    <Link href={`/article/${article.id}`} className={styles.link}>
      <div className={styles.container}>
        <div className={styles.article}>
          <h3 className={styles.title}> {article.title}</h3>
          <p className={styles.content}>{markdownToTxt(article.content)}</p> 
          <span className={styles.date}>{formatDistanceToNow(new Date(article?.updateTime))}</span>
        </div>
        <div className={styles.user}>
          <Avatar size={48} src={user.avatar}/>
          <span className={styles.name}>{user?.nickname}</span>
          <span className={styles.view}>
              <EyeOutlined />
              <span className={styles.date}>{article?.views}</span>
            </span>
        </div>
        
      </div>
    </Link>
  )
}
