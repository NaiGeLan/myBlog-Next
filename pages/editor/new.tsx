import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'
import { Button } from 'antd'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import styles from './index.module.scss'
// import light from 'rich-markdown-editor'

const MDEditor = dynamic(
  () => import('@uiw/react-md-editor'),
  { ssr: false },
)

const NewEditor = () => {
  const [content, setContent] = useState('**Hello world!!!**')
  const [title, setTitle] = useState('')
  const handlePublish = () => {

  }
  const handleTitleChange = (e: any) => {
    setTitle(e?.target?.value)
  }
  return (

      <div className={styles.container}>
          <div className={styles.nav}>
              <section className={styles.logArea}>Blog-NaiGeLan</section>
              <span className={styles.text}>写文章</span>
              <Button className={styles.button} onClick={handlePublish} type='primary' size='large'>发布文章</Button>
          </div>
        <div className={styles.operation}>

              {/* <span className={styles.text}>文章标题：</span> */}
              <input className={styles.input} placeholder='请输入文章标题' value={title} onChange={handleTitleChange} />

        </div>
        <MDEditor className={styles.editor} value={content} onChange={setContent} height='1000'/>
      </div>
  )
}
NewEditor.layout = null

export default NewEditor
