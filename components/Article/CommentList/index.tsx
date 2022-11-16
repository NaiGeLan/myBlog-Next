import {  Avatar } from "antd"
import { formatDistanceToNow } from "date-fns"
import { useState } from "react"
import { IProps } from ".."
import styles from './index.module.scss'
import {PublishComment} from "../PublishComment"
import { ChildCommentList } from '../ChildCommentList'
export const CommentList = ({article}: IProps) => {
  const { comments } = article
  const [commentId, setCommentId] = useState(0)
  const [isShowAddComment, setIsShowAddComment] = useState(false)
  const handleClickAddComment = (id: any) => {
    setIsShowAddComment(!isShowAddComment)
    setCommentId(id)
  }
  return ( 
    <div className={styles.comments}>
        {
          comments.map((comment: any) => {
            return (
              <div className={styles.commentItem} key={comment.id}>
                <div className={styles.user}>
                  <Avatar size={32} src={comment.author.avatar}></Avatar>
                  <div className={styles.info}>
                    <div className={styles.name}>{comment.author.nickname}</div>
                    <div className={styles.date}>{formatDistanceToNow(new Date(comment.updatedAt))}</div>
                  </div>
                  <a className={styles.addComment} onClick={() => handleClickAddComment(comment.id)}>{isShowAddComment?'点击折叠回复评论':'点击回复评论'}</a>
                </div>
                <div className={styles.content}>{comment.content}</div>
                <ChildCommentList comments={comment.childrenComment} commentId={comment.id}></ChildCommentList>
                {
                  isShowAddComment && (<PublishComment article={article} isChild={true} commentId={commentId} commentToId={comment.author.id}></PublishComment>)
                }
              </div>
            )
          })
        }
      </div>  
  )
}