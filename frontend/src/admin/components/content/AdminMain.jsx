/** 파일생성자 : 임성준
 * 관리자 루트 컴포넌트 - 임성준
 */

import React from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import AdminBoard from './board/AdminBoard'
import AdminDeptRec from './dept_rec/AdminDeptRec'
import AdminFood from './foodMenu/AdminFood'
import AdminMember from './member/AdminMember'
import AdminReport from './board/AdminReport'
import AdminMenuPreview from './AdminMenuPreview'

const AdminMain = () => {
    const title = useLocation()
    const titleValue = title.state.title
    console.log(title.state.title)
    return (
        <>
            <div className='content-title'>{titleValue}</div>
            <div className='admin-content'>
                {
                    titleValue === '관리자' && <AdminMenuPreview/>
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
                {
                    titleValue === '신고내역' && <AdminReport />
                }
            </div>
        </>
    )
}

const ContentTitle = styled.div`
    font-size: 48px;
`

export default AdminMain