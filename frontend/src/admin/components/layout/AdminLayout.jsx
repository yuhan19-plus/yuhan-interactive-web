/** 파일생성자 : 임성준
 * 레이아웃 설정
 */

import React from 'react'
import AdminNav from '../nav/AdminNav'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
    return (
        <>
            <AdminNav />
            <Outlet />
        </>
    )
}

export default AdminLayout