/** 파일생성자 : 임성준
 * 임성준 : 프론트엔드 개발
 * 오자현 : sideboard 추가
 */

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import styled from 'styled-components'
import Swal from 'sweetalert2'
import SideBoard from '../../../../../canvas_layout/sideboard/SideBoard'
import ClientFood from '../../../../../canvas_layout/todaymenu/ClientFood'
import DeptRecommand from '../../../../../canvas_layout/deptrecommand/deptrecommand'
import DetailFooter from './DetailFooter'
import DetailHeader from './DetailHeader'
import CounselContent from './counsel/CounselContent'

let title, counselName

const SideMenuLayout = (props) => {
    const [cookies] = useCookies(['user'])
    const userId = cookies.user
    const userType = cookies.userType
    console.log(userType)

    const { pageName, value } = props
    // console.log(pageName)

    title = pageName

    if (title === 'consultation') title = '상담신청'
    else if (title === 'board') title = '유한게시판'
    else if (title === 'food') title = '오늘의 메뉴'
    else if (title === 'deptRec') title = '학부추천'

    // 사용자와 학생 정보의 초기값 설정
    const [userInfo, setUserInfo] = useState({
        user_name: "",
        user_phone: "",
        user_email: "",
        user_major: "",
        user_type: ""
    })

    const [studentInfo, setStudentInfo] = useState({
        student_number: 0,
        student_grade: 0
    })

    // const [professorInfo, setProfessorInfo] = useState({
    //     professor_position: ""
    // })

    // 현재 회원정보 데이터 가져오기
    const CurrentMemberData = async () => {
        try {
            const response = await axios.get(`/api/consultation/current-user/${userType}/${userId}`)
            const data = response.data
            console.log("data", data)
            setUserInfo(data.user)
            if(userType === 'student') setStudentInfo(data.student)
            if(userType === 'professor') setProfessorInfo(data.professor)
            Swal.fire({
                icon: 'success',
                title: '데이터 로드 성공.',
                text: '사용자 데이터를 가져왔습니다.',
            })
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: '오류 발생',
                text: `사용자 데이터를 가져오는 도중 오류가 발생했습니다: ${error}`,
            })
        }
    }

    // const GetProfessorName = async (userInfoType, userInfoMajor) => {
    //     try {
    //         console.log(userInfoType)
    //         console.log(userInfoMajor)
    //         const response = await axios.get(`/api/consultation/getProfessorData/${userInfoType}/${userInfoMajor}`)
    //         const data = response.data
    //         console.log("data", data)
    //         Swal.fire({
    //             icon: 'success',
    //             title: '데이터 로드 성공.',
    //             text: '사용자 데이터를 가져왔습니다.',
    //         })
    //     } catch (error) {
    //         Swal.fire({
    //             icon: 'error',
    //             title: '오류 발생',
    //             text: `교수정보 데이터를 가져오는 도중 오류가 발생했습니다: ${error}`,
    //         })
    //     }
    // }

    useEffect(() => {
        if (userId) {
            CurrentMemberData()
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
                            <CounselContent userInfo={userInfo} studentInfo={studentInfo} userId={userId} userType={userType} />
                        }
                        {title === '학부추천' &&
                            <DeptRecommand />
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