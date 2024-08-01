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
                        Was ist StreetDate genau ?
                    </p>

                    <p className={smallClass}>
                        Dies wurde in Deutschland sehr <strong>populär</strong>. Im Grunde können sich 2 Personen
                        <strong> nicht sehen</strong>, bis sie die <strong>3</strong> Fragen der anderen Person <strong>nicht beantworten</strong>,
                        und am Ende können sie sich sehen und müssen sagen, ob sie <strong>Interesse</strong>
                        an dem anderen haben.
                    </p>

                    <p className={smallClass}>Manchmal können sie <strong>mehr</strong> als 3 Fragen stellen !</p>
                </div>
            }

            {progress === 2 &&
                <div className={styles}>
                    <p className={headerClass}>
                        Die Geschichte des Blind Dates.
                    </p>

                    <p className={smallClass}>
                        Ursprünglich kamen die Blind Dates aus <strong>Amerika</strong>.
                        Meistens haben die <strong>großen YouTube-Inhaltsersteller</strong> damit angefangen.
                        Aber die Blind Dates fanden meist in <strong>speziellen Studios</strong> statt, und
                        die Leute mussten sich dafür bewerben. Nach einer Weile begann man
                        in <strong>Deutschland</strong>, Blind Dates auf <strong>der Straße zu arrangieren</strong>.
                    </p>

                    <p className={smallClass}>
                        Es gab eine Sache, die ich <strong>nie verstanden habe</strong>, warum niemand
                        diese Sache <strong>online</strong> gemacht hat.
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
                        Wie ich die Motivation bekam, eine Blind Date App zu entwickeln ?
                    </p>

                    <p className={smallClass}>
                        Es gab so viele Videos auf meiner <strong>„For You“-Seite in Tiktok</strong>, und sie hatten so
                        <strong> viele Aufrufe und Likes</strong>. Zu dieser Zeit lernte ich auch, wie man <strong>mobile Apps entwickelt</strong>,
                        also sagte ich zu mir, warte, ich kann diese App für Handys <strong>einfach entwickeln</strong> und auch
                        <strong> eine Website</strong> dafür erstellen.
                    </p>
                </div>
            }
        </>
    )
}
