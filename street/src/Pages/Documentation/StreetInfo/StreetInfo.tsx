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
                        Was ist streetdate genau?
                    </p>

                    <p className={smallClass}>

                    </p>
                </div>
            }
        </>
    )
}
