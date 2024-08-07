import { useEffect, useRef, useState } from 'react'
import styles from './App.module.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { useOnlineProvider } from './States/Online/Online'
import { useSession } from './States/Session/Session'
import { PiCrownSimpleFill } from "react-icons/pi";
import { FaStar } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { FaDiscord } from "react-icons/fa";
import { CiViewTimeline } from "react-icons/ci";
import { CiMoneyBill } from "react-icons/ci";
import { IoRocketOutline } from "react-icons/io5";
import { CiTimer } from "react-icons/ci";
import { CiChat1 } from "react-icons/ci";
import { CiLight } from "react-icons/ci";
import { CiStar } from "react-icons/ci";
import { GiMoneyStack } from "react-icons/gi";
import { IoIosPlanet } from "react-icons/io";
import { IoIosApps } from "react-icons/io";
import { IoEnterOutline } from "react-icons/io5";
import { MdTravelExplore } from "react-icons/md";

import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'
import TextIcon from './Components/TextIcon/TextIcon'
import Reviews from './Components/SwitchFaq/SwitchFaq'


export default function App() {

  const nav = useNavigate()

  const { removeOnline } = useOnlineProvider()
  const { isSession } = useSession()

  const [faq, setFaq] = useState<number>(0)






  useEffect(() => {
    removeOnline()
  }, [])

  return (
    <>
      <div className={styles.main}>
        <div className={styles.welcome} data-aos="fade-right">
          <h1><span className={styles.no}>Street</span> Online Blind Date</h1>
          <p>
            Don't want to go outside to play the game? Don't worry, you can now play it online from the comfort of your home and enjoy all the fun without stepping outside!</p>
          <div className={styles.btns}>
            <TextIcon
              borderRadius='0.3em'
              title='Try as Guest'
              width='180px'
              color='white'
              background='linear-gradient(90deg, rgba(176,88,242,1) 65%, rgba(197,165,255,1) 100%)'
              boxShadow='5px 5px 10px rgba(0, 0, 0, 0.5)'
              height='33px'
              iconFontSize='1.3rem'
              transition='all 800ms'
              onClick={() => { nav(isSession ? '/play' : '/try') }}
            >
              <IoRocketOutline />
            </TextIcon>
            <TextIcon
              borderRadius='0.3em'
              title='Create an Account'
              width='210px'
              color='white'
              background='linear-gradient(98deg, rgba(162,74,245,1) 17%, rgba(165,79,246,1) 100%)'
              boxShadow='5px 5px 10px rgba(0, 0, 0, 0.5)'
              height='33px'
              iconFontSize='1.5rem'
              transition='all 800ms'
              onClick={() => { nav(isSession ? '/play' : '/register') }}
            >
              <IoEnterOutline />
            </TextIcon>
          </div>

          <div className={styles.apps}>
            <img src='https://i.postimg.cc/MK1Pt217/Get-It-On-Google-Play-Badge-Web-color-English.png'></img>
            <img src='https://i.postimg.cc/FsXGYWw7/5a902db97f96951c82922874.png'></img>
          </div>
        </div>

        <div className={styles.right} data-aos="fade-left">
          <img src='https://i.postimg.cc/d3yWzgpK/up.png'></img>
        </div>
      </div>

      <div className={styles.boxes} data-aos="fade-down">
        <div className={styles.box}>
          <div className={styles.boxtop}>
            <CiViewTimeline className={styles.boxicon} />
            <h2>Start now</h2>
          </div>
          <p>Start now completely free of charge as a guest, experience easy dating and have fun with our game.</p>
        </div>
        <div className={`${styles.box} ${styles.box2}`}>
          <div className={styles.boxtop}>
            <CiMoneyBill className={styles.boxicon} />
            <h2>Pay <span style={{ textDecoration: 'line-through' }}>to win</span></h2>
          </div>
          <p>Unlike other dating platforms, our app is free of charge and there are no special features that add value to your date.</p>
        </div>
        <div className={styles.box}>
          <div className={styles.boxtop}>
            <IoRocketOutline className={styles.boxicon} />
            <h2>Uniqe Dating</h2>
          </div>
          <p>Our app is made and thoughtfully designed for easy and enjoyable dating experiences for the young people out there.</p>
        </div>
      </div>


      <div className={styles.new}>
        <h2>The <span style={{ textDecoration: 'underline' }}>new</span> Generation of Modern Dating</h2>
        <p>It's 2024 and most things have moved on, including dating.</p>
        <div className={styles.icons}>
          <CiTimer style={{ fontSize: '1rem' }} />
          <CiChat1 style={{ fontSize: '2rem' }} />
          <CiLight style={{ fontSize: '3rem' }} />
          <CiStar style={{ fontSize: '4rem', color: 'yellow' }} />
          <GiMoneyStack style={{ fontSize: '3rem' }} />
          <IoIosPlanet style={{ fontSize: '2rem' }} />
          <IoIosApps style={{ fontSize: '1rem' }} />
        </div>

        <TextIcon
          borderRadius='0.3em'
          title='Explore dates'
          width='180px'
          color='white'
          background='linear-gradient(98deg, rgba(181,116,193,1) 17%, rgba(148,49,235,1) 100%)'
          height='35px'
          transition='all 800ms'
          onClick={() => {nav('/explore/1')}}
        >
          <MdTravelExplore />
        </TextIcon>
      </div>


      <div className={styles.discordjoin}>
        <div className={styles.discordbox} data-aos="fade-right">
          <span><FaDiscord /></span>
          <div className={styles.discordtext}>
            <p>You can also play the game on our Discord server</p>
          </div>
          <TextIcon
            borderRadius='0.3em'
            title='Join now'
            width='170px'
            color='white'
            background='linear-gradient(90deg, rgba(176,88,242,1) 65%, rgba(197,165,255,1) 100%)'
            boxShadow='5px 5px 10px rgba(0, 0, 0, 0.5)'
            height='35px'
            iconFontSize='1.5rem'
            transition='all 800ms'
            onClick={() => { window.open('https://discord.gg/YDWqmevJxk', '_blank') }}
          >
            <IoEnterOutline />
          </TextIcon>
        </div>
      </div>

      <div className={styles.second}>
        <h2 data-aos="fade-down">Dating should not be <span className={styles.nothard}>complicated</span></h2>
        <img data-aos="fade-right" src='https://i.postimg.cc/NMzVbccm/Screenshot-12.png'></img>
        <div className={styles.secondboxes}>
          <div className={styles.secondbox} data-aos="zoom-in">
            <span className={styles.secondboxicon}><PiCrownSimpleFill /></span>
            <h3>Simplicity</h3>
            <p>You can literally find a partner in just a few minutes with ease and convenience.</p>
          </div>

          <div className={styles.secondbox} data-aos="zoom-in">
            <span className={styles.secondboxicon}><FaStar /></span>
            <h3>Everyone has a chance</h3>
            <p>With our app, you don't pay to win; we don't have any special features or perks. Everyone is treated equally and fairly, ensuring a level playing field for all users.






</p>
          </div>
        </div>
      </div>

      <div className={styles.faq}>
        <h2 data-aos="fade-down">Frequently asked questions</h2>
        <div className={styles.faqboxes} data-aos="zoom-in">
          <div className={styles.faqbox}>
            <div className={styles.mainfaqbox} onClick={() => { faq === 1 ? setFaq(0) : setFaq(1) }}>
              <p>How old do you have to be?</p>
              <span className={`${faq === 1 ? styles.rotatedicon : ''}`}><IoIosArrowForward /></span>
            </div>

            <div style={{
              height: faq === 1 ? '40px' : '0px',
            }} className={styles.expandbox}>
              <p>You have to be <strong>at least 18</strong> years old.</p>
            </div>
          </div>


          <div className={styles.faqbox}>
            <div className={styles.mainfaqbox} onClick={() => { faq === 2 ? setFaq(0) : setFaq(2) }}>
              <p>How to use the app?</p>
              <span className={`${faq === 2 ? styles.rotatedicon : ''}`}><IoIosArrowForward /></span>
            </div>

            <div style={{
              height: faq === 2 ? '40px' : '0px',
            }} className={styles.expandbox}>
              <p>Visit our documentation page.</p>
            </div>
          </div>

          <div className={styles.faqbox}>
            <div className={styles.mainfaqbox} onClick={() => { faq === 3 ? setFaq(0) : setFaq(3) }}>
              <p>Is it completely free of charge?</p>
              <span className={`${faq === 3 ? styles.rotatedicon : ''}`}><IoIosArrowForward /></span>
            </div>

            <div style={{
              height: faq === 3 ? '40px' : '0px',
            }} className={styles.expandbox}>
              <p>Our app does not offer any pay-to-win functions. The only difference with free accounts is that you can go on a maximum of 15 dates per day.</p>
            </div>
          </div>

          <div className={styles.faqbox}>
            <div className={styles.mainfaqbox} onClick={() => { faq === 4 ? setFaq(0) : setFaq(4) }}>
              <p>Do I have to provide any personal information?</p>
              <span className={`${faq === 4 ? styles.rotatedicon : ''}`}><IoIosArrowForward /></span>
            </div>

            <div style={{
              height: faq === 4 ? '40px' : '0px',
            }} className={styles.expandbox}>
              <p>Make sure you enter a real email address and a real Instagram name.</p>
            </div>
          </div>
        </div>
      </div>

      <Reviews />
    </>
  )
}
