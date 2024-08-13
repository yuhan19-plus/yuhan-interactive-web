/** 파일 생성자 : 임성준
 * 임성준 : 프론트엔드 개발
 */
import { AdminPanelSettings, Close, Login, Logout, Menu, Send } from '@mui/icons-material'
import React, { useState } from 'react'
import styled from 'styled-components'
import SchoolIcon from '@mui/icons-material/School';
import InfoIcon from '@mui/icons-material/Info';
import CampaignIcon from '@mui/icons-material/Campaign';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SupportIcon from '@mui/icons-material/Support';
import BusinessIcon from '@mui/icons-material/Business';
import MuseumIcon from '@mui/icons-material/Museum';
import FestivalIcon from '@mui/icons-material/Festival';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const SideBar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(true)

    return (
        <>
                <SideBarContainer className={isDropdownOpen ? "opened" : "closed"}>
                    <SideBarHeader>
                        <div>
                            <a href='/login'><Login /><p>로그인</p></a>
                        </div>
                        <div>
                            <a href='#'><Logout /><p>로그아웃</p></a>
                        </div>
                        <div>
                            <a href='/join'><PersonAddIcon /><p>회원가입</p></a>
                        </div>
                        <div>
                            <a href='/admin'><AdminPanelSettings /><p>관리자</p></a>
                        </div>
                    </SideBarHeader>
                    <SideBarList>
                        <div>
                            <AccountBalanceIcon />
                            <span><a href='https://www.yuhan.ac.kr/ibuilder.do?menu_idx=3007'>대학소개</a></span>
                        </div>
                        <div>
                            <InfoIcon />
                            <span><a href="https://sky.yuhan.ac.kr/intro.html">입학안내</a></span>
                        </div>
                        <div>
                            <CampaignIcon />
                            <span><a href='https://www.yuhan.ac.kr/bbs/data/list.do?menu_idx=3071'>대학홍보</a></span>
                        </div>
                        <div>
                            <SchoolIcon />
                            <span><a href='https://www.yuhan.ac.kr/ibuilder.do?menu_idx=3091'>학과안내</a></span>
                        </div>
                        <div>
                            <SupportIcon />
                            <span><a href='https://www.yuhan.ac.kr/ibuilder.do?per_menu_idx=3101&menu_idx=3415'>학생서비스</a></span>
                        </div>
                        <div>
                            <AssignmentIcon />
                            <span><a href='/board'>게시판</a></span>
                        </div>
                        <div>
                            <Send />
                            <span><a href='/consultation'>상담신청</a></span>
                        </div>
                        <div>
                            <FestivalIcon />
                            <span><a href='https://www.yuhan.ac.kr/bbs/data/list.do?menu_idx=3160'>유한광장</a></span>
                        </div>
                        <div>
                            <BusinessIcon />
                            <span><a href='https://sanhak.yuhan.ac.kr/index.do'>산학협력단</a></span>
                        </div>
                        <div>
                            <MuseumIcon />
                            <span><a href='https://newih.yuhan.ac.kr/index.do'>유일한기념관</a></span>
                        </div>
                    </SideBarList>
                </SideBarContainer>
                <DropdownController onClick={(e) => {
                    e.stopPropagation()
                    setIsDropdownOpen((prev) => !prev)
                }}>
                    {isDropdownOpen ? <Close className="side-icon-white" /> : <Menu className="side-icon-black" /> }
                </DropdownController>
        </>
    )
}

const SideBarContainer = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    background-color: #0F275Cdd;
    width: 220px;
    height: 100%;
    transition: 0.3s ease-in-out;
    padding: 0px 0px 40px 0px;
    border-radius: 0 10px 10px 0;
    &.opened {
        transform: translateX(0);
    }
    &.closed {
        transform: translateX(-100%)
    }
`

const SideBarHeader = styled.div`
    display: flex;
    flex-direction: row;
    font-size: 9px;
    justify-content: center;
    align-items: center;

    div {
        width: 33%;
        margin: 40px 0 5px 0;

        svg {
            width: 20px;
            height: 20px;
        }
        a {
            display: flex;
            justify-content: center;
            align-items: center;
        }
        a:hover {
            border-bottom: 1px solid white;
        }
    }
    
`

const SideBarList = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    div {
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
            width: 38px;
            height: 38px;
        }
        span {
            font-size: 16px;
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
                font-size: 18px;
                font-weight: 800;
            }
            span > a {
                color: #0F275C;
            }
            svg {
                width: 40px;
                height: 40px;
            }
        }
    }
`

const DropdownController = styled.div`
    position: absolute;
    top: 0;
    display: flex;
    align-items: center;
    color: #340070;
    cursor: pointer;
    svg {
        width: 42px;
        height: 42px;
    }
`

export default SideBar