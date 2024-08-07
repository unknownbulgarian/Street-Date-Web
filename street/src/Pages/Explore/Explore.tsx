import styles from './page.module.css'
import Navbar from '../../Components/Navbar/Navbar'
import API from '../../Utils/API'
import Pagination from '../../Components/Pagination/Pagination'
import Loader from '../../Components/Loader/Loader'
import LoaderTime from '../../Utils/LoaderTime'

import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { FaComment, FaHeart, FaLaughBeam } from 'react-icons/fa'
import { BsEmojiDizzyFill, BsFillEmojiHeartEyesFill } from 'react-icons/bs'

import { useSession } from '../../States/Session/Session'

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



export default function Explore() {

    const { page } = useParams()
    const [totalPages, setTotalPages] = useState<number>(1)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [publicId, setPublicId] = useState<string>('')

    const [posts, setPosts] = useState<Array<Post>>()

    const {isSession} = useSession()

    const [isLoading, setIsLoading] = useState<boolean>(true)

    const router = useNavigate()

    const getPublicPosts = async () => {
        try {
            const response = await fetch(API.api + '/getPublicPosts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})
            });

            const responseData = await response.json();

            const data = responseData
            //console.log(data)

            if (data.errors) {

            } else {
                setTotalPages(data.totalPages)
                setPosts(data.posts)
                LoaderTime.loader(setIsLoading)
            }

            //console.log(data)

        } catch (error: any) {
            //  console.log(error)
        }
    }

    useEffect(() => {
        getPublicPosts()
    }, [page])

    useEffect(() => {

        const public_id = localStorage.getItem('publicId') || ''
        
         if(public_id) {
            setPublicId(public_id)
         }
    },[])


    const addLike = async (roomId : string) => {
        const token = localStorage.getItem('token')
        try {
            const response = await fetch(API.api + '/addLike', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ roomId, token })
            });

            const responseData = await response.json();

            const data = responseData

            // console.log(data)

            if (data.error) {
            
            } else {
                if (data.message === 'Like removed.') {
                    setPosts(prevPosts => {
                        if (!prevPosts) return [];
                
                        return prevPosts.map(post => ({
                            ...post,
                            likes: post.likes - 1,
                            likeUsers: post.likeUsers.filter(id => id !== publicId)
                        }));
                    });

                } else if (data.message = 'Like added.') {
                    setPosts(prevPosts => {
                        if (!prevPosts) return [];
                
                        return prevPosts.map(post => ({
                            ...post,
                            likes: post.likes + 1,
                            likeUsers: post.likeUsers.includes(publicId) ? post.likeUsers : [...post.likeUsers, publicId]
                        }));
                    });
                }
            }
        } catch (error: any) {
        }
    }

    const addLaugh = async (roomId : string) => {
        const token = localStorage.getItem('token')
        try {
            const response = await fetch(API.api + '/addLaugh', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ roomId, token })
            });

            const responseData = await response.json();

            const data = responseData

            //   console.log(data)

            if (data.error) {
            

            } else {
                if (data.message === 'Like removed.') {
                    setPosts(prevPosts => {
                        if (!prevPosts) return [];
                
                        return prevPosts.map(post => ({
                            ...post,
                            laugh: post.laugh - 1,
                            laughUsers: post.laughUsers.filter(id => id !== publicId)
                        }));
                    });
                } else if (data.message = 'Like added.') {
                    setPosts(prevPosts => {
                        if (!prevPosts) return [];
                
                        return prevPosts.map(post => ({
                            ...post,
                            laugh: post.laugh + 1,
                            laughUsers: post.laughUsers.includes(publicId) ? post.laughUsers : [...post.laughUsers, publicId]
                        }));
                    });
           
                }
            }
        } catch (error: any) {
        }
    }

    const addLol = async (roomId : string) => {
        const token = localStorage.getItem('token')
        try {
            const response = await fetch(API.api + '/addLol', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ roomId, token })
            });

            const responseData = await response.json();

            const data = responseData

            //  console.log(data)

            if (data.error) {
              

            } else {
                if (data.message === 'Like removed.') {
                    setPosts(prevPosts => {
                        if (!prevPosts) return [];
                
                        return prevPosts.map(post => ({
                            ...post,
                            lol: post.lol - 1,
                            lolUsers: post.lolUsers.filter(id => id !== publicId)
                        }));
                    });
                } else if (data.message = 'Like added.') {
                    setPosts(prevPosts => {
                        if (!prevPosts) return [];
                
                        return prevPosts.map(post => ({
                            ...post,
                            lol: post.lol + 1,
                            lolUsers: post.lolUsers.includes(publicId) ? post.lolUsers : [...post.lolUsers, publicId]
                        }));
                    });
                }
            }
        } catch (error: any) {
        }
    }

    const addLove = async (roomId : string) => {
        const token = localStorage.getItem('token')
        try {
            const response = await fetch(API.api + '/addLove', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ roomId, token })
            });

            const responseData = await response.json();

            const data = responseData

            // console.log(data)

            if (data.error) {
               

            } else {
                if (data.message === 'Like removed.') {
                    setPosts(prevPosts => {
                        if (!prevPosts) return [];
                
                        return prevPosts.map(post => ({
                            ...post,
                            love: post.love - 1,
                            loveUsers: post.loveUsers.filter(id => id !== publicId)
                        }));
                    });
                } else if (data.message = 'Like added.') {
                    setPosts(prevPosts => {
                        if (!prevPosts) return [];
                
                        return prevPosts.map(post => ({
                            ...post,
                            love: post.love + 1,
                            loveUsers: post.loveUsers.includes(publicId) ? post.loveUsers : [...post.loveUsers, publicId]
                        }));
                    });
                }
            }
        } catch (error: any) {
        }
    }


    return (
        <>

            {isLoading && <Loader />}

            {!isLoading &&
                <>

                    <div className={styles.posts}>
                        {posts?.map((post, index) => (
                            <div
                                onClick={() => { router(`/explore/${page}/${post.roomId}`) }}
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
                                                <FaHeart onClick={(e) => {isSession ? addLike(post.roomId) : '';  isSession ? e.stopPropagation() : ''}} style={{color: post.likeUsers.includes(publicId) ? '#dd62c9' : ''}} className={styles.reactionicon} />
                                                <p>{post.likes}</p>
                                            </div>

                                            <div className={styles.reactionbox}>
                                                <FaLaughBeam onClick={(e) => {isSession ? addLaugh(post.roomId) : '';  isSession ? e.stopPropagation() : ''}} style={{color: post.laughUsers.includes(publicId) ? '#dd62c9' : ''}} className={styles.reactionicon} />
                                                <p>{post.laugh}</p>
                                            </div>

                                            <div className={styles.reactionbox}>
                                                <BsEmojiDizzyFill onClick={(e) => {isSession ? addLol(post.roomId) : '';   isSession ? e.stopPropagation() : ''}} style={{color: post.lolUsers.includes(publicId) ? '#dd62c9' : ''}} className={styles.reactionicon} />
                                                <p>{post.lol}</p>
                                            </div>

                                            <div className={styles.reactionbox}>
                                                <BsFillEmojiHeartEyesFill onClick={(e) => {isSession ? addLove(post.roomId) : '';   isSession ? e.stopPropagation() : ''}} style={{color: post.loveUsers.includes(publicId) ? '#dd62c9' : ''}} className={styles.reactionicon} />
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

                    <Pagination
                        onPageChange={setCurrentPage}
                        currentPage={Number(page)}
                        totalPages={totalPages}
                    />
                </>
            }

        </>
    )
}
