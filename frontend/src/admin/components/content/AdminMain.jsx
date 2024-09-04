/** 파일생성자 : 임성준
 * 관리자 루트 컴포넌트 - 임성준
 */

import React from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import AdminMember from './member/AdminMember'
import AdminFood from './food/AdminFood'
import AdminBoard from './board/AdminBoard'
import AdminDeptRec from './dept_rec/AdminDeptRec'

const AdminMain = () => {
    const title = useLocation()
    const titleValue = title.state.title
    console.log(title.state.title)
    return (
        <>
            <div className='content-title'>{titleValue}</div>
            <div className='admin-content'>
                {
                    titleValue === '관리자' && <>관리자 메인</>
                }
                {
                    titleValue === '회원관리' && <AdminMember />
                }
                {
                    titleValue === '오늘의 메뉴' && <AdminFood />
                }
                {
                    titleValue === '유한게시판' && <AdminBoard />
                }
                {
                    titleValue === '전공추천' && <AdminDeptRec />
                }
            </div>
        </>
    )
}

const ContentTitle = styled.div`
    font-size: 48px;
`

export default AdminMain