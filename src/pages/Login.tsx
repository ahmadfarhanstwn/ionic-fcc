import { IonButton, IonCard, IonCardContent, IonContent, IonFooter, IonHeader, IonIcon, IonInput, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import {logIn, personCircle} from 'ionicons/icons'
import FCC from '../assets/free-code-camp-logo.svg'

const Login: React.FC = () => {
    const handleSubmitLogin = (e: any) => {
        e.preventDefault()
        console.log('login success')
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color={"primary"}>
                    <IonTitle>Free Code Camp</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent scrollY={false}>
                <div className='ion-text-center ion-padding'>
                    <img src={FCC} alt='FCC Logo' width={"50%"} height={"50%"} />
                </div>
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
            </IonContent>
        </IonPage>
    );
};

export default Login;