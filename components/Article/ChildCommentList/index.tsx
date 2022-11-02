import { Avatar } from "antd"
import { formatDistanceToNow } from "date-fns"
import { useState } from "react"
import styles from './index.module.scss'
import {PublishComment} from "../PublishComment"
export const ChildCommentList = ({comments}: any) => {
  const [isShowAddComment, setIsShowAddComment] = useState(false)
  const handleClickAddComment = () => {
    setIsShowAddComment(!isShowAddComment)
  }
  console.log(comments)
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
                  <a className={styles.addComment} onClick={handleClickAddComment}>{isShowAddComment?'点击折叠回复评论':'点击回复评论'}</a>
                </div>
                <div className={styles.content}><span className={styles.callback}>{'@'+comment.author.nickname + ':' }</span>
                  {comment.content}
                </div>
                {
                  isShowAddComment && (
                  <PublishComment  isChild={true}></PublishComment>
                  )
                }
              </div>
            )
          })
        }
      </div>  
  )
}