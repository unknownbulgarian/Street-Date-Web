import React, { useEffect, useRef, useState } from 'react'
import styles from './Try.module.css'

import Navbar from '../../Components/Navbar/Navbar'

import API from '../../Utils/API'
import Error from '../../Components/Error/Error'

import QuestionBox from './QuestionBox/QuestionBox'
import QuestionBoxO from './QuestionBoxO/QuestionBoxO'

import { IoMdClose } from "react-icons/io";
import { useOnlineProvider } from '../../States/Online/Online'

import { IoSearchOutline } from "react-icons/io5";

interface someone {
  username: string
  gender: string
}

export default function Try() {

  const { removeOnline, isOnline } = useOnlineProvider()

  const [username, setUsername] = useState<string>('')
  const [isUsername, setIsUsername] = useState<boolean>(true)
  const [isTypedUsername, setIsTypeUsername] = useState<boolean>(false)

  const [error4, setError4] = useState<string>('')

  const [gender, setGender] = useState<string>('')
  const [photo, setPhoto] = useState<File | null>(null);
  const [instagram, setInstagram] = useState<string>('')

  const [progress, setProgress] = useState<number>(1)

  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [isOtherFound, setIsOtherFound] = useState<boolean>(false)

  const [someone, setSomeone] = useState<someone>({ username: '', gender: '' })
  const [yourId, setYourId] = useState<string>('')
  const [roomId, setRoomId] = useState<string>('')

  const [isOtherOnline, setIsOtherOnline] = useState<boolean>(true)


  //game vars & functions starts from here

  const [gameProgress, setGameProgress] = useState<number>(1)
  const [isFirst, setIsFirst] = useState<boolean>(false)

  const [yourUsername, setYourUsername] = useState<string>('')
  const [partnerUsername, setPartnerUsername] = useState<string>('')


  const [Q1, setQ1] = useState<string>('')
  const [A1, setA1] = useState<string>('')

  const [Q2, setQ2] = useState<string>('')
  const [A2, setA2] = useState<string>('')

  const [Q3, setQ3] = useState<string>('')
  const [A3, setA3] = useState<string>('')

  const [Q4, setQ4] = useState<string>('')
  const [A4, setA4] = useState<string>('')

  const [Q5, setQ5] = useState<string>('')
  const [A5, setA5] = useState<string>('')

  const [Q6, setQ6] = useState<string>('')
  const [A6, setA6] = useState<string>('')

  const [photoCounter, setPhotoCounter] = useState<number>(5)
  const [photoUrl, setPhotoUrl] = useState<string>('')
  const [answer, setAnswer] = useState<string>('')

  const [isSkipped, setSkipped] = useState<boolean>(false)

  const intervalRef = useRef<any | null>(null);
  const skipRef = useRef<any | null>(null);

  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState<string>('')

  useEffect(() => {
    let errorTimeout: any;
    clearTimeout(errorTimeout)

    if (error !== '') {
      setSuccess('')
      errorTimeout = setTimeout(() => {
        setError('')
      }, 6000);
    }

    return () => {
      clearInterval(errorTimeout)
    }
  }, [error])

  useEffect(() => {
    let successTimeout: any;
    clearTimeout(successTimeout)

    if (success !== '') {
      setError('')
      successTimeout = setTimeout(() => {
        setSuccess('')
      }, 6000);
    }

    return () => {
      clearTimeout(successTimeout)
    }
  }, [success])

  const resetGame = () => {
    setAnswer('')
    setPhotoUrl('')
    setA6('')
    setA5('')
    setA4('')
    setA3('')
    setA2('')
    setA1('')
    setQ5('')
    setQ4('')
    setQ3('')
    setQ2('')
    setQ1('')
    setPartnerUsername('')
    setIsFirst(false)
    setGameProgress(1)
    setRoomId('')
    setIsOtherFound(false)
    setSkipped(false)
    setIsOtherOnline(true)
    setError('')
    setPhotoUrl('')
    setSuccess('')
    clearInterval(intervalRef.current)
  }

  const getGameProgress = async (roomId: string) => {
    try {
      const response = await fetch(API.api + '/getGameProgress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ roomId })
      });

      const responseData = await response.json();

      const data = responseData

      //console.log(data)

      if (data.error) {

      } else {
        setGameProgress(data.gameProgress)
      }

      //console.log(data)

    } catch (error: any) {
      //  console.log(error)
    }
  }

  const getUsernames = async (roomId: string) => {
    try {
      const response = await fetch(API.api + '/getUsernames', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ roomId, userId: yourId })
      });

      const responseData = await response.json();

      const data = responseData

      //console.log(data)

      if (data.error) {

      } else {
        setYourUsername(data.ownUsername)
        setPartnerUsername(data.partnerUsername)
      }

      //console.log(data)

    } catch (error: any) {
      //  console.log(error)
    }

  }

  const writeQuestion1 = async (value: string) => {
    try {
      const response = await fetch(API.api + '/writeQuestion1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ online_id: localStorage.getItem('online_id'), userId: yourId, roomId, question: value })
      });

      const responseData = await response.json();

      const data = responseData

      console.log(data)

      if (data.error) {
        setError(data.error)
      } else {

      }

      //console.log(data)

    } catch (error: any) {
      //  console.log(error)
    }
  }

  const getQuestion1 = async () => {
    try {
      const response = await fetch(API.api + '/getQuestion1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ online_id: localStorage.getItem('online_id'), userId: yourId, roomId })
      });

      const responseData = await response.json();

      const data = responseData

      //console.log(data)

      if (data.error) {

      } else {
        setQ1(data.question)
      }

      //console.log(data)

    } catch (error: any) {
      //  console.log(error)
    }
  }

  const writeAnswer1 = async (value: string) => {
    try {
      const response = await fetch(API.api + '/writeAnswer1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ online_id: localStorage.getItem('online_id'), userId: yourId, roomId, answer: value })
      });

      const responseData = await response.json();

      const data = responseData

      //console.log(data)

      if (data.error) {
        setError(data.error)
      } else {

      }

      //console.log(data)
    } catch (error: any) {
      //  console.log(error)
    }
  }

  const getAnswer1 = async () => {
    try {
      const response = await fetch(API.api + '/getAnswer1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ online_id: localStorage.getItem('online_id'), userId: yourId, roomId })
      });

      const responseData = await response.json();

      const data = responseData

      //console.log(data)

      if (data.error) {

      } else {
        setA1(data.answer)
      }

      //console.log(data)

    } catch (error: any) {
      //  console.log(error)

    }
  }

  const writeQuestion2 = async (value: string) => {
    try {
      const response = await fetch(API.api + '/writeQuestion2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ online_id: localStorage.getItem('online_id'), userId: yourId, roomId, question: value })
      });

      const responseData = await response.json();

      const data = responseData

      //console.log(data)

      if (data.error) {
        setError(data.error)
      } else {

      }

      //console.log(data)

    } catch (error: any) {
      //  console.log(error)
    }
  }

  const getQuestion2 = async () => {
    try {
      const response = await fetch(API.api + '/getQuestion2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ online_id: localStorage.getItem('online_id'), userId: yourId, roomId })
      });

      const responseData = await response.json();

      const data = responseData

      //console.log(data)

      if (data.error) {

      } else {
        setQ2(data.question)
      }

      //console.log(data)

    } catch (error: any) {
      //  console.log(error)
    }
  }

  const writeAnswer2 = async (value: string) => {
    try {
      const response = await fetch(API.api + '/writeAnswer2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ online_id: localStorage.getItem('online_id'), userId: yourId, roomId, answer: value })
      });

      const responseData = await response.json();

      const data = responseData

      //console.log(data)

      if (data.error) {
        setError(data.error)
      } else {

      }

      //console.log(data)
    } catch (error: any) {
      //  console.log(error)
    }
  }

  const getAnswer2 = async () => {
    try {
      const response = await fetch(API.api + '/getAnswer2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ online_id: localStorage.getItem('online_id'), userId: yourId, roomId })
      });

      const responseData = await response.json();

      const data = responseData

      //console.log(data)

      if (data.error) {

      } else {
        setA2(data.answer)
      }

      //console.log(data)

    } catch (error: any) {
      //  console.log(error)

    }
  }

  const writeQuestion3 = async (value: string) => {
    try {
      const response = await fetch(API.api + '/writeQuestion3', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ online_id: localStorage.getItem('online_id'), userId: yourId, roomId, question: value })
      });

      const responseData = await response.json();

      const data = responseData

      //console.log(data)

      if (data.error) {
        setError(data.error)
      } else {

      }

      //console.log(data)

    } catch (error: any) {
      //  console.log(error)
    }
  }

  const getQuestion3 = async () => {
    try {
      const response = await fetch(API.api + '/getQuestion3', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ online_id: localStorage.getItem('online_id'), userId: yourId, roomId })
      });

      const responseData = await response.json();

      const data = responseData

      //console.log(data)

      if (data.error) {

      } else {
        setQ3(data.question)
      }

      //console.log(data)

    } catch (error: any) {
      //  console.log(error)
    }
  }

  const writeAnswer3 = async (value: string) => {
    try {
      const response = await fetch(API.api + '/writeAnswer3', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ online_id: localStorage.getItem('online_id'), userId: yourId, roomId, answer: value })
      });

      const responseData = await response.json();

      const data = responseData

      //console.log(data)

      if (data.error) {
        setError(data.error)
      } else {

      }

      //console.log(data)
    } catch (error: any) {
      //  console.log(error)
    }
  }

  const getAnswer3 = async () => {
    try {
      const response = await fetch(API.api + '/getAnswer3', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ online_id: localStorage.getItem('online_id'), userId: yourId, roomId })
      });

      const responseData = await response.json();

      const data = responseData

      //console.log(data)

      if (data.error) {

      } else {
        setA3(data.answer)
      }

      //console.log(data)

    } catch (error: any) {
      //  console.log(error)

    }
  }


  const writeQuestion4 = async (value: string) => {
    try {
      const response = await fetch(API.api + '/writeQuestion4', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ online_id: localStorage.getItem('online_id'), userId: yourId, roomId, question: value })
      });

      const responseData = await response.json();

      const data = responseData

      //console.log(data)

      if (data.error) {
        setError(data.error)
      } else {

      }

      //console.log(data)

    } catch (error: any) {
      //  console.log(error)
    }
  }

  const getQuestion4 = async () => {
    try {
      const response = await fetch(API.api + '/getQuestion4', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ online_id: localStorage.getItem('online_id'), userId: yourId, roomId })
      });

      const responseData = await response.json();

      const data = responseData

      //console.log(data)

      if (data.error) {

      } else {
        setQ4(data.question)
        //  console.log(data.question)
      }

      //console.log(data)

    } catch (error: any) {
      //  console.log(error)
    }
  }

  const writeAnswer4 = async (value: string) => {
    try {
      const response = await fetch(API.api + '/writeAnswer4', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ online_id: localStorage.getItem('online_id'), userId: yourId, roomId, answer: value })
      });

      const responseData = await response.json();

      const data = responseData

      //console.log(data)

      if (data.error) {
        setError(data.error)
      } else {

      }

      //console.log(data)
    } catch (error: any) {
      //  console.log(error)
    }
  }

  const getAnswer4 = async () => {
    try {
      const response = await fetch(API.api + '/getAnswer4', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ online_id: localStorage.getItem('online_id'), userId: yourId, roomId })
      });

      const responseData = await response.json();

      const data = responseData

      //console.log(data)

      if (data.error) {

      } else {
        setA4(data.answer)
      }

      //console.log(data)

    } catch (error: any) {
      //  console.log(error)

    }
  }

  const writeQuestion5 = async (value: string) => {
    try {
      const response = await fetch(API.api + '/writeQuestion5', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ online_id: localStorage.getItem('online_id'), userId: yourId, roomId, question: value })
      });

      const responseData = await response.json();

      const data = responseData

      //console.log(data)

      if (data.error) {
        setError(data.error)
      } else {

      }

      //console.log(data)

    } catch (error: any) {
      //  console.log(error)
    }
  }

  const getQuestion5 = async () => {
    try {
      const response = await fetch(API.api + '/getQuestion5', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ online_id: localStorage.getItem('online_id'), userId: yourId, roomId })
      });

      const responseData = await response.json();

      const data = responseData

      //console.log(data)

      if (data.error) {

      } else {
        setQ5(data.question)
        // console.log(data.question)
      }

      //console.log(data)

    } catch (error: any) {
      //  console.log(error)
    }
  }

  const writeAnswer5 = async (value: string) => {
    try {
      const response = await fetch(API.api + '/writeAnswer5', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ online_id: localStorage.getItem('online_id'), userId: yourId, roomId, answer: value })
      });

      const responseData = await response.json();

      const data = responseData

      //console.log(data)

      if (data.error) {
        setError(data.error)
      } else {

      }

      //console.log(data)
    } catch (error: any) {
      //  console.log(error)
    }
  }

  const getAnswer5 = async () => {
    try {
      const response = await fetch(API.api + '/getAnswer5', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ online_id: localStorage.getItem('online_id'), userId: yourId, roomId })
      });

      const responseData = await response.json();

      const data = responseData

      //console.log(data)

      if (data.error) {

      } else {
        setA5(data.answer)
      }

      //console.log(data)

    } catch (error: any) {
      //  console.log(error)

    }
  }

  const writeQuestion6 = async (value: string) => {
    try {
      const response = await fetch(API.api + '/writeQuestion6', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ online_id: localStorage.getItem('online_id'), userId: yourId, roomId, question: value })
      });

      const responseData = await response.json();

      const data = responseData

      //console.log(data)

      if (data.error) {
        setError(data.error)
      } else {

      }

      //console.log(data)

    } catch (error: any) {
      //  console.log(error)
    }
  }

  const getQuestion6 = async () => {
    try {
      const response = await fetch(API.api + '/getQuestion6', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ online_id: localStorage.getItem('online_id'), userId: yourId, roomId })
      });

      const responseData = await response.json();

      const data = responseData

      //console.log(data)

      if (data.error) {

      } else {
        setQ6(data.question)
        // console.log(data.question)
      }

      //console.log(data)

    } catch (error: any) {
      //  console.log(error)
    }
  }

  const writeAnswer6 = async (value: string) => {
    try {
      const response = await fetch(API.api + '/writeAnswer6', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ online_id: localStorage.getItem('online_id'), userId: yourId, roomId, answer: value })
      });

      const responseData = await response.json();

      const data = responseData

      //console.log(data)

      if (data.error) {
        setError(data.error)
      } else {

      }

      //console.log(data)
    } catch (error: any) {
      //  console.log(error)
    }
  }

  const getAnswer6 = async () => {
    try {
      const response = await fetch(API.api + '/getAnswer6', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ online_id: localStorage.getItem('online_id'), userId: yourId, roomId })
      });

      const responseData = await response.json();

      const data = responseData

      //console.log(data)

      if (data.error) {

      } else {
        setA6(data.answer)
      }

      //console.log(data)

    } catch (error: any) {
      //  console.log(error)

    }
  }



  const getPhoto = async () => {
    try {
      const response = await fetch(API.api + '/getPhoto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ online_id: localStorage.getItem('online_id'), userId: yourId, roomId })
      });

      const responseData = await response.json();

      const data = responseData

      //console.log(data)

      if (data.error) {

      } else {
        const timer = setInterval(() => {
          setPhotoCounter(prevTimer => prevTimer - 1);
        }, 1000)
        setTimeout(() => {
          setPhotoUrl(data.photo)
        }, 5000);
      }

      //console.log(data)

    } catch (error: any) {
      //  console.log(error)

    }
  }

  const finalAnswer = async (value: string) => {
    try {
      const response = await fetch(API.api + '/finalAnswer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ online_id: localStorage.getItem('online_id'), userId: yourId, roomId, answer: value })
      });

      const responseData = await response.json();

      const data = responseData

      //console.log(data)
      if (data.error) {
        setError(data.error)
        setSuccess('')
      } else {
        setError('')
        setSuccess('Du hast die Antwort erfolgreich abgeschickt!')
      }

      //console.log(data)

    } catch (error: any) {
      //  console.log(error)

    }
  }

  const getAnswer = async () => {
    try {
      const response = await fetch(API.api + '/getAnswer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ online_id: localStorage.getItem('online_id'), userId: yourId, roomId })
      });

      const responseData = await response.json();

      const data = responseData

      // console.log(data)

      if (data.error) {

      } else {
        setAnswer(data.answer)
      }

      //console.log(data)

    } catch (error: any) {
      //  console.log(error)

    }
  }

  const startInterval = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      if (photoUrl !== '') {
        getAnswer();
      }
    }, 1000);
  };

  const clearIntervalHandler = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    startInterval();

    return () => clearIntervalHandler();
  }, [photoUrl]);

  useEffect(() => {
    if (answer !== '') {
      window.scroll(0, 300000000000000)
    }
  }, [answer])



  useEffect(() => {
    let gameInterval: any;

    if (roomId !== '') {
      getUsernames(roomId)
      gameInterval = setInterval(() => {
        getGameProgress(roomId);
      }, 1000);
    }

    return () => {
      clearInterval(gameInterval);
    };
  }, [roomId]);

  useEffect(() => {
    if (gameProgress > 1) {
      getQuestion1()
    }
    if (gameProgress > 2) {
      getAnswer1()
    }

    if (gameProgress > 3) {
      getQuestion2()
    }

    if (gameProgress > 4) {
      getAnswer2()
    }

    if (gameProgress > 5) {
      getQuestion3()
    }
    if (gameProgress > 6) {
      getAnswer3()
    }
    if (gameProgress > 7) {
      getQuestion4()
    }
    if (gameProgress > 8) {
      getAnswer4()
    }
    if (gameProgress > 9) {
      getQuestion5()
    }
    if (gameProgress > 10) {
      getAnswer5()
    }
    if (gameProgress > 11) {
      getQuestion6()
    }
    if (gameProgress > 12) {
      getAnswer6()
      getPhoto()
    }
  }, [gameProgress])

  useEffect(() => {
    let skipInterval: any;
    if (roomId !== '') {
      skipInterval = setInterval(() => {
        checkIfSkipped();
      }, 1000);
    }

    return () => {
      clearInterval(skipInterval);
    };
  }, [roomId]);


  //others functions starts from here


  const skipUser = async () => {
    try {
      const response = await fetch(API.api + '/skipUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ online_id: localStorage.getItem('online_id'), roomId })
      });

      const responseData = await response.json();

      const data = responseData

      console.log(data)

      if (data.error) {

      } else {
        findSomeone()
      }

      //console.log(data)

    } catch (error: any) {
      //  console.log(error)
    }
  }

  const checkIfSkipped = async () => {
    try {
      const response = await fetch(API.api + '/checkIfSkipped', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ online_id: localStorage.getItem('online_id'), roomId })
      });

      const responseData = await response.json();

      const data = responseData

      //console.log(data)

      if (data.error) {

      } else {
        if (data.skippedUser !== null) {
          setSkipped(true)
        }
      }


    } catch (error: any) {
      //  console.log(error)
    }
  }

  const checkIsOtherOnline = async () => {
    try {
      const response = await fetch(API.api + '/checkIsOtherOnline', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: yourId, roomId })
      });

      const responseData = await response.json();

      const data = responseData

      //console.log(data)

      if (data.error) {
        setIsOtherOnline(false)
      } else {
        setIsOtherOnline(true)
      }


    } catch (error: any) {
      //  console.log(error)
    }
  }

  useEffect(() => {

    let onlineInterval: any;

    if (roomId !== '') {
      onlineInterval = setInterval(() => {
        checkIsOtherOnline();
      }, 2000);
    }

    return () => {
      if (onlineInterval) {
        clearInterval(onlineInterval);
      }
    };
  }, [roomId]);




  useEffect(() => {
    if (!isSearching) {
      //removeOnline()
    }
  }, [isSearching])

  const checkUsername = (value: string) => {
    setUsername(value)
    setIsTypeUsername(true)
    const regex = /^.{1,15}$/;


    if (regex.test(value)) {
      setIsUsername(true)
      setError4('')
    } else {
      setIsUsername(false)
      setError4('Der Nutzername muss zwischen 1 und 15 Zeichen lang sein.')
    }
  }

  const addUser = async () => {

    if (!username) {
      setError('Der Nutzername darf nicht leer sein.')
    }

    if (isUsername && isTypedUsername) {
      try {
        const response = await fetch(API.api + '/addUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username })
        });

        const responseData = await response.json();

        const data = responseData

        if (data.error) {
          setError(data.error)
        } else {
          localStorage.setItem('online_id', data.id)
          setProgress(2)
          setYourId(data.userId)
          setError('')
        }

        // console.log(data)

      } catch (error: any) {
        //  console.log(error)
      }
    };
  }

  const addUserInfo = async () => {
    try {
      const formData = new FormData();
      formData.append('gender', gender);
      formData.append('instagram', instagram);
      const onlineId = localStorage.getItem('online_id');
      if (onlineId) {
        formData.append('online_id', onlineId);
      }
      if (photo) {
        formData.append('photo', photo);
      }
      const response = await fetch(API.api + '/addUserInfo', {
        method: 'POST',
        body: formData,
      });

      const responseData = await response.json();

      const data = responseData

      if (data.error) {
        setError4(data.error)
      } else {
        setError4('')
        setIsSearching(true)
        setProgress(3)
      }

      // console.log(data)

    } catch (error: any) {
      //  console.log(error)
    }
  };

  const errorTop = () => {

    let top: string = '0em';

    switch (progress) {
      case 1:
        top = '25em';
        break;
      case 2:
        top = '18em';
        break;
    }

    return top;
  };

  //main

  const findSomeone = async () => {
    try {
      const response = await fetch(API.api + '/findSomeone', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ online_id: localStorage.getItem('online_id') })
      });

      const responseData = await response.json();

      const data = responseData

      //console.log(data)

      if (data.error) {
        setIsOtherFound(false)
        checkIfJoinedRoom()
      } else {
        setYourId(data.userId)
        setSkipped(false)
        setIsOtherFound(true)
        setSomeone(data.randomUser)
        await joinRoom(data.userId, data.randomUser.userId)
      }

      //console.log(data)

    } catch (error: any) {
      //  console.log(error)
    }

  }

  const checkIfJoinedRoom = async () => {
    try {
      const response = await fetch(API.api + '/checkIfJoinedRoom', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ online_id: localStorage.getItem('online_id') })
      });

      const responseData = await response.json();

      const data = responseData

      //console.log(data)

      if (data.error) {
        //   setIsOtherFound(false)
      } else {
        setYourId(data.userId)
        setIsOtherFound(true)
        setSkipped(false)
        // setSomeone(data.randomUser)
        await joinRoom(data.userId, data.otherUserId)
      }

      //console.log(data)

    } catch (error: any) {
      //  console.log(error)
    }

  }

  const joinRoom = async (user_id: string, found_id: string) => {
    try {
      const response = await fetch(API.api + '/createRoom', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_id, found_id })
      });

      const responseData = await response.json();

      const data = responseData


      if (data.error) {

      } else {
        setRoomId(data.roomId)
        await getFirst(user_id, data.roomId)
      }

      //console.log(data)

    } catch (error: any) {
      //  console.log(error)
    }
  }


  const getFirst = async (user_id: string, roomId: string) => {
    try {
      const response = await fetch(API.api + '/getFirst', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ roomId })
      });

      const responseData = await response.json();

      const data = responseData

      //console.log(data)

      if (data.error) {

      } else {
        setIsFirst(data.first === user_id);
      }
      //console.log(data)
    } catch (error: any) {
      //  console.log(error)
    }

  }



  useEffect(() => {
    const searchInterval = setInterval(() => {
      if (isSearching && !isOtherFound) {
        findSomeone();
      } else {
        clearInterval(searchInterval);
      }
    }, 1000);

    return () => clearInterval(searchInterval);
  }, [isSearching, isOtherFound]);


  return (
    <>



      {error !== '' &&
        <div className={styles.error} data-aos="fade-down">
          <p>{error}</p>
        </div>
      }

      {success !== '' &&
        <div className={styles.success} data-aos="fade-down">
          <p>{success}</p>
        </div>
      }



      {!isOtherFound &&
        <>
          <Navbar />
          <div className={styles.main}>

            {progress === 1 &&
              <div className={styles.enter} data-aos="fade-down">
                <input style={{
                  border: !isUsername && isTypedUsername ? '2px solid red' : ''
                }} spellCheck={false} autoComplete='off' onInput={(e) => { checkUsername(e.currentTarget.value); }} onKeyDown={(e) => {
                  if (e.keyCode === 13) {
                    addUser()
                  }
                }} placeholder='Geben Sie Ihren Benutzernamen ein'></input>
                <button onClick={() => { addUser() }}>Weiter</button>
              </div>
            }
            {progress === 2 &&
              <div className={styles.lastinfo} data-aos="fade-down">
                <select onChange={(e) => { setGender(e.currentTarget.value) }}>
                  <option value=''>Wählen Sie Ihr Geschlecht</option>
                  <option value='Männlich'>Männlich</option>
                  <option value='Weiblich'>Weiblich</option>
                  <option value='Andere'>Andere</option>
                </select>

                <input type='text' placeholder='Schreiben Sie Ihr Instagram' onInput={(e) => { setInstagram(e.currentTarget.value) }}></input>


                <input onChange={(e) => {
                  if (e.currentTarget.files && e.currentTarget.files[0]) {
                    setPhoto(e.currentTarget.files[0]);
                  }
                }} type="file" name="file" id="file" className={styles.inputfile} />
                <label htmlFor="file">Wählen Sie ein Foto</label>

                <div className={styles.imageinfo}>
                  <p>Das Foto wird am Ende gezeigt, und das Instagram wird versteckt, bis Sie nicht sagen, Sie haben Interessen!</p>
                </div>

                <button onClick={() => { addUserInfo() }}>Ich bin bereit</button>
              </div>

            }

            {isSearching &&
              <div className={styles.search}>
                <div className={styles.searchicon}>
                  <IoSearchOutline />
                </div>

                <button onClick={() => { removeOnline(); setProgress(1); setIsSearching(false); setGender(''); setUsername(''); setPhoto(null); setIsOtherFound(false); }}>Suche beenden</button>
              </div>
            }

          </div>

          {error4 !== '' && <Error error={error4} bottom={errorTop()} />}
        </>
      }



      {isOtherFound &&
        <>

          {!isOnline &&
            <div style={{
              position: 'absolute',
              width: '100%',
              backgroundColor: 'red',
              paddingTop: '2em',
              paddingBottom: '2em',
              zIndex: '2',
              color: 'white'
            }}>
              <p style={{ paddingLeft: '2em', paddingRight: '2em' }}>Du bist offline, bitte stelle die Verbindung wieder her</p>
            </div>
          }

          {!isSkipped &&
            <div className={styles.skip}>
              <button onClick={() => { resetGame(); skipUser() }}>Überspringen / Weiter</button>
            </div>
          }

          <div className={styles.found}>
            <div className={styles.foundmain} data-aos="fade-down">
              <h1>Du bist auf einem Blind Date mit {partnerUsername}</h1>
              <p>{isFirst ? 'Sie werden der Person 3 Fragen stellen' : 'Die Person wird Ihnen nun 3 Fragen stellen, die Sie beantworten müssen'}</p>
            </div>

            <div className={styles.questions}
              style={{

              }}>
              <div className={styles.firstquestion}>

                <QuestionBox
                  writeQuestion={writeQuestion1}
                  writeAnswer={writeAnswer1}
                  question={Q1}
                  answer={A1}
                  isFirst={isFirst}
                  gameProgress={gameProgress}
                  partnerUsername={partnerUsername}
                  firstNum={1}
                  secondNum={2}
                  lastNum={2}
                />

                <QuestionBox
                  writeQuestion={writeQuestion2}
                  writeAnswer={writeAnswer2}
                  question={Q2}
                  answer={A2}
                  isFirst={isFirst}
                  gameProgress={gameProgress}
                  partnerUsername={partnerUsername}
                  firstNum={3}
                  secondNum={4}
                  lastNum={4}
                />

                <QuestionBox
                  writeQuestion={writeQuestion3}
                  writeAnswer={writeAnswer3}
                  question={Q3}
                  answer={A3}
                  isFirst={isFirst}
                  gameProgress={gameProgress}
                  partnerUsername={partnerUsername}
                  firstNum={5}
                  secondNum={6}
                  lastNum={6}
                />
              </div>

              {gameProgress > 6 && <p data-aos="fade-right" className={styles.middletxt}>{isFirst ? 'Nun wird Ihnen die Person 3 Fragen stellen' : 'Jetzt kannst du der Person 3 Fragen stellen'}</p>}


              <div className={styles.firstquestion}>

                <QuestionBoxO
                  writeQuestion={writeQuestion4}
                  writeAnswer={writeAnswer4}
                  question={Q4}
                  answer={A4}
                  isFirst={isFirst}
                  gameProgress={gameProgress}
                  partnerUsername={partnerUsername}
                  firstNum={7}
                  secondNum={8}
                  lastNum={8}
                />

                <QuestionBoxO
                  writeQuestion={writeQuestion5}
                  writeAnswer={writeAnswer5}
                  question={Q5}
                  answer={A5}
                  isFirst={isFirst}
                  gameProgress={gameProgress}
                  partnerUsername={partnerUsername}
                  firstNum={9}
                  secondNum={10}
                  lastNum={10}
                />

                <QuestionBoxO
                  writeQuestion={writeQuestion6}
                  writeAnswer={writeAnswer6}
                  question={Q6}
                  answer={A6}
                  isFirst={isFirst}
                  gameProgress={gameProgress}
                  partnerUsername={partnerUsername}
                  firstNum={11}
                  secondNum={12}
                  lastNum={12}
                />

              </div>

            </div>

            {gameProgress > 12 &&
              <div className={styles.showphoto}>
                <h2>Endgültige Ergebnisse</h2>
                {photoUrl === '' &&
                  <div className={styles.timerdiv}>
                    <p className={styles.timertxt}>Zeigen des Fotos der anderen Person in 5 Sekunden.</p>
                    <div className={styles.thetimer}></div>
                  </div>
                }
                {photoUrl !== '' && <img data-aos="fade-right" src={photoUrl}></img>}
                {photoUrl !== '' &&
                  <div className={styles.interests}>
                    <div className={styles.optionsin} data-aos="fade-right">
                      <button onClick={(e) => { finalAnswer(e.currentTarget.innerText) }} className={styles.positive}>Ja, ich habe Interessen.</button>
                      <button onClick={(e) => { finalAnswer(e.currentTarget.innerText) }} className={styles.positived}>Ich bin mir nicht 100% sicher, aber ich werde eine Chance geben.</button>
                      <button onClick={(e) => { finalAnswer(e.currentTarget.innerText) }} className={styles.middlepositive}>Nur Freunde, ich werde ihm trotzdem mein Instagram geben.</button>
                      <button onClick={(e) => { finalAnswer(e.currentTarget.innerText) }} className={styles.reject}>Nein, ich möchte keinen Kontakt.</button>
                    </div>

                    {answer !== '' &&
                      <div className={styles.finalanswer}>
                        <p><span style={{ textDecoration: 'underline' }}>{partnerUsername}</span> {` sagt: ${answer}`}</p>
                      </div>
                    }
                  </div>
                }
              </div>
            }

            {isSkipped &&
              <div className={styles.skipdiv}>
                <p className={styles.skiptxt}>{partnerUsername} hat dich übersprungen {'):'}</p>
                <button onClick={() => { resetGame(); skipUser() }}>Finde ein neues Spiel</button>
              </div>
            }

            {!isOtherOnline &&
              <div className={styles.skipdiv}>
                <p className={styles.skiptxt}>{partnerUsername} verließ den Raum {'):'}</p>
                <button onClick={() => { resetGame(); skipUser() }}>Finde ein neues Spiel</button>
              </div>
            }
          </div>
        </>
      }

    </>

  )
}
