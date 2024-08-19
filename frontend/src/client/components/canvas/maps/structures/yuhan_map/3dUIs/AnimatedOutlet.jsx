import React, { useState } from 'react'
import { useOutlet } from 'react-router-dom'

const AnimatedOutlet = () => {
    const currentPage = useOutlet()
    console.log("currentPage", currentPage)
    const [outlet] = useState(currentPage)
    return (
        <div>{outlet}</div>
    )
}

export default AnimatedOutlet