import { CalendarMonth } from '@mui/icons-material'
import React, { useState } from 'react'
import Calendar from 'react-calendar'
import styled from 'styled-components'
import "react-calendar/dist/Calendar.css";
import moment from 'moment/moment';
import { Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark, faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons';
import CounselModal from '../modal/CounselModal';
import { useDispatch, useSelector } from 'react-redux';
import { counselBtn } from '../../../../../../../../redux/actions/actions';
import { useNavigate } from 'react-router-dom';

const CounselCalendar = () => {
    const navigate = useNavigate()
    const counsel = useSelector((state) => state.counsel)
    const counselValue = counsel.value
    const counselName = counsel.name

    const dispatch = useDispatch()

    const today = new Date();
    const [date, setDate] = useState(today)
    // console.log(moment(date).format("MM"))
    const currentMonth = moment(date).format("M")
    
    const handleDateChange = (newDate) => {
        setDate(newDate);
    }

    const handleTodayClick = () => {
        const today = new Date()
        setDate(today)
    }

    // 상담 가능 날짜
    const okDay = ['2024-09-23', '2024-09-27']

    const handleReqForCounsel = (clickedDate) => {
        // navigate 함수의 state를 사용해 날짜를 루트 경로로 전달
        navigate('/', { state: { date: clickedDate } })
        dispatch(counselBtn())
    }

    return (
        <CounselCalendarWrapper>
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
                        if (okDay.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
                            html.push(
                                <React.Fragment key={moment(date).format("okDay")}>
                                    <CounselBtn
                                        variant="contained"
                                        className='font-color-green'
                                        onClick={() => {
                                            const clickedDate = moment(date).format("YYYY-MM-DD")
                                            handleReqForCounsel(clickedDate)
                                        }}
                                    >
                                        {/* <FontAwesomeIcon icon={faCircleCheck} color='green' /> */}
                                        <FontAwesomeIcon icon={faEnvelopeOpenText} />
                                        <p>상담신청</p>
                                    </CounselBtn>
                                </React.Fragment>
                            )
                        } else {
                            html.push(
                                <React.Fragment key={moment(date).format("noDay")}>
                                    <CounselBtn
                                        variant="contained"
                                        className='font-color-red'
                                        onClick={() => {alert('상담신청 가능날짜를 선택해주세요.')}}
                                    >
                                        <FontAwesomeIcon icon={faCircleXmark} color='red' />
                                        <p>상담불가</p>
                                    </CounselBtn>
                                </React.Fragment>
                            )
                        }
                        return <>{html}</>
                    }}
                    // onClickDay={(value) => {
                    //     // console.log(moment(value).format("YYYY-MM-DD"))
                    //     const clickedDate = moment(value).format("YYYY-MM-DD")
                    //     if(okDay.find((x) => x !== clickedDate)) {
                    //         alert('상담신청 가능날짜를 선택해주세요.')
                    //     }
                    //     else {
                    //         console.log('asd')
                    //     }
                    // }}
                />
            </CalendarWrapper>
            <CalendarContentWrapper>
                <CalendarContentItem>
                    <CalendarContentTitle>
                        Title One
                    </CalendarContentTitle>
                    <CalendarContent>
                        asdasd
                    </CalendarContent>
                </CalendarContentItem>
                <CalendarContentItem>
                    <CalendarContentTitle>
                        {currentMonth}월 상담 가능 날짜는?
                    </CalendarContentTitle>
                    <CalendarContent>
                        {okDay.map((i) => (
                            <p key={i}>{i}</p>
                        ))}
                    </CalendarContent>
                </CalendarContentItem>
            </CalendarContentWrapper>
        </CounselCalendarWrapper>
    )
}

const CounselCalendarWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
    margin-bottom: 15px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 4px 2px 10px 0px rgba(0, 0, 0, 0.13);
`

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

const StyledCalendar = styled(Calendar)``

const CounselBtn = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const CalendarContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    border: none;
    padding: 15px;
`

const CalendarContentItem = styled.div`
    width: 100%;
    margin-bottom: 15px;
    padding: 15px;
    display: flex;
    flex-direction: column;
`

const CalendarContentTitle = styled.h3`
    width: 100%;
    margin: 0;
    border-bottom: 3px solid #0F275C;
    margin-bottom: 15px;
`

const CalendarContent = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    p {
        margin: 0 5px 0 0;
    }
`

/* 오늘 날짜에 텍스트 삽입 스타일 */
const TodayDate = styled.div`
    font-size: x-small;
    color: #0F275C;
    font-weight: 600;
`

/* 점 표시 스타일 */
// const StyledDot = styled.div`
//     background-color: blue;
//     border-radius: 50%;
//     width: 0.5rem;
//     height: 0.5rem;
// `

export default CounselCalendar