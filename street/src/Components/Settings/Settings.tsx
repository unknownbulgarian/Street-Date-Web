import React, { MouseEventHandler, useEffect, useState } from 'react'
import styles from './Settings.module.css'
import { IoMdClose } from "react-icons/io";
import SettingToggler from '../SettingToggler/SettingToggler';
import { GrDocumentUpdate } from "react-icons/gr";

import InputIcon from '../InputIcon/InputIcon';


import { FaUser } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import TextIcon from '../TextIcon/TextIcon';

interface SettingsProps {
    close: MouseEventHandler<any>;
    name: string;
    photoUrl: string;
    gender: string;
    instagram: string;
}

export default function Settings({ close, name, photoUrl, gender, instagram }: SettingsProps) {

    const [isParticles, setIsParticles] = useState<boolean>(true)


    const [progress, setProgress] = useState<number>(1)
    const [progessP, setProgressP] = useState<string>('')

    useEffect(() => {
        switch (progress) {
            case 1:
                setProgressP('15%')
                break;
            case 2:
                setProgressP('35%')
                break;
            case 3:
                setProgressP('65%')
                break;
            case 4:
                setProgressP('80%')
                break;
            case 5:
                setProgressP('100%')
                break;
        }
    }, [progress])



    return (
        <div className={styles.settings}>
            <div className={styles.settingsbox} data-aos="zoom-in">
                <span onClick={close} className={styles.settingsclose}><IoMdClose /></span>
                <div className={styles.settingstop}>
                    <h2>Einstellungen</h2>
                    <div className={styles.settingprogress}>
                        <div style={{ width: progessP }} className={styles.progress}></div>
                    </div>
                </div>

                <div className={styles.mainsettings}>
                    <div className={styles.sidesetting}>
                        <div style={{
                            borderLeft: progress === 1 ? '3px solid rgb(169, 50, 224)' : '',
                            backgroundColor: progress === 1 ? 'rgba(103, 16, 189, 0.575)' : ''
                        }}
                            onClick={() => { setProgress(1) }}
                            className={styles.sidebox}>
                            <p>Allgemein</p>
                        </div>

                        <div style={{
                            borderLeft: progress === 2 ? '3px solid rgb(169, 50, 224)' : '',
                            backgroundColor: progress === 2 ? 'rgba(103, 16, 189, 0.575)' : ''
                        }}
                            onClick={() => { setProgress(2) }}
                            className={styles.sidebox}>
                            <p>Konto Typ</p>
                        </div>

                        <div style={{
                            borderLeft: progress === 3 ? '3px solid rgb(169, 50, 224)' : '',
                            backgroundColor: progress === 3 ? 'rgba(103, 16, 189, 0.575)' : ''
                        }}
                            onClick={() => { setProgress(3) }}
                            className={styles.sidebox}>
                            <p>Sicherheit</p>
                        </div>

                        <div style={{
                            borderLeft: progress === 4 ? '3px solid rgb(169, 50, 224)' : '',
                            backgroundColor: progress === 4 ? 'rgba(103, 16, 189, 0.575)' : ''
                        }}
                            onClick={() => { setProgress(4) }}
                            className={styles.sidebox}>
                            <p>Das Spiel</p>
                        </div>

                        <div style={{
                            borderLeft: progress === 5 ? '3px solid rgb(169, 50, 224)' : '',
                            backgroundColor: progress === 5 ? 'rgba(103, 16, 189, 0.575)' : ''
                        }}
                            onClick={() => { setProgress(5) }}
                            className={styles.sidebox}>
                            <p>Hilfe</p>
                        </div>

                    </div>

                    <div className={styles.right}>
                        {progress === 1 &&
                            <>
                                <SettingToggler
                                    title='Hintergrundpartikel'
                                    description='Aktivieren/Deaktivieren der Hintergrundpartikel'
                                    onClick={() => { }}
                                    toggled={isParticles}
                                    setToggle={setIsParticles}
                                />

                                <SettingToggler
                                    title='Hintergrundpartikel'
                                    description='Aktivieren/Deaktivieren der Hintergrundpartikel'
                                    onClick={() => { }}
                                    toggled={isParticles}
                                    setToggle={setIsParticles}
                                />
                            </>
                        }

                        {progress === 4 &&
                            <>
                                <div className={styles.gameinfo}>
                                    <div className={styles.all}>
                                        <h2>Profil-Informationen</h2>
                                        <p>Ändern Sie Ihre persönlichen Daten</p>

                                        <div className={styles.profileinputs}>
                                            <InputIcon
                                                backColor='hsla(272, 100%, 55%, 0.5)'
                                                borderRadius='0.3em'
                                                color='white'
                                                title='Name'
                                                width='70%'
                                                isBoxShadow={true}
                                                titleColor='white'
                                                height='30px'
                                                type='text'
                                                onFocus={() => { }}
                                                border='unset'
                                                onInput={(e: any) => { }}
                                            >
                                                <FaUser />
                                            </InputIcon>

                                            <InputIcon
                                                backColor='hsla(272, 100%, 55%, 0.5)'
                                                borderRadius='0.3em'
                                                color='white'
                                                title='Instagram'
                                                width='70%'
                                                isBoxShadow={true}
                                                titleColor='white'
                                                height='30px'
                                                type='text'
                                                onFocus={() => { }}
                                                border='unset'
                                                onInput={(e: any) => { }}
                                            >
                                                <IoLogoInstagram />
                                            </InputIcon>

                                            <select>
                                                <option>Wählen Sie Ihr Geschlecht</option>
                                                <option value='Männlich'>Männlich</option>
                                                <option value='Weiblich'>Weiblich</option>
                                                <option value='Andere'>Andere</option>
                                            </select>

                                            <TextIcon
                                                marginTop='0.3em'
                                                title='Aktualisierung'
                                                backgroundColor='hsla(272, 100%, 70%, 0.7)'
                                                width='145px'
                                                padding='0.3em'
                                                titleColor='white'
                                                borderRadius='0.3em'
                                                color='white'
                                                height='18px'
                                                onHover={(e) => { e.currentTarget.style.backgroundColor = 'hsla(272, 100%, 70%, 0.7)' }}
                                                onUnHover={(e) => { e.currentTarget.style.backgroundColor = 'hsla(272, 100%, 70%, 0.5)' }}
                                                fontSize='0.9rem'
                                            >
                                                <GrDocumentUpdate />
                                            </TextIcon>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.gameinfo}>
                                    <div className={styles.all}>
                                        <h2>Ihr Vorzeigefoto</h2>
                                        <p>Ändern Ihres Hauptfotos</p>
                                        <img src={photoUrl}></img>
                                        <input type="file" name="file" id="file" className={styles.inputfile} />
                                        <label htmlFor="file">Wählen Sie ein Foto</label>
                                        <TextIcon
                                            marginTop='1em'
                                            title='Aktualisierung'
                                            backgroundColor='hsla(272, 100%, 70%, 0.7)'
                                            width='145px'
                                            padding='0.3em'
                                            titleColor='white'
                                            borderRadius='0.3em'
                                            color='white'
                                            height='18px'
                                            onHover={(e) => { e.currentTarget.style.backgroundColor = 'hsla(272, 100%, 70%, 0.7)' }}
                                            onUnHover={(e) => { e.currentTarget.style.backgroundColor = 'hsla(272, 100%, 70%, 0.5)' }}
                                            fontSize='0.9rem'
                                        >
                                            <GrDocumentUpdate />
                                        </TextIcon>
                                    </div>
                                </div>
                            </>
                        }

                    </div>
                </div>


            </div>
        </div>
    )
}
