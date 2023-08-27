import { IonContent, IonHeader, IonIcon, IonItem, IonMenu, IonMenuToggle, IonPage, IonRouterOutlet, IonSplitPane, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { Redirect, Route } from 'react-router';
import List from './List';
import Settings from './Settings';
import { listCircle, settingsSharp } from 'ionicons/icons';
import '../theme/SideMenu.css'

const Menu: React.FC = () => {
    const paths = [
        {name : 'List', link: '/app/list', icon: listCircle},
        {name : 'Settings', link: '/app/settings', icon: settingsSharp},
    ]

    return (
        <IonPage>
            <IonSplitPane contentId='main'>
                <IonMenu contentId='main' >
                    <IonHeader>
                        <IonToolbar color='primary'>
                            Menu
                        </IonToolbar>
                    </IonHeader>
                    <IonContent>
                        {paths.map((path, index) => (
                            <IonMenuToggle key={index} autoHide={false}>
                                <IonItem routerLink={path.link} routerDirection='none' >
                                    <IonIcon slot='start' icon={path.icon} />
                                    {path.name}
                                </IonItem>
                            </IonMenuToggle>
                        ))}
                    </IonContent>
                </IonMenu>

                <IonRouterOutlet id='main'>
                    <Route exact path='/app/list' component={List} />
                    <Route exact path='/app/settings' component={Settings} />
                    <Route exact path='/app'>
                        <Redirect to='/app/list' />
                    </Route>
                </IonRouterOutlet>
            </IonSplitPane>
        </IonPage>
    );
};

export default Menu;