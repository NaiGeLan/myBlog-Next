import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'
import { Button, message } from 'antd'
import dynamic from 'next/dynamic'
import type { ChangeEvent } from 'react'
import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useStore } from 'store/index'
import { useRouter } from 'next/router'
import http from 'service/http'
import styles from './index.module.scss'
import { AppDataSource } from 'db'
import { Article } from 'db/entity'
import { IArticle } from 'pages/api'
const MDEditor = dynamic(
  () => import('@uiw/react-md-editor'),
  { ssr: false },
)

export async function getServerSideProps ({params}: any) {
  const articleRep = (await AppDataSource).getRepository(Article)
  const article = await articleRep.findOne({
    where: {
      id: params.id,
    },
    relations: ['user'],
  })
  console.log(article);
  
  return {
    props: {
      article: JSON.parse(JSON.stringify(article)),
    },
  }
}
interface IProps {
  article: IArticle
}

const ModifyEditor = (props: IProps) => {
  const { article } = props
  console.log(article);
  const store = useStore()
  const { push } = useRouter()
  const { userId } = store.user.userInfo
  const [content, setContent] = useState(article?.content)
  const [title, setTitle] = useState(article?.title)
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
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
(ModifyEditor as any).layout = null

export default observer(ModifyEditor)
