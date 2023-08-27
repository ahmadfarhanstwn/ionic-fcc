import { IonBackButton, IonButton, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonPage, IonRow, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import { checkmarkCircle } from 'ionicons/icons';
import React from 'react';

const Register: React.FC = () => {
    const router = useIonRouter()

    const handleSubmitLogin = (e: any) => {
        e.preventDefault()
        console.log('login success')
        router.goBack()
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color={"primary"}>
                    <IonButton slot='start'>
                        <IonBackButton defaultHref='/' />
                    </IonButton>
                    <IonTitle>Free Code Camp</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent scrollY={false}>
                <IonGrid fixed>
                    <IonRow className='ion-justify-content-center'>
                        <IonCol size='12' sizeMd='8' sizeLg='6' sizeXl='4'>
                        <IonCard>
                            <IonCardContent>
                                    <form onSubmit={handleSubmitLogin}>
                                        <IonInput fill='outline' labelPlacement='floating' label='Username' type='text' />
                                        <IonInput className='ion-margin-top' fill='outline' labelPlacement='floating' label='Password' type='password' />
                                        <IonButton className='ion-margin-top' expand='block' type='submit'>
                                            Create My Account
                                            <IonIcon icon={checkmarkCircle} slot='end' />
                                        </IonButton>
                                    </form>
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Register;