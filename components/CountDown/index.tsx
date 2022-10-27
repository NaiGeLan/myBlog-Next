import { useEffect, useState } from 'react'
import styles from './index.module.scss'
interface IProp {
  time: number
  onEnd: Function
}

const CountDown = (props: IProp) => {
  const { time, onEnd } = props
  const [count, setCount] = useState(time || 60)
  useEffect(() => {
    const id = setInterval(() => {
      setCount((count) => {
        if (count === 0) {
          clearInterval(id)
          onEnd && onEnd()
          return count
        }
        return count - 0.5
      })
      return () => {
        clearInterval(id)
      }
    }, 1000)
  }, [time, onEnd])
  return (
    <div className={styles.count}>
      { count }
    </div>
  )
}
export default CountDown
