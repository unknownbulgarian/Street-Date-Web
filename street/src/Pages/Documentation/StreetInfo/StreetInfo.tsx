interface Props {
    progress: number;
    styles: string;
    headerClass: string;
    smallClass: string;

}

export default function StreetInfo({ progress, styles, headerClass, smallClass }: Props) {
    return (
        <>
            {progress === 1 &&
                <div className={styles}>
                    <p className={headerClass}>
                        What exactly is StreetDate?
                    </p>

                    <p className={smallClass}>
                        This became very popular in Germany. Basically, two people cannot see each other until they have answered the other person's three questions. In the end, they can see each other and must say if they are interested in the other.
                    </p>

                    <img src="https://i.ytimg.com/vi/QAkdYfSC97I/maxresdefault.jpg"></img>

                    <p className={smallClass}>Sometimes they can ask more than 3 questions!</p>
                    
                </div>
            }

            {progress === 2 &&
                <div className={styles}>
                    <p className={headerClass}>
                        The story of the blind date.
                    </p>

                    <p className={smallClass}>
                        Blind dates originally came from America. It was mostly the big YouTube content creators who started it. But the blind dates usually took place in special studios and people had to apply for them. After a while, people in Germany started arranging blind dates on the street.
                    </p>

                    <p className={smallClass}>
                        There was one thing I never understood, why nobody did this thing online.
                    </p>

                    <iframe width="560" height="315"
                        src="https://www.youtube.com/embed/SwXfP2usD-w?si=fk8DbvSbvlz1tG1E"
                        title="YouTube video player" frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; 
                    encrypted-media; gyroscope; picture-in-picture; 
                    web-share" referrerPolicy="strict-origin-when-cross-origin">
                    </iframe>
                </div>
            }

            {progress === 3 &&
                <div className={styles}>
                    <p className={headerClass}>
                        How I got the motivation to develop a blind date app ?
                    </p>

                    <p className={smallClass}>
                        There were so many videos on my "For You" page in Tiktok, and they had so many views and likes. At that time, I was also learning how to develop mobile apps, so I said to myself, wait, I can easily develop this app for mobile and also create a website for it.
                    </p>

                    <img src="https://extension.harvard.edu/wp-content/uploads/sites/8/2020/10/computer-programming.jpg"></img>
                </div>
            }
        </>
    )
}
