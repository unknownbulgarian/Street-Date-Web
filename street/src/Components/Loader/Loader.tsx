import styles from './Loader.module.css'
import { AiOutlineLoading } from "react-icons/ai";

export default function Loader() {
  return (
    <div>
         <div className={styles.loader}><span className={styles.loadericon}><AiOutlineLoading /></span></div>
    </div>
  )
}
