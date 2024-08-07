
interface Props {
    progress: number;
    styles: string;
    headerClass: string;
    smallClass: string;

}

export default function AccountFeatures({ progress, styles, headerClass, smallClass }: Props) {
    return (
        <>
            {progress === 1 &&
                <div className={styles}>
                    <p className={headerClass}>
                        Is my account secured ?
                    </p>

                    <p className={smallClass}>
                        StreetDate is a new platform for fast dating without complex functionality, you should not use a real password that you use for your main accounts, in any case of SQL injection.
                    </p>

                    <div style={{ marginTop: '1em' }}>
                        <h2>My Location</h2>
                        <br></br><li>No, we do not share your location (also known as IP) with users.</li>

                        <h2 style={{marginTop: '1em'}}>My Instagram</h2>
                        <br></br><li>When you are in the game, there is no way a user can access your Instagram without your permission.</li>
                        <li style={{color: 'red'}}>When a user shares a game, your Instagram will be displayed. You can find more information on our terms and conditions page.</li>

                        <h2 style={{marginTop: '1em'}}>2FA Security</h2>
                        <br></br><li>We currently do not support 2FA.</li>
                    </div>



                </div>
            }

        </>
    )
}
