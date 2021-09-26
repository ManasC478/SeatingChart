import React, { useContext, useEffect, useState } from 'react';

import { NotificationsContext } from './ContextProviders';

// import material ui icons
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const Notifications = () => {
    const { notifications, setNotifications } = useContext(NotificationsContext);
    const [display, setDisplay] = useState(false);

    useEffect(() => {
        if (notifications.message) {
            setDisplay(true);
        }
        const displayTimeout = setTimeout(() => {
            setDisplay(false);
        }, 5000);

        return () => {
            clearTimeout(displayTimeout);
        }
    }, [notifications])

    return (
        <div className={`notifications ${notifications.type === 'danger' ? 'danger' : 'okay'}`} style={display ? {opacity: '1'}  : {opacity: '0'}}>
            <CheckCircleOutlineIcon />
            <p>{notifications.message}</p>
        </div>
    )
}

export default Notifications
