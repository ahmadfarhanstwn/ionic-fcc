import { IonButton, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import {logIn, personCircle} from 'ionicons/icons'
import FCC from '../assets/free-code-camp-logo.svg'
import Intro from '../components/Intro';
import { Preferences } from '@capacitor/preferences';
import { useHistory } from 'react-router';

const INTRO_SEEN_KEY = 'intro-is-seen'

const Login: React.FC = () => {
    const router = useHistory()
    const [introIsSeen, SetIntroIsSeen] = useState<boolean>(false)

    useEffect(() => {
        const checkStorage = async () => {
            const seen = await Preferences.get({ key : INTRO_SEEN_KEY })
            SetIntroIsSeen(seen.value === 'true')
        };
        checkStorage()
    }, [])
    
    const handleSubmitLogin = (e: any) => {
        e.preventDefault()
        console.log('ionic kontol babi')
        router.push('/app', 'root')
    }

    const onFinish = async() => {
        SetIntroIsSeen(true)
        Preferences.set({key: INTRO_SEEN_KEY, value: 'true'})
    }

    return (
        <>
            {!introIsSeen ? (
                <Intro onFinish={onFinish} />) :
                (
                <IonPage>
                    <IonHeader>
                        <IonToolbar color={"primary"}>
                            <IonTitle>Free Code Camp</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent scrollY={false} className='ion-padding'>
                        <IonGrid fixed>
                            <IonRow className='ion-justify-content-center'>
                                <IonCol size='12' sizeMd='8' sizeLg='6' sizeXl='4'>
                                    <div className='ion-text-center ion-padding'>
                                        <img src={FCC} alt='FCC Logo' width={"50%"} height={"50%"} />
                                    </div>
                                </IonCol>
                            </IonRow>

                            <IonRow className='ion-justify-content-center'>
                                <IonCol size='12' sizeMd='8' sizeLg='6' sizeXl='4'>
                                    <IonCard>
                                        <IonCardContent>
                                            <form onSubmit={handleSubmitLogin}>
                                                <IonInput fill='outline' labelPlacement='floating' label='Username' type='text' />
                                                <IonInput className='ion-margin-top' fill='outline' labelPlacement='floating' label='Password' type='password' />
                                                <IonButton className='ion-margin-top' expand='block' type='submit'>
                                                    Login
                                                    <IonIcon icon={logIn} slot='end' />
                                                </IonButton>
                                                <IonButton color={'secondary'} className='ion-margin-top' expand='block' routerLink='/register'>
                                                    Create an account?
                                                    <IonIcon icon={personCircle} slot='end' />
                                                </IonButton>
                                            </form>
                                        </IonCardContent>
                                    </IonCard>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonContent>
                </IonPage>
            )}
        </>
    );
};

export default Login;