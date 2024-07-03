import styles from './Stats.module.css'
import Navbar from '../../Components/Navbar/Navbar'
import API from '../../Utils/API'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'


import { FaInstagram } from "react-icons/fa";
import { PiGameControllerFill } from "react-icons/pi";
import { ImCool2 } from "react-icons/im";

export default function Stats() {

  const { publicId } = useParams()

  const [name, setName] = useState<string>('')
  const [instagrams, setInstagrams] = useState<number>(0)
  const [games, setGames] = useState<number>(0)
  const [rizz, setRizz] = useState<number>(0)



  const getUserInfo = async () => {
    try {
      const response = await fetch(API.api + '/getPublicData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ publicId })
      });

      const responseData = await response.json();

      const data = responseData

      //console.log(data)

      if (data.error) {

      } else {
        setName(data.name)
        setInstagrams(data.instagramCount)
        setGames(data.totalGames)

        setRizz((data.instagramCount / data.totalGames) * 100)
      }

      //console.log(data)

    } catch (error: any) {
    }
  }

  useEffect(() => {
    getUserInfo()
  }, [publicId])

  return (
    <>
      <Navbar />
      <div className={styles.area}>
        {name && <h1>{name[0].toUpperCase() + name.slice(1)} Statistiken</h1>}
        <div className={styles.stats}>

          <div className={styles.statbox}>
            <FaInstagram className={styles.staticon} />
            <h3>Instagrams genommen: {games}</h3>
          </div>

          <div className={styles.statbox}>
            <PiGameControllerFill className={styles.staticon} />
            <h3>Gespielte Spiele: {instagrams}</h3>
          </div>

          <div className={styles.statbox}>
            <ImCool2 className={styles.staticon} />
            <h3>Gesamter Rizz: {rizz}</h3>
          </div>

        </div>
      </div>
    </>
  )
}
