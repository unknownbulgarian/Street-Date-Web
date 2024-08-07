
interface Props {
    progress: number;
    styles: string;
    headerClass: string;
    smallClass: string;

}

export default function ExploreFeatures({ progress, styles, headerClass, smallClass }: Props) {
    return (
        <>
            {progress === 1 &&
                <div className={styles}>
                    <p className={headerClass}>
                        Find out more about our features
                    </p>

                    <p className={smallClass}>
                        StreetDate was meant to be free and never chargeable, but to have successful dates you should know our features and how they work.
                    </p>

                    <div style={{ marginTop: '1em' }}>
                        <h2 style={{ marginBottom: '0.5em', color: 'red' }}>Limits</h2>
                        <li>You should know that as an unauthenticated user you have game limits, which means that your IP will be blacklisted if you reach this limit. Guests have 15 games per day !</li>

                        <br></br><p>! - Create an account so you don't have to worry about any game limit restrictions.</p>

                        <br></br><li>The Showcase Photo can be maximum 10 MB</li>
                        <li>The old Showcase Photo will be removed from our database if you change it</li>

                        <h2 style={{ marginTop: '1em', marginBottom: '0.5em' }}>Game Features</h2>
                        <li>You are able to skip the User</li>
                        <li>You don't have to give your instagram at the end</li>
                        <li>The game have no time limit</li>
                        <li>You are able to know if the user have left</li>
                        <li>You are able to ask 3 questions</li>
                        <img src="https://i.postimg.cc/NMzVbccm/Screenshot-12.png" style={{ width: '900px' }}></img>

                        <h2 style={{ marginTop: '1em', marginBottom: '0.5em' }}>Authenticated Features</h2>
                        <li>You are able to change your Profile Information</li>
                        <li>You have own dashboard</li>
                        <li>Every finished game is saved</li>
                        <li>You can share your game</li>
                        <li>You have shareable Stats Page</li>
                        <li>You receive Notifications (likes,comments ...)</li>
                        <li>You can share your finished Games</li>
                        <li>You are able to remove comments from your published Posts</li>
                        <li>You are able to remove your published Post</li>
                        <li>You are able to change the Post Title</li>
                        <li>You are able to add reactions</li>
                        <li>You are able to comment</li>

                        <h2 style={{ marginTop: '1em', marginBottom: '0.5em' }}>For the Nerds</h2>
                        <p>Visit the <span onClick={() => { window.open('https://github.com/unknownbulgarian/Street-Date-Web', '_blank') }} style={{ cursor: 'pointer', textDecoration: 'underline' }}>GitHub Page</span> of the App</p>

                    </div>



                </div>
            }

            {progress === 2 &&
                <div className={styles}>
                    <p className={headerClass}>
                    Find out more about the new functions that will be added in the future
                    </p>

                    <p className={smallClass}>
                        StreetDate was meant to be free and never chargeable, but to have successful dates you should know our features and how they work.
                    </p>

                    <div style={{ marginTop: '1em' }}>
                        <h2 style={{marginBottom: '0.5em'}}>React Native</h2>
                        <p>The app will soon be available for both IOS and ANDROID.</p>
                        <br></br><li>The servers will not be changed, i.e. you can also play with browser users.</li>

                        <h2 style={{marginBottom: '0.5em', marginTop: '1em'}}>Discord DEV</h2>
                        <p>We are working on our own Discord bot so that you can also play our game in Discord.</p>
                        <br></br><li>We will use seperated servers probably, for optimizations.</li>

                        <h2 style={{marginBottom: '0.5em', marginTop: '1em'}}>Invite Function</h2>
                        <p>We are working on the invite functionality, and it will be soon released.</p>

                        <h2 style={{marginBottom: '0.5em', marginTop: '1em'}}>More Gamemodes</h2>
                        <p>As you know, this game can be played than more people in once, we will soon add double Date. ( 4 Persons )</p>

                        <h2 style={{marginBottom: '0.5em', marginTop: '1em'}}>Report Function</h2>
                        <p>Soon report function will be added to our App, so you can avoid Trolls.</p>
                        <br></br><li>With the report function, ban functionality will also be added.</li>
                        
                    </div>


                </div>
            }

        </>
    )
}
