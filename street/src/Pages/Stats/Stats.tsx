import styles from './Stats.module.css'
import Navbar from '../../Components/Navbar/Navbar'
import API from '../../Utils/API'
import Loader from '../../Components/Loader/Loader'
import LoaderTime from '../../Utils/LoaderTime'
import { useNavigate } from 'react-router-dom'

import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { FaComment, FaHeart, FaHistory, FaLaughBeam } from "react-icons/fa";


import { FaInstagram } from "react-icons/fa";
import { PiGameControllerFill } from "react-icons/pi";
import { FaShareAlt } from "react-icons/fa";
import { MdSettingsSuggest } from "react-icons/md";

import { ImCool2 } from "react-icons/im";
import { FaRegSadTear } from "react-icons/fa";
import TextIcon from '../../Components/TextIcon/TextIcon'
import { CiShare1 } from 'react-icons/ci'
import { BsEmojiDizzyFill, BsFillEmojiHeartEyesFill } from 'react-icons/bs'
import { GoComment } from 'react-icons/go'

interface answers {
  answer: string;
  instagram: string;
  userId: string;
}

interface questions {
  question: string;
  answer: string;
}

interface Post {
  Date: string;
  categories: Array<string>
  from: string;
  publicId: string;
  title: string;
  likes: number;
  love: number;
  lol: number;
  laugh: number;
  comments: Array<Object>;
  likeUsers: Array<string>;
  laughUsers: Array<string>;
  lolUsers: Array<string>;
  loveUsers: Array<string>;
  roomId: string;
  game: {
    answers: Array<answers>
    createdAt: string;
    finalAnswer: string;
    first: boolean;
    img: string;
    myUserId: string;
    partnerUsername: string;
    questions: Array<questions>
    roomId: string;
    users: Array<string>
  }
}

