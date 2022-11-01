// import { AppDataSource } from 'db/index'
import { Article } from '@prisma/client'
// import type { IArticle } from 'pages/api'
import { ListItem } from '../components/ListItem'
import { prisma } from 'db/index'
interface IProps {
  articles: Article[]
}
export async function getServerSideProps() {
  // const articleRep = (await AppDataSource).getRepository(Article)
  const articles = await prisma.article.findMany({
    include: {
      author: true,
    },
  })
  return {
    props: {
      articles: JSON.parse(JSON.stringify(articles)),
    },
  }
}

const Home = (props: IProps) => {
  const { articles } = props
  console.log(articles,'######');
  return (
    <div>
    {
      articles.map(article => (
        <ListItem article={article} key={article.id}/>
      ),
      )
    }
  </div>
  )
}
export default Home
