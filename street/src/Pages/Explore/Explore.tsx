import styles from './page.module.css'
import Navbar from '../../Components/Navbar/Navbar'
import API from '../../Utils/API'
import Pagination from '../../Components/Pagination/Pagination'
import Loader from '../../Components/Loader/Loader'
import LoaderTime from '../../Utils/LoaderTime'

import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

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

    const [posts, setPosts] = useState<Array<Post>>()

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


    return (
        <>

            {isLoading && <Loader />}

            {!isLoading &&
                <>

                    <div className={styles.posts}>
                        {posts?.map((post, index) => (
                            <div
                            onClick={() => {router(`/erkunden/${page}/${post.roomId}`)}} 
                             key={index} className={styles.post}>
                                <h2>{post.title[0].toUpperCase() + post.title.slice(1)}</h2>
                                <p>[Gepostet von
                                   <span onClick={(e) => {router(`/statistiken/${post.publicId}`); e.stopPropagation()}} className={styles.poster}> {post.from} </span>
                                    am
                                    <span className={styles.date}> {post.Date} </span>]
                                </p>
                                <div className={styles.categories}>
                                    {post.categories.map((keyword, index) => (
                                        <div key={index} className={styles.categoriebox}>
                                            <h3>{keyword}</h3>
                                        </div>
                                    ))}
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