export default function Stats() {

  const { publicId } = useParams()

  const router = useNavigate()

  const [name, setName] = useState<string>('')
  const [instagrams, setInstagrams] = useState<number>(0)
  const [games, setGames] = useState<number>(0)
  const [sharedGames, setSharedGames] = useState<number>(0)
  const [rizz, setRizz] = useState<number>(0)
  const [totalReactions, setTotalReactions] = useState<number>(0)
  const [totalComments, setTotalComments] = useState<number>(0)
  const [publicId2, setPublicId] = useState<string>('')

  const [isAuth, setIsAuth] = useState<boolean>(false)

  const [posts, setPosts] = useState<Array<Post>>()

  const [isLoading, setIsLoading] = useState<boolean>(true)


  useEffect(() => {

    const public_id = localStorage.getItem('publicId') || ''

    if (public_id) {
      setPublicId(public_id)
    }
  }, [])

  const getUserPublicGames = async () => {
    try {
      const response = await fetch(API.api + '/getUserPublicGames', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ publicId })
      });

      const responseData = await response.json();

      const data = responseData

      // console.log(data)

      if (data.error) {

      } else {
        setPosts(data.games)
      }

      //console.log(data)

    } catch (error: any) {
    }
  }


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

      // console.log(data)

      if (data.error) {
        LoaderTime.loader(setIsLoading)
      } else {
        setName(data.name)
        setInstagrams(data.instagramCount)
        setGames(data.totalGames)
        setSharedGames(data.totalDocuments)
        setTotalReactions(data.totalLikes + data.totalLoves + data.totalLols + data.totalLaughs)
        setTotalComments(data.totalComments)

        setRizz((data.instagramCount / data.totalGames) * 100)
        getAuth()
        getUserPublicGames()
      }

      //console.log(data)

    } catch (error: any) {
    }
  }

  const getAuth = async () => {
    const token = localStorage.getItem('token')
    try {
      const response = await fetch(API.api + '/getStatsAuth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token, publicId })
      });

      const responseData = await response.json();

      const data = responseData

      // console.log(data)

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


  function copyCurrentUrl() {
    const currentUrl = window.location.href;

    const tempInput = document.createElement('input');
    tempInput.value = currentUrl;
    document.body.appendChild(tempInput);

    tempInput.select();
    tempInput.setSelectionRange(0, 99999);
    try {
      document.execCommand('copy');
      alert('URL copied to clipboard:');
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }

    document.body.removeChild(tempInput);
  }

  return (
    <>
      {isLoading && <Loader />}


      {!isLoading && (
        <>

          {name && (
            <div className={styles.area} data-aos="zoom-in">
              <h1>
                <span>{name[0].toUpperCase() + name.slice(1)}</span> Stats
              </h1>
              <div className={styles.stats}>
                <div className={styles.statbox}>
                  <FaInstagram className={styles.staticon} />
                  <h3>Instagrams taken: {instagrams}</h3>
                </div>
                <div className={styles.statbox}>
                  <PiGameControllerFill className={styles.staticon} />
                  <h3>Games Played: {games}</h3>
                </div>
                <div className={styles.statbox}>
                  <CiShare1 className={styles.staticon} />
                  <h3>Shared Games: {sharedGames}</h3>
                </div>
                <div className={styles.statbox}>
                  <FaHeart className={styles.staticon} />
                  <h3>Total Reactions: {totalReactions}</h3>
                </div>
                <div className={styles.statbox}>
                  <GoComment className={styles.staticon} />
                  <h3>Total Comments: {totalComments}</h3>
                </div>
                <div className={styles.statbox}>
                  <ImCool2 className={styles.staticon} />
                  <h3>
                    Total Rizz: <span style={{ color: getRizzColor() }}>{rizz > 0 ? rizz.toFixed(0) : rizz}%</span>
                  </h3>
                </div>
              </div>
              {isAuth && (
                <div className={styles.auth}>
                  <TextIcon
                    title='Your Games'
                    borderRadius='0.3em'
                    background='rgba(152, 78, 248, 0.568)'
                    width='170px'
                    height='30px'
                    color='white'
                    onClick={() => { router('/stats/' + `${publicId}/` + 'games/' + '1') }}
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
                    title='Share Profile'
                    borderRadius='0.3em'
                    background='hsla(215, 100%, 69%, 0.5)'
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
                    onClick={() => { copyCurrentUrl() }}
                  >
                    <FaShareAlt />
                  </TextIcon>
                </div>
              )}

              <div className={styles.posts}>
                {posts && posts?.length > 0 && <h2 className={styles.tit}>{isAuth ? 'Your published games' : `${name} published games`}:</h2>}
                {posts?.map((post, index) => (
                  <div
                    onClick={() => { router(`/explore/1/${post.roomId}`) }}
                    key={index} className={styles.post}>
                    <h2>{post.title[0].toUpperCase() + post.title.slice(1)}</h2>
                    <p>[Post from
                      <span onClick={(e) => { router(`/stats/${post.publicId}`); e.stopPropagation() }} className={styles.poster}> {post.from} </span>
                      at
                      <span className={styles.date}> {post.Date} </span>]
                    </p>

                    <div className={styles.categories}>
                      <>
                        <div className={styles.reactions}>
                          <div className={styles.reactionbox}>
                            <FaHeart style={{ color: post.likeUsers.includes(publicId2) ? '#dd62c9' : '' }} className={styles.reactionicon} />
                            <p>{post.likes}</p>
                          </div>

                          <div className={styles.reactionbox}>
                            <FaLaughBeam style={{color: post.laughUsers.includes(publicId2) ? '#dd62c9' : ''}} className={styles.reactionicon} />
                            <p>{post.laugh}</p>
                          </div>

                          <div className={styles.reactionbox}>
                            <BsEmojiDizzyFill style={{color: post.lolUsers.includes(publicId2) ? '#dd62c9' : ''}}  className={styles.reactionicon} />
                            <p>{post.lol}</p>
                          </div>

                          <div className={styles.reactionbox}>
                            <BsFillEmojiHeartEyesFill  style={{color: post.loveUsers.includes(publicId2) ? '#dd62c9' : ''}} className={styles.reactionicon} />
                            <p>{post.love}</p>
                          </div>

                          <div className={styles.reactionbox}>
                            <FaComment className={styles.reactionicon} />
                            <p>{post.comments.length}</p>
                          </div>
                        </div>

                        {post.categories.map((keyword, index) => (
                          <div key={index} className={styles.categoriebox}>
                            <h3>{keyword}</h3>
                          </div>
                        ))}
                      </>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}



          {!name && (
            <div className={styles.notexist}>
              <FaRegSadTear className={styles.sad} />
              <h1>
                User doesn't exist | <span style={{ color: 'red' }}>ERROR 404</span>
              </h1>
            </div>
          )}

        </>
      )}
    </>
  );
}