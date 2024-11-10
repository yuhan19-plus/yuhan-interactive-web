/**
 * 임성준
 * - npc 애니메이션 텍스트 훅
 */
import { useEffect, useState } from "react"

export const useAnimatedText = (text, once, callback) => {
    // console.log("useAnimatedText", text)
    // text : 한 글자씩 보여줄 text를 의미
    // once : 애니메이션이 한번만 재생되는지 표시하는 플레그 변수
    // callback : 실행이 완료되었을 때 실행될 함수
    const [displayText, setDisplayText] = useState('')
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayText(displayText + text[currentIndex])
                setCurrentIndex(currentIndex + 1)
            }, 200)
            return () => clearTimeout(timeout)
        } else if (!once) {
            setCurrentIndex(0)
            setDisplayText("")
        } else {
            callback?.()
        }
    }, [callback, currentIndex, displayText, once, text])

    useEffect(() => {
        setCurrentIndex(0)
        setDisplayText("")
    }, [])

    return { displayText }
}