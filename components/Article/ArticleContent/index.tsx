import { useStore } from 'store'
import styles from './index.module.scss'
import { IProps } from '..'
import { Avatar } from 'antd'
import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'
import Markdown from 'markdown-to-jsx'
export const ArticleContent = ({article}: IProps) => {
  const { author:{ nickname, avatar, id }  } = article
  const store = useStore()
  const { userId } = store.user.userInfo

  return (
    <div className={styles.article}>
      <h2 className={styles.title}>{article.title}</h2>
      <div className={styles.user}>
        <Avatar size={48} src={avatar}></Avatar>
        <div className={styles.info}>
          <div className={styles.name}>{nickname}</div>
          <div>
            <span className={styles.date}>{formatDistanceToNow(new Date(article?.updatedAt))}</span>
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
