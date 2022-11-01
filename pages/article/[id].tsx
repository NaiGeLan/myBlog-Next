// import { AppDataSource } from 'db/index'
// import { Article } from 'db/entity'
import { prisma } from 'db/index'
// import {IArticle} from 'pages/api'
import { useStore } from 'store'
import styles from './index.module.scss'
import { formatDistanceToNow } from 'date-fns';
import { Avatar, Input, Button, message } from 'antd'
import Link from 'next/link'
import Markdown from 'markdown-to-jsx'
import { useState } from 'react'
import http from 'service/http'
import { Article } from '@prisma/client';
export async function getServerSideProps({params}: any) {
  console.log(params) 
  const articleId = params?.id
  // const articleRep = (await AppDataSource).getRepository(Article)
  const article = await prisma.article.findUnique({
    where: {
      id: Number(articleId)
    },
    include: {
      author: true,
    },
  })
  console.log(article);
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
interface IProps {
  article: Article
}
const ArticleDetail = (props: IProps) => {
  const { article } = props
  console.log(article,'&&&&&&&&&')
  const store = useStore()
  const { userId } = store.user.userInfo
  const commenterAvatar  = store.user.userInfo.avatar
  const { author:{ nickname, avatar, id } } = article
  const [commentVal, setCommentVal] = useState('')
  const handleCommentChange = (e: any) => {
    setCommentVal(e.target.value)
  }
  const handleSubmitComment = async () => {
    if(!commentVal) return message.warning('请输入评论内容')
    const params = {
      articleId: article.id,
      content: commentVal,
    }
    const res = await http.post('/comment/publish', params)
    if((res as any).code !== 200)
      return message.warning('评论失败')
    message.success('评论成功')
    setCommentVal('')
  }
  return (
    <div className={styles.container}>
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
      <div className={styles.comment}>
          <h2>评论</h2>
          <div className={styles.user}>
            <Avatar size={40} src={commenterAvatar}></Avatar>
            <div className={styles.info}>
              <Input.TextArea placeholder='请输入评论' rows={2} value={commentVal} onChange={handleCommentChange}></Input.TextArea>
              <Button type='primary' onClick={handleSubmitComment}>发布评论</Button>
            </div>
          </div>
           
        </div>
    </div>
  )
}

export default ArticleDetail