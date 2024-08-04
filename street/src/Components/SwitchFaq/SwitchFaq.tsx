import React, { useEffect, useState, useRef } from 'react';
import styles from './SwitchFaq.module.css'


// icons
import { FaBuffer } from 'react-icons/fa';
import { CiMoneyBill } from "react-icons/ci";
import { FaBusinessTime } from "react-icons/fa";
import { LiaRocketchat } from "react-icons/lia";
// Define a type for the functional component
const Reviews: React.FC = () => {
  const [isProgress, setProgress] = useState<number>(1);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);



  const loopCarousel = () => {
    setProgress((prevProgress) => prevProgress + 1);
  };

  useEffect(() => {
    const leftArrow = document.getElementById('leftarrow');
    const rightArrow = document.getElementById('rightarrow');

    intervalRef.current = setInterval(loopCarousel, 7000);

    const handleArrowClick = (increment: number) => {
      setProgress((prevProgress) => prevProgress + increment);
      clearInterval(intervalRef.current!);
      intervalRef.current = setInterval(loopCarousel, 7000);
    };

    leftArrow?.addEventListener('click', () => handleArrowClick(-1));
    rightArrow?.addEventListener('click', () => handleArrowClick(1));

    return () => {
      clearInterval(intervalRef.current!);
    };
  }, []);

  useEffect(() => {
    if (isProgress > 3) {
      setProgress(1);
    }
    if (isProgress < 1) {
      setProgress(3);
    }
  }, [isProgress]);

  return (
    <div className={styles.reviews} data-aos="fade-up">
      <div className={styles.reviewtext}>
        {isProgress === 1 && (
          <p data-aos="fade-left">
           Genieße die Freiheit des Datings ohne Kosten! Unsere App ist komplett kostenlos, sodass du ohne Einschränkungen neue Leute kennenlernen und echte Verbindungen knüpfen kannst.
          </p>
        )}

        {isProgress === 2 && (
          <p data-aos="fade-left">
            Keine Zeit verlieren – Dating war noch nie so einfach! Unsere App bringt dich schnell zu echten Begegnungen und sinnvollen Gesprächen. Finde mühelos passende Personen, die deine Interessen teilen.
          </p>
        )}

        {isProgress === 3 && (
          <p data-aos="fade-left">
           Kostenlos und voller Spaß! Unsere App bietet dir die Chance, spielerisch neue Leute kennenzulernen und echte Verbindungen zu knüpfen, ganz ohne Kosten. Mach dich bereit für spannende Begegnungen und viel Vergnügen!
          </p>
        )}

        <div className={styles.reviewfrom}>
          {isProgress === 1 && (
            <>
              <CiMoneyBill className={styles.reviewlogo} data-aos="fade-left" />
              <p data-aos="fade-left" className={styles.reviewfromtxt}>
              Kostenlos
              </p>
            </>
          )}
          {isProgress === 2 && (
            <>
              <FaBusinessTime
                className={styles.reviewlogo}
                data-aos="fade-left"
              />
              <p data-aos="fade-left" className={styles.reviewfromtxt}>
              Zeit
              </p>
            </>
          )}
          {isProgress === 3 && (
            <>
              <LiaRocketchat className={styles.reviewlogo} data-aos="fade-left" />
              <p data-aos="fade-left" className={styles.reviewfromtxt}>
              Spaß
              </p>
            </>
          )}
        </div>

        <div className={styles.trackbar}>
          <div
            onClick={() => {
              setProgress(1);
              clearInterval(intervalRef.current!);
              intervalRef.current = setInterval(loopCarousel, 7000);
            }}
            className={`${styles.track} ${
              isProgress === 1 ? styles.trackcolor : ''
            }`}
          ></div>

          <div
            onClick={() => {
              setProgress(2);
              clearInterval(intervalRef.current!);
              intervalRef.current = setInterval(loopCarousel, 7000);
            }}
            className={`${styles.track} ${
              isProgress === 2 ? styles.trackcolor : ''
            }`}
          ></div>

          <div
            onClick={() => {
              setProgress(3);
              clearInterval(intervalRef.current!);
              intervalRef.current = setInterval(loopCarousel, 7000);
            }}
            className={`${styles.track} ${
              isProgress === 3 ? styles.trackcolor : ''
            }`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
