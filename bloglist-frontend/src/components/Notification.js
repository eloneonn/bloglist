import React from 'react'
import { useSelector } from 'react-redux'

// TODO error punainen ja notification vihreä, helppo toteuttaa reduxilla

const Notification = () => {
    const message = useSelector((state) => state.notification)
    if (message === null) {
        return null
    }

    return <div className="error">{message}</div>
}

export default Notification
