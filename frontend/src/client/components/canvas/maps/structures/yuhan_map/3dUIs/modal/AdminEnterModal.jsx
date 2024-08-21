/** 파일생성자 : 임성준
 * 임성준 : 프론트엔드 개발
 * 
 */

import { Close } from '@mui/icons-material'
import { Button, TextField } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { initModal } from '../../../../../../../../redux/actions/actions'

const AdminEnterModal = () => {
    // const modalValue = useSelector((state) => state.modal)
    const dispatch = useDispatch()

    const handleCloseModal = (e) => {
        e.stopPropagation()
        dispatch(initModal())
    }
    return (
        <>
        {/* Form 넣어서 작업 진행할 것 */}
            <AdminEnterModalWrapper>
                <AdminEnterModalHeader>
                    <p>유한대 관리자</p>
                    <p onClick={handleCloseModal}><Close /></p>
                </AdminEnterModalHeader>
                <AdminEnterModalContent>
                    <em>관리자로 코드를 입력하세요</em>
                    <TextField type='password' style={{ width: '100%' }} />
                </AdminEnterModalContent>
                <AdminEnterModalFooter>
                    <EnterButton>확인</EnterButton>
                </AdminEnterModalFooter>
            </AdminEnterModalWrapper>
        </>
    )
}

const AdminEnterModalWrapper = styled.div`
    position: fixed;
    left: 40%;
    top: 30%;
    width: 350px;
    height: 200px;
    background-color: #ffffffdd;
    color: white;
    border-radius: 15px;
`
const AdminEnterModalHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 5px;
    background-color: #0F275C;
    width: 100%;
    font-size: 24px;
    font-weight: 900;
    height: 25%;
    border-radius: 15px 15px 0 0;
    svg {
        &:hover {
            cursor: pointer;
        }
    }
`

const AdminEnterModalContent = styled.div`
    width: 100%;
    padding: 10px;
    color: black;
`
const AdminEnterModalFooter = styled.div`
    margin-top: 10px;
    padding: 10px;
`

const EnterButton = styled.div`
    background-color: #0F275C;
    text-align: center;
    padding: 10px;
    border-radius: 15px;
    cursor: pointer;
`

export default AdminEnterModal