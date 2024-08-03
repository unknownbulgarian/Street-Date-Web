import { useEffect, useState } from 'react'
import styles from './App.module.css'
import { Link } from 'react-router-dom'

import { useOnlineProvider } from './States/Online/Online'
import { useSession } from './States/Session/Session'
import { PiCrownSimpleFill } from "react-icons/pi";
import { FaStar } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { FaDiscord } from "react-icons/fa";

import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'


export default function App() {

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
            <Link className='link' to={isSession ? '/profilbereich' : '/versuchen'}><button className={styles.guest}>Als Gast versuchen</button></Link>
            <Link className='link' to={isSession ? '/profilbereich' : '/registrierung'}><button className={styles.create}>Ein Konto erstellen</button></Link>
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
              <p>Du musst mindestens 18 Jahre alt sein.</p>
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
              <p>Unsere App bietet keine Pay-to-Win-Funktionen. Der einzige Unterschied bei kostenlosen Konten besteht darin, dass Sie maximal 15 Dates pro Tag wahrnehmen können.</p>
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
              <p>Stelle sicher, dass du eine echte E-Mail-Adresse und einen echten Instagram-Namen angibst.</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.discordjoin}>
        <div className={styles.discordbox} data-aos="fade-right">
          <span><FaDiscord /></span>
          <div className={styles.discordtext}>
            <p>Du kannst das Spiel auch auf unserem Discord-Server spielen</p>
          </div>
          <button onClick={() => {window.open('https://discord.gg/YDWqmevJxk', '_blank')}}>Beitreten</button>
        </div>
      </div>

      <Footer />
    </>
  )
}
