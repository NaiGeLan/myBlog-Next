import { AppDataSource } from 'db/index'
import { Article } from 'db/entity'
import type { IArticle } from 'pages/api'
import { ListItem } from '../components/ListItem'
interface IProps {
  articles: IArticle[]
}
export async function getServerSideProps() {
  const articleRep = (await AppDataSource).getRepository(Article)
  const articles = await articleRep.find({
    relations: ['user'],
  })
  return {
    props: {
      articles: JSON.parse(JSON.stringify(articles)),
    },
  }
}

const Home = (props: IProps) => {
  const { articles } = props
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
