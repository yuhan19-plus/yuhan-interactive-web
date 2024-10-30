/** 파일 생성자 : 임성준
 * 임성준 : 프론트엔드 개발
 * 이석재
 *   - 로그아웃 기능 구현
 *   - 로그인 시 사용자 아이디를 보여줄 수 있도록 수정
 *   - 로그아웃 시 추가된 쿠키를 삭제하도록 수정
 *   - 회원정보수정 페이지에 접근 가능하도록 추가
 *   - 관리자 로그인 구현완료
 */
import { AdminPanelSettings, Close, Login, Logout, Menu } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useDispatch, useSelector } from 'react-redux';
import MainSideBarMenu from './MainSideBarMenu';
import DeptSideBarMenu from './DeptSideBarMenu';
import { adminEnterModal, consultation, initConsultation, initSideMenu } from '../../../../redux/actions/actions';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Swal from 'sweetalert2';

const title = ''

const SideBar = () => {
    // 쿠키(세션 쿠키)
    const [cookies, setCookie, removeCookie] = useCookies();

    const dispatch = useDispatch()
    const location = useLocation()
    const currentPath = location.pathname
    // console.log('currentPath', currentPath) // 현재 경로 출력
    const currentMap = useSelector((state) => state.groundMap)
    const currentMapName = currentMap.mapName
    console.log('currentMapName', currentMapName) // 현재 맵 이름 출력
    
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const handleShowAdminEnterModal = () => {
        dispatch(adminEnterModal())
    }
    
    const handleSideMenuInit = () => {
        // 사이드 메뉴 초기화
        dispatch(initSideMenu())
    }
    const handleConsultationInit = () => {
        // 상담신청 메뉴 초기화
        dispatch(initConsultation())
    }

    // 로그아웃 메서드
    const handleLogout = () => {

        // 사이드 메뉴 상태관리 초기화 - 성준
        handleSideMenuInit()

        handleConsultationInit()

        // 쿠키 삭제
        removeCookie('user', { path: '/' });
        removeCookie('userType', { path: '/' });
        removeCookie('userName', { path: '/' });
        Swal.fire({
            title: '로그아웃 완료!',
            text: '성공적으로 로그아웃 되었습니다.',
            icon: 'success',
            confirmButtonText: '확인'
        });
    
    };

    return (
        <>
            <SideBarContainer className={isDropdownOpen ? "opened" : "closed"}>
                <SideBarHeader>
                    <img src='/assets/images/yuhan-logo2.png' />
                    
                    {cookies.user && (
                        <WelcomeWrapper>
                            <Link to={'/membermodify'}>
                                <WelcomeContent>
                                    <p>{cookies.userName}님 안녕하세요!</p>
                                </WelcomeContent>
                            </Link>
                        </WelcomeWrapper>
                    )}
                    
                    <AccountManagementWrapper>
                        <AccountManagementList>
                            {cookies.user ? ( // 쿠키가 존재하면 로그아웃 버튼을 보여줍니다.
                                <AccountManagementItem>
                                    <Link to={'/'} onClick={handleLogout}><Logout /><p>로그아웃</p></Link>
                                </AccountManagementItem>
                            ) : ( // 쿠키가 없으면 로그인 버튼을 보여줍니다.
                                <>
                                    <AccountManagementItem>
                                        <Link to={'/login'}><Login /><p>로그인</p></Link>
                                    </AccountManagementItem>
                                    <AccountManagementItem>
                                        <Link to={'/join'}><PersonAddIcon /><p>회원가입</p></Link>
                                    </AccountManagementItem>
                                </>
                            )}
                            {/* 쿠키의 userType이 admin일 때만 보여주기 */}
                            {cookies.userType === 'admin' && (
                                <>
                                    <AccountManagementItem>
                                        <a onClick={handleShowAdminEnterModal}>
                                            <AdminPanelSettings />
                                            <p>관리자</p>
                                        </a>
                                    </AccountManagementItem>
                                </>
                            )}
                        </AccountManagementList>
                    </AccountManagementWrapper>
                </SideBarHeader>
                <SideBarList>
                    {
                        (currentMapName === 'yh_map' &&  currentPath === '/') ?
                            <MainSideBarMenu /> :
                            <DeptSideBarMenu />
                    }
                </SideBarList>
            </SideBarContainer>
            <DropdownController onClick={(e) => {
                e.stopPropagation()
                setIsDropdownOpen((prev) => !prev)
            }}>
                {isDropdownOpen ? <Close /> : <Menu /> }
            </DropdownController>
        </>
    )
}

const SideBarContainer = styled.div`
    position: fixed;
    left: 0;
    bottom: 0;
    background-color: var(--main-opacity-color);
    width: 220px;
    height: 100%;
    transition: 0.3s ease-in-out;
    border-radius: 0 1rem 0 0;

    &.opened {
        transform: translateX(0);
    }

    &.closed {
        transform: translateX(-100%)
    }
`

const SideBarHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1.5rem;
  padding: 1rem;
`

const AccountManagementWrapper = styled.div`
    width: 100%;
    display: flex;
    margin-top: 1rem;
`

const AccountManagementList = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

const AccountManagementItem = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    a {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.9rem;
    }
    
    a:hover {
      border-bottom: 0.01rem solid white;
    }

    svg {
      width: 1rem;
      height: 1rem;
      margin-right: 0.3rem;
    }
`

const WelcomeWrapper = styled.div`
    width: 100%;
    font-size: 1.2rem;
    margin-top: 1rem;
`

const WelcomeContent = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
`

const SideBarList = styled.div`
    width: 100%;
    height: 100%;
`

const DropdownController = styled.div`
    position: fixed;
    top: 0;
    display: flex;
    align-items: center;
    cursor: pointer;
    background-color: var(--main-color);
    color: var(--sub-color);
    border-radius: 2.5rem;
    padding: 0.1rem;

    &:hover {
        color: var(--font-yellow-color);
    }

    svg {
        width: 2.5rem;
        height: 2.5rem;
    }
`

export default SideBar;
