/** 파일생성자 : 임성준
 * 임성준 : 프론트엔드 개발
 * 오자현 : sideboard 추가
 */

import React from 'react'
import DetailFooter from './DetailFooter'
import DetailHeader from './DetailHeader'
import styled from 'styled-components'
import { Kiosk } from '../elements/etc/Kiosk'
import SideBoard from '../../../../../canvas_layout/sideboard/SideBoard'


let title

const SideMenuLayout = (props) => {
    const { pageName, value } = props
    // console.log(pageName)

    title = pageName

    if (title === 'consultation') title = '상담신청'
    else if (title === 'board') title = '유한게시판'
    else if (title === 'food') title = '오늘의 메뉴'
    else if (title === 'deptRec') title = '전공추천'

    // console.log(title)

    return (
        <>
            {value &&
                <>
                    <DetailHeader title={title} />
                    <DetailContent>
                        {title === '유한게시판' &&
                            <SideBoard />
                        }
                        {/* 내용작성 */}
                    </DetailContent>
                    <DetailFooter />
                </>
            }
        </>
    )
}

const DetailContent = styled.div`
    width: 100%;
    height: 65vh;
    background-color: #ffffffdd;
`

export default SideMenuLayout