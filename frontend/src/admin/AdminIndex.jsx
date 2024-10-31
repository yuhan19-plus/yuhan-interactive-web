/** 파일 생성자 : 임성준
 * 임성준 : 프론트엔드 개발
 */
import React from 'react'
import styled from 'styled-components'
import AdminNav from './components/nav/AdminNav'
import { Outlet } from 'react-router-dom'
import Footer from '../common/components/Footer'

const AdminIndex = () => {
    return (
        <div className='wrapper'>
            <div className='container'>
                <div className='header'>
                    <AdminNav />
                </div>
                <AdminContentWrapper>
                    <Outlet />
                </AdminContentWrapper>
            </div>
            <div className='footer-wrapper'>
                <Footer />
            </div>
        </div>
    )
}

const AdminContentWrapper = styled.div`
    width: 100%;
    margin-top: 3rem;
    border-radius: 1rem;
    box-shadow: 5px 5px 7px #d9d9d9,
                -5px -5px 7px var(--sub-color);
    padding: 1.3rem;
`

export default AdminIndex