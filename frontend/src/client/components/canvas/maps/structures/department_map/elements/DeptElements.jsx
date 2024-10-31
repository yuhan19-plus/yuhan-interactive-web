/** 파일생성자 : 임성준
 * 임성준 : 바닥 및 투명벽 설정
 * 
 */
import React from 'react'
import CodingGroup from './dept/coding/CodingGroup'
import BioGroup from './dept/bio/BioGroup'
import EtcGroup from './dept/etc/EtcGroup'
import DeptInfoGroup from './dept/info/DeptInfoGroup'
import MiniGame2048Group from '../../minigame_map/MiniGame2048Group'
import GalleryGroup from './dept/gallery/GalleryGroup'

const DeptElements = ({ groundMapName }) => {
    return (
        <>
            {groundMapName !== '' && (
                <>
                    {groundMapName === 'computer_sw_map' && (
                        // 컴소
                        <>
                            <DeptInfoGroup groundMapName={groundMapName} />
                            <EtcGroup groundMapName={groundMapName} position={[-125, 0, -125]} />
                            <GalleryGroup />
                            <CodingGroup />
                        </>
                    )}
                    {groundMapName === 'mini_game_map' && (
                        <>
                            <MiniGame2048Group position={[0, 0, 0]} />
                        </>
                    )}
                    {/* {groundMapName === 'yuhan_bio_map' && (
                        // 바이오
                        // <BioGroup />
                        <></>
                    )} */}
                    {/* {groundMapName === 'food_nutrition_map' && (
                        // 식품영양
                        <></>
                    )} */}
                    {/* {groundMapName === 'industrial_design_map' && (
                        // 산디
                        <></>
                    )} */}
                </>
            )}

        </>
    )
}

export default DeptElements