import React, { useCallback, useEffect, useState } from 'react'
import { Button, debounce } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarPlus, faCircleXmark, faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons';
import Calendar from 'react-calendar'
import Swal from 'sweetalert2';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { counselBtn } from '../../../../../../../../redux/actions/actions';
import moment from 'moment';
import axios from 'axios';

const YuhanCalendar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const currentUserInfoState = useSelector((state) => state.currentUser)
    const myProfessorInfoState = useSelector((state) => state.myProfessor)

    const userId = currentUserInfoState.user_id
    const userType = currentUserInfoState.user_type
    const userMajor = currentUserInfoState.user_major
    const userName = currentUserInfoState.user_name

    const today = new Date()
    const [date, setDate] = useState(today)
    
    const currentMonth = moment(date).format("M")

    const handleTodayClick = () => {
        const today = new Date()
        setDate(today)
    }
    const handleDateChange = (date) => {
        setDate(date)
    }

    // navigate 함수의 state를 사용해 날짜를 루트 경로로 전달
    const handleReqForCounsel = (clickedDate, checkedDateAndTime) => {
        navigate('/', { state: {
            date: clickedDate,
            checkedDateAndTime: checkedDateAndTime
        } })
        dispatch(counselBtn())
    }

    // 날짜 확인
    const checkCounselDate = async (userId, userType, date) => {
        if(!myProfessorInfoState || myProfessorInfoState.length === 0) return
        try {
            const today = moment(new Date()).format("YYYY-MM-DD")
            date = moment(date).format("YYYY-MM-DD")
            const response = await axios.get('/api/consultation/counsel-date', {
                params: {
                    professorId: userId,
                    professorName: myProfessorInfoState.myProfessorName,
                    professorMajor: myProfessorInfoState.myProfessorMajor,
                    counselDate: date,
                    userType: userType
                }
            })
            const isCheckedDate = response.data.checkedDate
            const clickedDate = response.data.checkedDate[0]?.counsel_date
            const checkedDateAndTime = response.data.checkedDateAndTime

            // console.log(isCheckedDate.length)
            // console.log(clickedDate)
            // console.log(checkedDateAndTime)

            if(date > today) {
                // 학생일 경우 교수일 경우 나누기
                if(userType === 'student') {
                    if(isCheckedDate.length > 0 && checkedDateAndTime.length > 0) {
                        Swal.fire({
                            icon: "success",
                            title: "상담신청",
                            text: `${clickedDate}에 신청하시겠습니까?`,
                            showCancelButton: true,
                            confirmButtonText: "신청",
                            cancelButtonText: "닫기",
                        }).then((res) => {
                            if (res.isConfirmed) {
                                handleReqForCounsel(clickedDate, checkedDateAndTime)
                            } else{
                                return
                            }
                        })
                    } else if(checkedDateAndTime.length <= 0) {
                        Swal.fire({
                            icon: "warning",
                            title: "상담불가",
                            text: "상담신청이 전부 찼습니다."
                        })
                    } else {
                        Swal.fire({
                            icon: "warning",
                            title: "상담불가",
                            text: "상담신청 날짜를 선택해주세요"
                        })
                    }
                } else {
                    if(isCheckedDate.length) {
                        Swal.fire({
                            icon: "warning",
                            title: "등록불가",
                            text: `${clickedDate}은 이미 등록된 날짜입니다. 등록을 취소하시겠습니까?`,
                            showCancelButton: true,
                            confirmButtonText: "등록취소",
                            cancelButtonText: "닫기",
                        }).then((res) => {
                            if (res.isConfirmed) {
                                // 등록취소 메서드 호출
                                ClickCancelDate(userId, clickedDate)
                            } else{
                                return
                            }
                        })
                    } else {
                        Swal.fire({
                            icon: 'question',
                            title: '날짜등록',
                            text: `${date}를 상담가능날짜로 등록하시겠습니까?`,
                            showCancelButton: true,
                            confirmButtonText: "등록",
                            cancelButtonText: "닫기",
                        }).then((res) => {
                            if (res.isConfirmed) {
                                ClickRegisterDate(userId, userMajor, userName, date)
                            } else{
                                return
                            }
                        })
                    }
                }
            } else {
                if(userType === 'student') {
                    Swal.fire({
                        icon: 'warning',
                        title: '경고',
                        text: '지난 날짜 혹은 당일은 상담신청할 수 없습니다.',
                    })
                } else {
                    Swal.fire({
                        icon: 'warning',
                        title: '경고',
                        text: '지난 날짜 혹은 당일은 상담가능날짜로 등록할 수 없습니다.',
                    })
                }
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: '오류 발생',
                text: `데이터를 불러올 수 없습니다: ${error.message}`,
            })
        }
    }

    // 날짜 등록 처리
    const ClickRegisterDate = async (userId, userMajor, userName, counselDate) => {
        try {
            // put일 때 params를 사용할 경우 직접 전송해야함
            const response = await axios.put('/api/consultation/counsel-date-register/register-date', {
                professorId: userId,
                counselDate: counselDate,
                professorName: userName,
                professorMajor: userMajor
            })
            console.log(response.data)
            Swal.fire({
                icon: 'success',
                title: '날짜등록',
                text: `${counselDate}상담가능 날짜를 등록하였습니다.`,
            })
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: '오류 발생',
                text: `${counselDate}를 상담 가능 날짜로 등록할 수 없습니다: ${error}`,
            })
        }
    }

    // 등록된 날짜 취소 처리
    const ClickCancelDate = async (userId, counselDate) => {
        try {
            await axios.delete('/api/consultation/counsel-date-delete', {
                data: {
                    userId: userId,
                    counselDate: counselDate
                }
            })
            Swal.fire({
                icon: 'success',
                title: '날짜등록취소',
                text: '등록된 날짜를 취소하였습니다.',
            })
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: '오류 발생',
                text: `등록된 날짜를 취소할 수 없습니다: ${error}`,
            })
        }
    }

    const debounceCheckCounselDate = useCallback(debounce((date) => {
        checkCounselDate(userId, userType, date)
    }, 300), [myProfessorInfoState])

    return (
        <>
            <CalendarWrapper>
                <Button
                    variant="contained"
                    onClick={handleTodayClick}
                    color="info"
                >
                    오늘
                </Button>
                <StyledCalendar
                    locale="ko-KR" // 한국어 기준으로 표시
                    value={date}
                    onChange={handleDateChange}
                    onClickDay={debounceCheckCounselDate(date)}
                    formatDay={(locale, date) => moment(date).format("D")} // 일 제거 숫자만 보이게
                    formatYear={(locale, date) => moment(date).format("YYYY")} // 네비게이션 눌렀을때 숫자 년도만 보이게
                    formatMonthYear={(locale, date) => moment(date).format("YYYY. MM")} // 네비게이션에서 2023. 12 이렇게 보이도록 설정
                    calendarType="gregory" // 일요일 부터 시작
                    showNeighboringMonth={false} // 전달, 다음달 날짜 숨기기
                    next2Label={null} // +1년 & +10년 이동 버튼 숨기기
                    prev2Label={null} // -1년 & -10년 이동 버튼 숨기기
                    minDetail="year" // 10년단위 년도 숨기기
                    tileClassName={({ date, view }) => {
                        // view는 달력의 현재 보기 모드를 나타냅니다. 'month', 'year', 'decade' 중 하나
                        if (view === 'month' && moment(date).day() === 6) { // 토요일을 확인 (day() === 6이면 토요일)
                          return 'saturday'
                        }
                    }}
                    tileContent={({date, view}) => {
                        let html = []
                        if(view === 'month' &&
                            date.getMonth() === today.getMonth()
                            && date.getDate() === today.getDate()) {
                                html.push(<TodayDate key={"today"}>오늘</TodayDate>)
                        }
                        if(date < today) {
                            html.push(
                                <React.Fragment key={moment(date).format("YYYY-MM-DD")}>
                                    {
                                        userType === 'student' ? (
                                            <CounselBtn
                                                variant="contained"
                                                className='font-color-red'
                                            >
                                                <FontAwesomeIcon icon={faCircleXmark} color='red' />
                                                <p>상담불가</p>
                                            </CounselBtn>
                                        ) : (
                                            <CounselBtn
                                                variant="contained"
                                                className='font-color-red'
                                            >
                                                <FontAwesomeIcon icon={faCircleXmark} />
                                                <p>등록불가</p>
                                            </CounselBtn>
                                        )
                                    }
                                </React.Fragment>
                            )
                        } else {
                            html.push(
                                <React.Fragment key={moment(date).format("YYYY-MM-DD")}>
                                    {
                                        userType === 'student' ? (
                                            <CounselBtn
                                                variant="contained"
                                                className='font-color-green'
                                            >
                                                {/* <FontAwesomeIcon icon={faCircleCheck} color='green' /> */}
                                                <FontAwesomeIcon icon={faEnvelopeOpenText} />
                                                <p>상담신청</p>
                                            </CounselBtn>
                                        ) : (
                                            <CounselBtn
                                                variant="contained"
                                                className='font-color-green'
                                            >
                                                <FontAwesomeIcon icon={faCalendarPlus} color='green' />
                                                <p>날짜등록</p>
                                            </CounselBtn>
                                        )
                                    }
                                </React.Fragment>
                            )
                        }
                        return <>{html}</>
                    }}
                />
            </CalendarWrapper>
        </>
    )
}

const CalendarWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-bottom: 15px;

    /* 오늘 버튼 */
    button {
        width: 10%;
    }
    /* 전체 달력 배경 */
    .react-calendar {
        width: 100%;
        border: none;
        padding: 15px;
    }

    /* 달력 상단의 월/년도 이동 네비게이션 */
    .react-calendar__navigation {
        display: flex;
        align-items: center;
        justify-content: center;
        background: #0F275C;
    }

    /* 네비게이션 버튼 */
    .react-calendar__navigation button {
        font-weight: 800;
        font-size: 1rem;
        background: #0F275C;
        color: white;
    }

    /* 네비게이션 버튼 컬러 */
    .react-calendar__navigation button:focus,
    .react-calendar__navigation button:hover {
        background-color: #0F275C;
    }

    /* 오늘 날짜 폰트 컬러 */
    .react-calendar__tile--now {
        background: none;
        abbr {
            color: #015850;
            font-weight: 900;
            font-size: 16px;
        }
    }

    /* 각 날짜 셀 */
    /* .react-calendar__month-view__days__day {
        
    } */

    /* 현재 날짜 */
    .react-calendar__tile--now {
        background: #CAD5E0;
        border-radius: 5px;
    }

    /* 토요일, 일요일에만 폰트 색상 적용 */
    .react-calendar__month-view__weekdays__weekday--weekend abbr[title="일요일"] {
        color: red;
    }
    .react-calendar__month-view__weekdays__weekday--weekend abbr[title="토요일"] {
        color: blue;
    }

    /* 요일 밑줄 제거 */
    .react-calendar__month-view__weekdays abbr {
        text-align: center;
        text-decoration: none;
        font-weight: 800;
    }

    .react-calendar__tile {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .react-calendar__month-view__days__day {
        padding: 15px;
    }

    /* 선택한 날짜 스타일 적용 */
    .react-calendar__tile:enabled:hover,
    .react-calendar__tile:enabled:focus,
    .react-calendar__tile--active {
        background: #CAD5E0;
        border-radius: 5px;
        color: white;
        border: none;
    }

    /* 비활성화된 날짜 */
    .react-calendar__tile--disabled {
        background-color: #CAD5E0;
        color: #9e9e9e;
        pointer-events: none; /* 클릭 불가능 */
    }

`

/* 오늘 날짜에 텍스트 삽입 스타일 */
const TodayDate = styled.div`
    font-size: x-small;
    color: #0F275C;
    font-weight: 600;
`

const StyledCalendar = styled(Calendar)``

const CounselBtn = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export default YuhanCalendar