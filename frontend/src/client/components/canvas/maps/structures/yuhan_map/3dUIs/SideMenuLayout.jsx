/** 파일생성자 : 임성준
 * 임성준 : 프론트엔드 개발
 * 오자현 : sideboard 추가
 */

import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import SideBoard from '../../../../../canvas_layout/sideboard/SideBoard'
import ClientFood from '../../../../../canvas_layout/todaymenu/ClientFood'
import DetailFooter from './DetailFooter'
import DetailHeader from './DetailHeader'
import CounselContent from './counsel/CounselContent'
import { useCookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import Swal from 'sweetalert2'
import { currentProfessorUserInfo, currentStudentUserInfo, myCounsel, reqForConsultation } from '../../../../../../../redux/actions/actions'

let title, counselName

const SideMenuLayout = (props) => {
    const dispatch = useDispatch()
    const [cookies] = useCookies(['user'])
    const userId = cookies.user
    const userType = cookies.userType
    const userName = cookies.userName
    console.log(userId)
    console.log(userType)
    console.log(userName)

    const { pageName, value } = props
    // console.log(pageName)

    title = pageName

    if (title === 'consultation') title = '상담신청'
    else if (title === 'board') title = '유한게시판'
    else if (title === 'food') title = '오늘의 메뉴'
    else if (title === 'deptRec') title = '전공추천'

    // 현재 학생정보 가져오기
    const CurrentStudentData = async () => {
        try {
            const response = await axios.get(`/api/consultation/current-student-info/${userId}`)
            const data = response.data
            console.log("data", data)
            dispatch(currentStudentUserInfo(data.student))
            Swal.fire({
                icon: 'success',
                title: '데이터 로드 성공.',
                text: '학생 데이터를 가져왔습니다.',
            })
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: '오류 발생',
                text: `학생 데이터를 가져오는 도중 오류가 발생했습니다: ${error}`,
            })
        }
    }

    // 현재 교수정보 가져오기
    const CurrentProfessorData = async () => {
        try {
            const response = await axios.get(`/api/consultation/current-professor-info/${userId}`)
            const data = response.data
            console.log("data", data)
            dispatch(currentProfessorUserInfo(data.professor))
            Swal.fire({
                icon: 'success',
                title: '데이터 로드 성공.',
                text: '교수 데이터를 가져왔습니다.',
            })
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: '오류 발생',
                text: `교수 데이터를 가져오는 도중 오류가 발생했습니다: ${error}`,
            })
        }
    }

    useEffect(() => {
        if (userId) {
            if(userType === 'student') {
                CurrentStudentData()
                dispatch(myCounsel())
            }
            if(userType === 'professor') {
                CurrentProfessorData()
                dispatch(reqForConsultation())
            }
        }
    }, [])

    return (
        <SideMenuLayoutWrapper>
            {value &&
                <>
                    <DetailHeader title={title} />
                    <DetailContent>
                        {/* 내용작성 */}
                        {title === '유한게시판' &&
                            <SideBoard />
                        }

                        {title === '오늘의 메뉴' &&
                        <ClientFood /> }

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