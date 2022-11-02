import { Avatar, Button, Input, message } from 'antd'
import { useState } from 'react'
import http from 'service/http'
import { Article } from '..'
// import { IProps } from '..'
import styles from './index.module.scss'
interface IProps {
  article?:Article | null,
  isChild: boolean,
  commentId?: number,
}
export const PublishComment = ({article, isChild, commentId}: IProps) => {
  const [commentVal, setCommentVal] = useState('')
  // const { author:{ avatar }  } = article
  const avatar = article?.author?.avatar
  const handleCommentChange = (e: any) => {
    setCommentVal(e.target.value)
  }
  const handleSubmitComment = async () => {
    if(!commentVal) return message.warning('请输入评论内容')
    if(isChild) {
      const params = {
        commentId: commentId,
        content: commentVal,
      }
      const res = await http.post('/childcomment/publish', params)
      if((res as any).code !== 200)
      return message.warning('评论失败')
    } else {
      const params = {
        articleId: article!.id,
        content: commentVal,
      }
      const res = await http.post('/comment/publish', params)
      if((res as any).code !== 200)
      return message.warning('评论失败')
    }
    message.success('评论成功')
    setCommentVal('')
  }
  return (
    <div className={styles.comment}>
          {isChild? null : <h2>评论区</h2>}     
          <div className={styles.user}>
            <Avatar size={40} src={avatar}></Avatar>
            <div className={styles.info}>
              <Input.TextArea placeholder='在此留下你想说的话吧！' rows={2} value={commentVal} onChange={handleCommentChange}></Input.TextArea>
              <Button type='primary' onClick={handleSubmitComment}>发布评论</Button>
            </div>
          </div>
        </div>
  )
}