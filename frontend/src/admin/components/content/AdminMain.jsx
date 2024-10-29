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
import AdminMenuPreview from './AdminMenuPreview'
import AdminReport from './report/AdminReport'
import AdminGallery from './gallery/AdminGallery'

const AdminMain = () => {
    const title = useLocation()
    const titleValue = title.state?.title || '관리자';
    console.log(titleValue)
    return (
        <>
            <div className='admin-content'>
                {
                    titleValue === '관리자' && <></>
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
                    titleValue === '학부추천' && <AdminDeptRec />
                }
                {
                    titleValue === '신고내역' && <AdminReport />
                }
                {
                    titleValue === '갤러리' && <AdminGallery />
                }
            </div>
        </>
    )
}

const ContentTitle = styled.div`
    font-size: 48px;
`

export default AdminMain