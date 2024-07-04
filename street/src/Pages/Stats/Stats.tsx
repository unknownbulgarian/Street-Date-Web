import styles from './Stats.module.css'
import Navbar from '../../Components/Navbar/Navbar'
import API from '../../Utils/API'
import Loader from '../../Components/Loader/Loader'
import LoaderTime from '../../Utils/LoaderTime'
import { useNavigate } from 'react-router-dom'

import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { FaHistory } from "react-icons/fa";


import { FaInstagram } from "react-icons/fa";
import { PiGameControllerFill } from "react-icons/pi";
import { FaShareAlt } from "react-icons/fa";
import { MdSettingsSuggest } from "react-icons/md";

import { ImCool2 } from "react-icons/im";
import { FaRegSadTear } from "react-icons/fa";
import TextIcon from '../../Components/TextIcon/TextIcon'

export default function Stats() {

  const { publicId } = useParams()

  const router = useNavigate()

  const [name, setName] = useState<string>('')
  const [instagrams, setInstagrams] = useState<number>(0)
  const [games, setGames] = useState<number>(0)
  const [rizz, setRizz] = useState<number>(0)

  const [isAuth, setIsAuth] = useState<boolean>(false)

  const [isLoading, setIsLoading] = useState<boolean>(true)





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
        LoaderTime.loader(setIsLoading)
      } else {
        setName(data.name)
        setInstagrams(data.instagramCount)
        setGames(data.totalGames)

        setRizz((data.instagramCount / data.totalGames) * 100)
        getAuth()
      }

      //console.log(data)

    } catch (error: any) {
    }
  }

  const getAuth = async () => {
    const token = localStorage.getItem('token')
    try {
      const response = await fetch(API.api + '/getAuth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token, publicId })
      });

      const responseData = await response.json();

      const data = responseData

      console.log(data)

      if (data.error) {
        setIsAuth(false)
        LoaderTime.loader(setIsLoading)
      } else {
        setIsAuth(true)
        LoaderTime.loader(setIsLoading)
      }

      //console.log(data)

    } catch (error: any) {
    }
  }



  useEffect(() => {
    getUserInfo()
  }, [publicId])

  const getRizzColor = () => {
    if (rizz < 50) {
      return 'red'
    } else if (rizz < 80) {
      return 'orange'
    } else if (rizz < 100) {
      return 'green'
    } else if (rizz >= 100) {
      return 'lightgreen'
    } else {
      return 'red'
    }
  }

  return (
    <>
      {isLoading && <Loader />}


      {!isLoading && (
        <>
          <Navbar />



          {name && (
            <div className={styles.area}>
              <h1>
                <span>{name[0].toUpperCase() + name.slice(1)}</span> Statistiken
              </h1>
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
                  <h3>
                    Gesamter Rizz: <span style={{ color: getRizzColor() }}>{rizz > 0 ? rizz.toFixed(0) : rizz}%</span>
                  </h3>
                </div>
              </div>


              {isAuth && (
                <div className={styles.auth}>
                  <TextIcon
                    title='Deine Spiele'
                    borderRadius='0.3em'
                    backgroundColor='rgba(152, 78, 248, 0.568)'
                    width='190px'
                    height='30px'
                    color='white'
                    onClick={() => { router('/statistiken/' + `${publicId}/` + 'spiele/' + '1') }}
                    boxShadow='5px 5px 10px rgba(0, 0, 0, 0.5)'
                    onHover={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(152, 78, 248, 0.8)';
                    }}
                    onUnHover={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(152, 78, 248, 0.568)';
                    }}
                  >
                    <FaHistory />
                  </TextIcon>

                  <TextIcon
                    title='Profil teilen'
                    borderRadius='0.3em'
                    backgroundColor='hsla(215, 100%, 69%, 0.5)'
                    width='190px'
                    height='30px'
                    color='white'
                    boxShadow='5px 5px 10px rgba(0, 0, 0, 0.5)'
                    onHover={(e) => {
                      e.currentTarget.style.backgroundColor = 'hsla(215, 100%, 69%, 0.8)';
                    }}
                    onUnHover={(e) => {
                      e.currentTarget.style.backgroundColor = 'hsla(215, 100%, 69%, 0.5)';
                    }}
                  >
                    <FaShareAlt />
                  </TextIcon>
                </div>
              )}
            </div>
          )}

          {!name && (
            <div className={styles.notexist}>
              <FaRegSadTear className={styles.sad} />
              <h1>
                Benutzer existiert nicht | <span style={{ color: 'red' }}>ERROR 404</span>
              </h1>
            </div>
          )}
        </>
      )}
    </>
  );
}