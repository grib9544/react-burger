
import { useEffect, useState } from 'react'

export const useKeyPress = (key) => {
    const [keyPressed, setKeyPressed] = useState(false)

    function downHandler({ code }) {
        if (code === key) {
            setKeyPressed(true)
        }
    }

    function upHandler({ code }) {
        if (code === key) {
            setKeyPressed(true)
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', downHandler)
        document.addEventListener('keyup', upHandler)

        return () => {
            document.removeEventListener('keydown', downHandler)
            document.removeEventListener('keyup', upHandler)
        }
    }, [])

    return keyPressed
}