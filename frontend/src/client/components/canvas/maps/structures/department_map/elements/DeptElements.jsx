/** 파일생성자 : 임성준
 * 임성준 : 바닥 및 투명벽 설정
 * 
 */
import React from 'react'
import CodingGroup from './CodingGroup'

const DeptElements = ({ groundMapName }) => {
    return (
        <>
            {groundMapName === 'yuhan_bio_map' && (
                // 바이오
                <></>
            )}
            {groundMapName === 'computer_sw_map' && (
                // 컴소
                <></>
            )}
            {groundMapName === 'food_nutrition_map' && (
                // 식품영양
                <>
                    <CodingGroup />
                </>
            )}
            {groundMapName === 'industrial_design_map' && (
                // 산디
                <></>
            )}
        </>
    )
}

export default DeptElements