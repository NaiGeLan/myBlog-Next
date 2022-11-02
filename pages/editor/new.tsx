import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'
import { Button, message } from 'antd'
import dynamic from 'next/dynamic'
// import type { ChangeEvent } from 'react'
import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useStore } from 'store/index'
import { useRouter } from 'next/router'
import http from 'service/http'
import styles from './index.module.scss'
const MDEditor = dynamic(
  () => import('@uiw/react-md-editor'),
  { ssr: false },
)

const NewEditor = () => {
  const store = useStore()
  const { push } = useRouter()
  const { userId } = store.user.userInfo
  const [content, setContent] = useState('**Hello world!!!**')
  const [title, setTitle] = useState('')
  const handlePublish = async () => {
    if (!title)
      return message.warning('请输入文章标题')
    const data = {
      title,
      content,
    }
    const res = await http.post('/article/publish', data) as undefined as any
    if (res?.code !== 200)
      return message.warning('发布失败')
    message.success('发布成功！')
    userId ? push(`/user/${userId}`) : push('/')
  }
  const handleTitleChange = (e: any) => {
    setTitle(e?.target?.value)
  }
  const handleEditorChange = (content: any) => {
    setContent(content)
  }
  return (

      <div className={styles.container}>
          <div className={styles.nav}>
              <section className={styles.logArea}>Blog-NaiGeLan</section>
              <span className={styles.text}>写文章</span>
              <Button className={styles.button} onClick={handlePublish} type='primary' size='large'>发布文章</Button>
          </div>
        <div className={styles.operation}>
              <input className={styles.input} placeholder='请输入文章标题' value={title} onChange={handleTitleChange} />

        </div>
        <MDEditor className={styles.editor} value={content} onChange={handleEditorChange} height={1000}/>
      </div>
  )
}
(NewEditor as any).layout = null

export default observer(NewEditor)
