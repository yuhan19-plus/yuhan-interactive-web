/** 파일생성자 : 임성준
 * 임성준 : 프론트엔드 개발
 * 이석재
 *   - 상담신청 메뉴가 로그인 시에만 표시되도록 수정
 */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelopeOpenText, faLightbulb, faSchool } from '@fortawesome/free-solid-svg-icons';
import { RestaurantMenu } from '@mui/icons-material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BusinessIcon from '@mui/icons-material/Business';
import CampaignIcon from '@mui/icons-material/Campaign';
import FestivalIcon from '@mui/icons-material/Festival';
import InfoIcon from '@mui/icons-material/Info';
import MuseumIcon from '@mui/icons-material/Museum';
import SchoolIcon from '@mui/icons-material/School';
import SupportIcon from '@mui/icons-material/Support';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { board, consultation, deptRec, food, initChar, yhMap } from '../../../../redux/actions/actions';
import Swal from 'sweetalert2';
import styled from 'styled-components';

const MainSideBarMenu = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSideMenuConsultation = () => {
        dispatch(consultation())
    }
    const handleSideMenuBoard = () => {
        dispatch(board())
    }
    const handleSideMenuFood = () => {
        dispatch(food())
    }
    const handleDeptRec = () => {
        dispatch(deptRec())
    }

    // 쿠키 값 가져오기를 위한 훅
    const [cookies] = useCookies(['user']);

    return (
        <MainSideBarMenuWrapper>
            <MainSideBarMenuItem>
                <FontAwesomeIcon icon={faSchool} />
                <span>
                    <a onClick={() => {
                        Swal.fire({
                            title: '정문이동',
                            icon: 'warning',
                            text: '모든 상태가 초기화되고 정문으로 이동합니다.',
                            showCancelButton: true,
                            confirmButtonText: '이동',
                            cancelButtonText: '닫기'                     
                        }).then((res) => {
                            if (res.isConfirmed) {
                                history.go(0) // 새로고침
                            }
                        })
                    }}>
                        유한대학교
                    </a>
                </span>
            </MainSideBarMenuItem>
            <MainSideBarMenuItem>
                <AccountBalanceIcon />
                <span><a href='https://www.yuhan.ac.kr/ibuilder.do?menu_idx=3007' target='_blank'>대학소개</a></span>
            </MainSideBarMenuItem>
            <MainSideBarMenuItem>
                <InfoIcon />
                <span><a href='https://sky.yuhan.ac.kr/intro.html' target='_blank'>입학안내</a></span>
            </MainSideBarMenuItem>
            <MainSideBarMenuItem>
                <CampaignIcon />
                <span><a href='https://www.yuhan.ac.kr/bbs/data/list.do?menu_idx=3071' target='_blank'>대학홍보</a></span>
            </MainSideBarMenuItem>
            <MainSideBarMenuItem>
                <SchoolIcon />
                <span><a href='https://www.yuhan.ac.kr/ibuilder.do?menu_idx=3091' target='_blank'>학과안내</a></span>
            </MainSideBarMenuItem>
            <MainSideBarMenuItem>
                <SupportIcon />
                <span><a href='https://www.yuhan.ac.kr/ibuilder.do?per_menu_idx=3101&menu_idx=3415' target='_blank'>학생서비스</a></span>
            </MainSideBarMenuItem>
            <MainSideBarMenuItem>
                <AssignmentIcon />
                <span><a onClick={handleSideMenuBoard}>게시판</a></span>
            </MainSideBarMenuItem>
            {/* 쿠키가 있을 때만 상담신청 메뉴를 표시 */}
            {cookies.user && (
                <MainSideBarMenuItem>
                    <FontAwesomeIcon icon={faEnvelopeOpenText} />
                    <span><a onClick={handleSideMenuConsultation}>상담신청</a></span>
                </MainSideBarMenuItem>
            )}
            <MainSideBarMenuItem>
                <RestaurantMenu />
                <span><a onClick={handleSideMenuFood}>오늘의 메뉴</a></span>
            </MainSideBarMenuItem>
            <MainSideBarMenuItem>
                <FontAwesomeIcon icon={faLightbulb} />
                <span><a onClick={handleDeptRec}>학부추천</a></span>
            </MainSideBarMenuItem>
            <MainSideBarMenuItem>
                <FestivalIcon />
                <span><a href='https://www.yuhan.ac.kr/bbs/data/list.do?menu_idx=3160' target='_blank'>유한광장</a></span>
            </MainSideBarMenuItem>
            <MainSideBarMenuItem>
                <BusinessIcon />
                <span><a href='https://sanhak.yuhan.ac.kr/index.do' target='_blank'>산학협력단</a></span>
            </MainSideBarMenuItem>
            <MainSideBarMenuItem>
                <MuseumIcon />
                <span><a href='https://newih.yuhan.ac.kr/index.do' target='_blank'>유일한기념관</a></span>
            </MainSideBarMenuItem>
        </MainSideBarMenuWrapper>
    )
}

const MainSideBarMenuWrapper = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 15rem;
    border-top: 1px solid white;
`

const MainSideBarMenuItem = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 10px;
    gap: 10px;
    border-bottom: 1px solid white;
    cursor: pointer;
    color: white;

    svg {
        width: 34px;
        height: 34px;
    }

    span {
        font-size: 12px;
        padding-top: 8px;
        font-weight: 500;
    }

    & > * {
        transition: 0.2s ease-in-out;
    }
    
    &:hover {
        background-color: white;
        color: #0F275C;

        span {
            font-size: 14px;
            font-weight: 800;
        }

        span > a {
            color: #0F275C;
        }

        svg {
            width: 36px;
            height: 36px;
        }
    }
`

export default MainSideBarMenu