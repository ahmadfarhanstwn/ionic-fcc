import { IonAvatar, IonButton, IonButtons, IonCard, IonCardContent, IonChip, IonContent, IonDatetime, IonFab, IonFabButton, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonMenuButton, IonModal, IonPage, IonRefresher, IonRefresherContent, IonSearchbar, IonSegment, IonSegmentButton, IonSkeletonText, IonText, IonTitle, IonToolbar, useIonAlert, useIonToast, useIonViewWillEnter } from '@ionic/react';
import { addCircleSharp, addOutline, trashBinSharp } from 'ionicons/icons';
import React, { useEffect, useRef, useState } from 'react';
import '../theme/List.css'

const List: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true)
    const [users, setUsers] = useState<any[]>([])
    const [showAlert] = useIonAlert()
    const [showToast] = useIonToast()
    const [selectedUser, setSelectedUser] = useState(null)
    const modal = useRef<HTMLIonModalElement>(null);
    const cardModal = useRef<HTMLIonModalElement>(null)
    const [presentingElement, setPresentingElement] = useState<HTMLElement | null>(null)
    const page = useRef(null)
    const [activeSegment, setActiveSegment] = useState<any>('details')

    useEffect(() => {
        setPresentingElement(page.current)
        const getUsers = async () => {
            const data = await fetch('https://randomuser.me/api?results=10');
            const users = await data.json();
            setUsers(users.results);
        }

        getUsers()
        setLoading(false)
    }, [])

    const clearList = () => {
        showAlert({
            header: 'Confirm!',
            message: 'Are you sure you want to delete all users?',
            buttons: [
                {text: 'Cancel', role: 'cancel'},
                {
                    text: 'Delete', 
                    handler: () => {
                        setUsers([])
                        showToast({message: 'All users deleted!', duration: 2000, color: 'danger'}) 
                    }
                }
            ]
        })
    }

    const doRefresh = (event : any) => {
        const getUsers = async () => {
            const data = await fetch('https://randomuser.me/api?results=10');
            const users = await data.json();
            setUsers(users.results);
        }
        getUsers()
        event.detail.complete()
    }

    return (
        <IonPage ref={page}>
            <IonHeader>
                <IonToolbar color='primary'>
                    <IonButtons slot='start'>
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>List</IonTitle>
                    <IonButtons slot='end'>
                        <IonButton onClick={clearList}>
                            <IonIcon slot='icon-only' icon={trashBinSharp} color='light' />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
                <IonToolbar color='primary'>
                    <IonSearchbar />
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonRefresher slot='fixed' onIonRefresh={doRefresh}>
                    <IonRefresherContent />
                </IonRefresher>

                {loading &&
                    [...Array(10)].map((_, index) => (
                        <IonCard key={index}>
                        <IonCardContent className="ion-no-padding">
                            <IonItem lines="none">
                            <IonAvatar slot="start">
                                <IonSkeletonText />
                            </IonAvatar>
                            <IonLabel>
                                <IonSkeletonText animated style={{ width: '150px' }} />
                                <p>
                                <IonSkeletonText />
                                </p>
                            </IonLabel>
                            <IonChip slot="end" color={'primary'}></IonChip>
                            </IonItem>
                        </IonCardContent>
                        </IonCard>
                    ))}

                {users.map((user, index) => (
                    <IonCard key={index} onClick={() => setSelectedUser(user)}>
                        <IonCardContent className='ion-no-padding'>
                            <IonItem lines='none'>
                                <IonAvatar slot='start'>
                                    <IonImg src={user.picture.thumbnail} />
                                </IonAvatar>
                                <IonLabel>
                                    {user.name.first} {user.name.last}
                                    <p>{user.email}</p>
                                </IonLabel>
                                <IonChip slot='end' color='primary'>
                                    {user.nat}
                                </IonChip>
                            </IonItem>
                        </IonCardContent>
                    </IonCard>
                ))}

                <IonModal id='example-modal' ref={modal} isOpen={selectedUser !== null} onIonModalDidDismiss={() => setSelectedUser(null)}>
                    <IonHeader>
                        <IonToolbar color='light'>
                            <IonButtons slot='end'>
                                <IonButton onClick={() => modal.current?.dismiss()}>Close</IonButton>
                            </IonButtons>
                            <IonTitle>
                                {selectedUser?.name.first} {selectedUser?.name.last}
                            </IonTitle>
                        </IonToolbar>
                        <IonToolbar color='light'>
                            <IonSegment value={activeSegment} onIonChange={(e) => setActiveSegment(e.detail.value!)}>
                                <IonSegmentButton value='details'>Details</IonSegmentButton>
                                <IonSegmentButton value='calendar'>Calendar</IonSegmentButton>
                            </IonSegment>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent className='ion-padding'>
                        {activeSegment === "details" && (
                            <div>
                                <IonText>{selectedUser?.name.first} {selectedUser?.name.last}</IonText>
                                <IonText>{selectedUser?.email}</IonText>
                            </div>
                        )}
                        {activeSegment === "calendar" && <IonDatetime />}
                    </IonContent>
                </IonModal>

                <IonModal ref={cardModal} trigger='card-modal' presentingElement={presentingElement}>
                    <IonHeader>
                        <IonToolbar color='primary'>
                            <IonButtons slot='end'>
                                <IonButton color='light' onClick={() => cardModal.current?.dismiss()}>Close</IonButton>
                            </IonButtons>
                            <IonTitle>
                                Card Modal
                            </IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent>
                        SHEET
                    </IonContent>
                </IonModal>

                <IonFab vertical='bottom' horizontal='end' slot='fixed'>
                    <IonFabButton id='card-modal'>
                        <IonIcon icon={addOutline} />
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonPage>
    );
};

export default List;