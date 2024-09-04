import { useSelector } from "react-redux"

export const moving = (currentPosition) => {
    const myChar = useSelector((state) => state.mChar)
    console.log(myChar)
    console.log(currentPosition)
    // useMainCharacter({currentPosition, myChar})
}