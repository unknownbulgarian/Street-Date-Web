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
      <Navbar tab={1} />
      <div className={styles.main}>
        <div className={styles.welcome} data-aos="fade-right">
          <h1><span className={styles.no}>Street</span> Online Blind Date</h1>
          <p>Du willst nicht nach draußen gehen, um das Spiel zu spielen? Keine Sorge, du kannst es jetzt auch online spielen!</p>
          <div className={styles.btns}>
            <TextIcon
              borderRadius='0.3em'
              title='Als Gast versuchen'
              width='210px'
              color='white'
              background='linear-gradient(90deg, rgba(176,88,242,1) 65%, rgba(197,165,255,1) 100%)'
              boxShadow='5px 5px 10px rgba(0, 0, 0, 0.5)'
              height='33px'
              iconFontSize='1.3rem'
              transition='all 800ms'
              onClick={() => { nav(isSession ? '/profilbereich' : '/versuchen') }}
            >
              <IoRocketOutline />
            </TextIcon>
            <TextIcon
              borderRadius='0.3em'
              title='Ein Konto erstellen'
              width='210px'
              color='white'
              background='linear-gradient(98deg, rgba(162,74,245,1) 17%, rgba(165,79,246,1) 100%)'
              boxShadow='5px 5px 10px rgba(0, 0, 0, 0.5)'
              height='33px'
              iconFontSize='1.5rem'
              transition='all 800ms'
              onClick={() => { nav(isSession ? '/profilbereich' : '/registrierung') }}
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

      <div className={styles.boxes}>
        <div className={styles.box}>
          <div className={styles.boxtop}>
            <CiViewTimeline className={styles.boxicon} />
            <h2>Jetzt anfangen</h2>
          </div>
          <p>Starten Sie jetzt <strong>völlig kostenlos</strong> als Gast, erleben Sie das <strong>einfache Dating</strong> und haben Sie Spaß mit unserem Spiel.</p>
        </div>
        <div className={`${styles.box} ${styles.box2}`}>
          <div className={styles.boxtop}>
            <CiMoneyBill className={styles.boxicon} />
            <h2>Bezahlen, um <span style={{ textDecoration: 'line-through' }}>zu gewinnen</span></h2>
          </div>
          <p>Im Gegensatz zu anderen Dating-Plattformen ist unsere App <strong>nicht kostenpflichtig</strong>, es gibt <strong>keine speziellen</strong> Funktionen, die Ihr Date aufwerten.</p>
        </div>
        <div className={styles.box}>
          <div className={styles.boxtop}>
            <IoRocketOutline className={styles.boxicon} />
            <h2>Uniqe Partnersuche</h2>
          </div>
          <p>Unsere App ist für einfaches Dating für <strong>die jungen Leute</strong> da draußen gemacht und ausgerichtet.</p>
        </div>
      </div>


      <div className={styles.new}>
        <h2>Die <span style={{ textDecoration: 'underline' }}>neue</span> Generation der Partnersuche</h2>
        <p>Es ist 2024 und die meisten Dinge haben sich <strong>weiterentwickelt</strong>, so auch <strong>die Partnersuche</strong>. </p>
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
          title='Daten erkunden'
          width='200px'
          color='white'
          background='linear-gradient(98deg, rgba(181,116,193,1) 17%, rgba(148,49,235,1) 100%)'
          height='35px'
          transition='all 800ms'
        >
          <MdTravelExplore />
        </TextIcon>
      </div>


      <div className={styles.discordjoin}>
        <div className={styles.discordbox} data-aos="fade-right">
          <span><FaDiscord /></span>
          <div className={styles.discordtext}>
            <p>Du kannst das Spiel auch auf unserem Discord-Server spielen</p>
          </div>
          <TextIcon
            borderRadius='0.3em'
            title='Jetzt beitreten'
            width='210px'
            color='white'
            background='linear-gradient(98deg, rgba(162,74,245,1) 17%, rgba(165,79,246,1) 100%)'
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
        <h2 data-aos="fade-down">Dating sollte nicht <span className={styles.nothard}>kompliziert</span> sein</h2>
        <img data-aos="fade-right" src='https://i.postimg.cc/0N40Pcp5/Screenshot-2024-06-25-140805.png'></img>
        <div className={styles.secondboxes}>
          <div className={styles.secondbox} data-aos="zoom-in">
            <span className={styles.secondboxicon}><PiCrownSimpleFill /></span>
            <h3>Einfachheit</h3>
            <p>Du kannst buchstäblich in ein paar Minuten einen Partner finden</p>
          </div>

          <div className={styles.secondbox} data-aos="zoom-in">
            <span className={styles.secondboxicon}><FaStar /></span>
            <h3>Jeder hat eine Chance</h3>
            <p>Bei unserer App wird nicht bezahlt, um zu gewinnen, wir haben keine besonderen Funktionen, alle sind gleich</p>
          </div>
        </div>
      </div>

      <div className={styles.faq}>
        <h2 data-aos="fade-down">Häufig gestellte Fragen</h2>
        <div className={styles.faqboxes} data-aos="zoom-in">
          <div className={styles.faqbox}>
            <div className={styles.mainfaqbox} onClick={() => { faq === 1 ? setFaq(0) : setFaq(1) }}>
              <p>Wie alt muss man sein?</p>
              <span className={`${faq === 1 ? styles.rotatedicon : ''}`}><IoIosArrowForward /></span>
            </div>

            <div style={{
              height: faq === 1 ? '40px' : '0px',
            }} className={styles.expandbox}>
              <p>Du musst <strong>mindestens 18</strong> Jahre alt sein.</p>
            </div>
          </div>


          <div className={styles.faqbox}>
            <div className={styles.mainfaqbox} onClick={() => { faq === 2 ? setFaq(0) : setFaq(2) }}>
              <p>Wie man die App benutzt?</p>
              <span className={`${faq === 2 ? styles.rotatedicon : ''}`}><IoIosArrowForward /></span>
            </div>

            <div style={{
              height: faq === 2 ? '40px' : '0px',
            }} className={styles.expandbox}>
              <p>Besuch unserer Tutorial-Seite.</p>
            </div>
          </div>

          <div className={styles.faqbox}>
            <div className={styles.mainfaqbox} onClick={() => { faq === 3 ? setFaq(0) : setFaq(3) }}>
              <p>Ist sie völlig kostenlos?</p>
              <span className={`${faq === 3 ? styles.rotatedicon : ''}`}><IoIosArrowForward /></span>
            </div>

            <div style={{
              height: faq === 3 ? '40px' : '0px',
            }} className={styles.expandbox}>
              <p>Unsere App bietet <strong>keine Pay-to-Win-Funktionen</strong>. Der einzige Unterschied bei kostenlosen Konten besteht darin, dass Sie <strong>maximal 15 Dates pro Tag</strong> wahrnehmen können.</p>
            </div>
          </div>

          <div className={styles.faqbox}>
            <div className={styles.mainfaqbox} onClick={() => { faq === 4 ? setFaq(0) : setFaq(4) }}>
              <p>Muss ich irgendwelche persönlichen Informationen angeben?</p>
              <span className={`${faq === 4 ? styles.rotatedicon : ''}`}><IoIosArrowForward /></span>
            </div>

            <div style={{
              height: faq === 4 ? '40px' : '0px',
            }} className={styles.expandbox}>
              <p>Stelle sicher, dass du eine <strong>echte E-Mail-Adresse</strong> und einen <strong>echten Instagram-Namen</strong> angibst.</p>
            </div>
          </div>
        </div>
      </div>

      <Reviews />


      <Footer />
    </>
  )
}
