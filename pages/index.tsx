import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { Checkbox } from "@tuftandneedle/ui";

const Home: NextPage = () => {
  return (
    <div>
      <h1>Hello</h1>
      <Checkbox
        isChecked={true}
        isDisabled={false}
      >
        Cool checkbox item
      </Checkbox>
    </div>
  )
}

export default Home
