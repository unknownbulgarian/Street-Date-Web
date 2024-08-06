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
            Enjoy the freedom of dating at no cost! Our app is completely free, so you can meet new people and make real connections without any restrictions or hidden fees. Experience the joy of effortless interactions and genuine connections with no financial barriers.
          </p>
        )}

        {isProgress === 2 && (
          <p data-aos="fade-left">
            No time to waste - dating has never been so easy! Our app quickly brings you to real encounters and meaningful conversations. Easily find suitable people who share your interests.
          </p>
        )}

        {isProgress === 3 && (
          <p data-aos="fade-left">
            Free and full of fun! Our app offers you the chance to playfully meet new people and make real connections at no cost. Get ready for exciting encounters and lots of fun!
          </p>
        )}

        <div className={styles.reviewfrom}>
          {isProgress === 1 && (
            <>
              <CiMoneyBill className={styles.reviewlogo} data-aos="fade-left" />
              <p data-aos="fade-left" className={styles.reviewfromtxt}>
                Free
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
                Time
              </p>
            </>
          )}
          {isProgress === 3 && (
            <>
              <LiaRocketchat className={styles.reviewlogo} data-aos="fade-left" />
              <p data-aos="fade-left" className={styles.reviewfromtxt}>
                Fun
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
            className={`${styles.track} ${isProgress === 1 ? styles.trackcolor : ''
              }`}
          ></div>

          <div
            onClick={() => {
              setProgress(2);
              clearInterval(intervalRef.current!);
              intervalRef.current = setInterval(loopCarousel, 7000);
            }}
            className={`${styles.track} ${isProgress === 2 ? styles.trackcolor : ''
              }`}
          ></div>

          <div
            onClick={() => {
              setProgress(3);
              clearInterval(intervalRef.current!);
              intervalRef.current = setInterval(loopCarousel, 7000);
            }}
            className={`${styles.track} ${isProgress === 3 ? styles.trackcolor : ''
              }`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
