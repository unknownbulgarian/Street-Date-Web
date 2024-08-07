import { IoIosNotifications, IoMdClose } from 'react-icons/io'
import styles from './NotificationIndbox.module.css'
import React, { Dispatch, MouseEventHandler, SetStateAction, useEffect, useState } from 'react'
import API from '../../Utils/API'
import { useNavigate } from 'react-router-dom'
import LoaderTime from '../../Utils/LoaderTime'
import Loader from '../Loader/Loader'
import { AiOutlineLoading } from 'react-icons/ai'

interface NotProps {
    close: MouseEventHandler<SVGElement>;
}

interface Notifications {
    notifications: Array<{
        createdAt: string;
        _id: string;
        from: string;
        roomId: string;
        theirId: string;
        type: string;
        fromId: string;
    }>
}

export default function NotificationIndbox({ close }: NotProps) {

    const [notifications, setNotifications] = useState<Notifications>()
    const [categorie, setCategorie] = useState<string>('all')

    const [isLoading, setIsLoading] = useState<boolean>(true)

    const nav = useNavigate()


    const getNotifications = async () => {
        try {
            const response = await fetch(API.api + '/getNotifications', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: localStorage.getItem('token') })
            });

            const responseData = await response.json();

            const data = responseData
         console.log(data)

            if (data.error) {

            } else {
                setNotifications(data)
                LoaderTime.loader(setIsLoading)
            }

            //console.log(data)

        } catch (error: any) {
        }
    }

    const acceptInvite = async (otherPublicId : string, _id : string ) => {
        try {
            const response = await fetch(API.api + '/acceptInvite', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: localStorage.getItem('token'), otherPublicId, publicId: localStorage.getItem('publicId'), _id })
            });

            const responseData = await response.json();

            const data = responseData
            console.log(data)

            if (data.error) {

            } else {
             
            }

            //console.log(data)

        } catch (error: any) {
        }
    }


    useEffect(() => {
        getNotifications()
    }, [])


    return (
        <div className={styles.main}>
            <div className={styles.box} data-aos="zoom-in">
                <IoMdClose onClick={close} className={styles.close} />
                <h2>Notifications</h2>
                <div className={styles.categories}>

                    <div onClick={(e) => { setCategorie(e.currentTarget.innerText.toLowerCase()) }} className={styles.categorie}>
                        <p>All</p>
                    </div>

                    <div onClick={(e) => { setCategorie(e.currentTarget.innerText.toLowerCase()) }} className={styles.categorie}>
                        <p>Likes</p>
                    </div>

                    <div onClick={(e) => { setCategorie(e.currentTarget.innerText.toLowerCase()) }} className={styles.categorie}>
                        <p>Laugh</p>
                    </div>

                    <div onClick={(e) => { setCategorie(e.currentTarget.innerText.toLowerCase()) }} className={styles.categorie}>
                        <p>Lol</p>
                    </div>

                    <div onClick={(e) => { setCategorie(e.currentTarget.innerText.toLowerCase()) }} className={styles.categorie}>
                        <p>Love</p>
                    </div>

                    <div onClick={(e) => { setCategorie(e.currentTarget.innerText.toLowerCase()) }} className={styles.categorie}>
                        <p>Comment</p>
                    </div>

                    <div onClick={(e) => { setCategorie(e.currentTarget.innerText.toLowerCase()) }} className={styles.categorie}>
                        <p>Game</p>
                    </div>
                </div>


                {isLoading &&
                    <div>
                        <div className={styles.loader}><span className={styles.loadericon}><AiOutlineLoading /></span></div>
                    </div>
                }

                {!isLoading &&
                    <>
                        <div className={styles.notifications}>
                            <>
                                {categorie === 'all' && <>
                                    {notifications?.notifications.map((notification, index) => (
                                        <div onClick={() => { notification.type !== 'invite' ?  nav(`/explore/1/${notification.roomId}`) : acceptInvite(notification.fromId, notification._id) }} key={index} className={styles.notification}>
                                            <div className={styles.maininfo}>
                                                <h3 onClick={(e) => { notification.type !== 'invite' ?  nav(`/stats/${notification.theirId}`) : ''; e.stopPropagation() }}>{notification.from}</h3>
                                                {notification.type === 'like' && <p><span style={{ fontWeight: '800' }}>Liked</span> your post at {notification.createdAt}</p>}
                                                {notification.type !== 'like' && notification.type !== 'comment' && notification.type !== 'invite' && <p><span style={{ fontWeight: '800' }}>Reacted</span> at your post at {notification.createdAt}</p>}
                                                {notification.type === 'comment' && <p><span style={{ fontWeight: '800' }}>Commented</span> on your post at {notification.createdAt}</p>}
                                                {notification.type === 'invite' && <p><span style={{ fontWeight: '800' }}>Invited</span> you to play at {notification.createdAt}</p>}
                                            </div>
                                            <IoIosNotifications className={styles.notificationicon} />
                                        </div>
                                    ))}
                                </>
                                }

                                {categorie === 'likes' && <>
                                    {notifications?.notifications.map((notification, index) => (
                                        <React.Fragment key={index}>
                                            {notification.type === 'like' &&
                                                <div onClick={() => { nav(`/explore/1/${notification.roomId}`) }} className={styles.notification}>
                                                    <div className={styles.maininfo}>
                                                        <h3 onClick={(e) => { nav(`/stats/${notification.theirId}`); e.stopPropagation() }}>{notification.from}</h3>
                                                        {notification.type === 'like' && <p><span style={{ fontWeight: '800' }}>Liked</span> your post at {notification.createdAt}</p>}
                                                        {notification.type !== 'like' && notification.type !== 'comment' && <p><span style={{ fontWeight: '800' }}>Reacted</span> at your post at {notification.createdAt}</p>}
                                                    </div>
                                                    <IoIosNotifications className={styles.notificationicon} />
                                                </div>
                                            }

                                        </React.Fragment>
                                    ))}
                                </>
                                }

                                {categorie === 'laugh' && <>
                                    {notifications?.notifications.map((notification, index) => (
                                        <React.Fragment key={index}>
                                            {notification.type === 'laugh' &&
                                                <div onClick={() => { nav(`/explore/1/${notification.roomId}`) }} className={styles.notification}>
                                                    <div className={styles.maininfo}>
                                                        <h3 onClick={(e) => { nav(`/stats/${notification.theirId}`); e.stopPropagation() }}>{notification.from}</h3>
                                                        <p><span style={{ fontWeight: '800' }}>Reacted</span> at your post at {notification.createdAt}</p>
                                                    </div>
                                                    <IoIosNotifications className={styles.notificationicon} />
                                                </div>
                                            }

                                        </React.Fragment>
                                    ))}
                                </>
                                }

                                {categorie === 'lol' && <>
                                    {notifications?.notifications.map((notification, index) => (
                                        <React.Fragment key={index}>
                                            {notification.type === 'lol' &&
                                                <div onClick={() => { nav(`/explore/1/${notification.roomId}`) }} className={styles.notification}>
                                                    <div className={styles.maininfo}>
                                                        <h3 onClick={(e) => { nav(`/stats/${notification.theirId}`); e.stopPropagation() }}>{notification.from}</h3>
                                                        <p><span style={{ fontWeight: '800' }}>Reacted</span> at your post at {notification.createdAt}</p>
                                                    </div>
                                                    <IoIosNotifications className={styles.notificationicon} />
                                                </div>
                                            }

                                        </React.Fragment>
                                    ))}
                                </>
                                }

                                {categorie === 'love' && <>
                                    {notifications?.notifications.map((notification, index) => (
                                        <React.Fragment key={index}>
                                            {notification.type === 'love' &&
                                                <div onClick={() => { nav(`/explore/1/${notification.roomId}`) }} className={styles.notification}>
                                                    <div className={styles.maininfo}>
                                                        <h3 onClick={(e) => { nav(`/stats/${notification.theirId}`); e.stopPropagation() }}>{notification.from}</h3>
                                                        <p><span style={{ fontWeight: '800' }}>Reacted</span> at your post at {notification.createdAt}</p>
                                                    </div>
                                                    <IoIosNotifications className={styles.notificationicon} />
                                                </div>
                                            }

                                        </React.Fragment>
                                    ))}
                                </>
                                }

                                {categorie === 'comment' && <>
                                    {notifications?.notifications.map((notification, index) => (
                                        <React.Fragment key={index}>
                                            {notification.type === 'comment' &&
                                                <div onClick={() => { nav(`/explore/1/${notification.roomId}`) }} className={styles.notification}>
                                                    <div className={styles.maininfo}>
                                                        <h3 onClick={(e) => { nav(`/stats/${notification.theirId}`); e.stopPropagation() }}>{notification.from}</h3>
                                                        <p><span style={{ fontWeight: '800' }}>Commented</span> on your post at {notification.createdAt}</p>
                                                    </div>
                                                    <IoIosNotifications className={styles.notificationicon} />
                                                </div>
                                            }

                                        </React.Fragment>
                                    ))}
                                </>
                                }

                                {categorie === 'game' && <>
                                    {notifications?.notifications.map((notification, index) => (
                                        <React.Fragment key={index}>
                                            {notification.type === 'invite' &&
                                                <div onClick={() => { acceptInvite(notification.fromId, notification._id); }} className={styles.notification}>
                                                    <div className={styles.maininfo}>
                                                        <h3 onClick={(e) => { nav(`/stats/${notification.theirId}`); e.stopPropagation() }}>{notification.from}</h3>
                                                        <p><span style={{ fontWeight: '800' }}>Invited</span> you to play at {notification.createdAt}</p>
                                                    </div>
                                                    <IoIosNotifications className={styles.notificationicon} />
                                                </div>
                                            }

                                        </React.Fragment>
                                    ))}
                                </>
                                }

                            </>
                        </div>
                    </>
                }


            </div>
        </div>
    )
}
