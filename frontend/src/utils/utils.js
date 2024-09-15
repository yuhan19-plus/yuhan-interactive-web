// 캐릭터 미니맵 기능 메서드 - 성준
export const calculateMinimapPosition = (originalPosition) => {
    return {
        x : originalPosition.x / 3.5 + 10,
        y : originalPosition.z / 4 + 10
    }
}