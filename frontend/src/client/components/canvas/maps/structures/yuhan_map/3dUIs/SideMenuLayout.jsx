/** 파일생성자 : 임성준
 * 임성준 : 프론트엔드 개발
 * 오자현 : sideboard 추가
 */

import React from 'react'
import styled from 'styled-components'
import SideBoard from '../../../../../canvas_layout/sideboard/SideBoard'
import ClientFood from '../../../../../canvas_layout/todaymenu/ClientFood'
import DetailFooter from './DetailFooter'
import DetailHeader from './DetailHeader'
import CounselContent from './counsel/CounselContent'


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
        <SideMenuLayoutWrapper>
            {value &&
                <>
                    <DetailHeader title={title} />
                    <DetailContent>
                        {title === '유한게시판' &&
                            <SideBoard />
                        }
                        {title === '오늘의 메뉴' &&
                        <ClientFood /> }            

                        {/* 내용작성 */}
                        {title === '상담신청' &&
                            <CounselContent />
                        }
                    </DetailContent>
                    <DetailFooter />
                </>
            }
        </SideMenuLayoutWrapper>
    )
}

const SideMenuLayoutWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`

const DetailContent = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: auto;
    background-color: #ffffffdd;
    padding: 15px;
`

export default SideMenuLayout