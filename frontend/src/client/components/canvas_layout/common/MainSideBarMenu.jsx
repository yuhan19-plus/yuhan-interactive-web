/** 파일생성자 : 임성준
 * 임성준 : 프론트엔드 개발
 * 이석재
 *   - 상담신청 메뉴가 로그인 시에만 표시되도록 수정
 */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBowlFood, faCode, faDna, faEnvelopeOpenText, faLightbulb, faPenRuler } from '@fortawesome/free-solid-svg-icons';
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
import React from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { board, computerSoftwareMap, consultation, deptMap, deptRec, food, foodNutritionMap, industrialDesignMap, yuhanBioMap } from '../../../../redux/actions/actions';

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
    const handleChangeMap = () => {
        dispatch(deptMap())
        navigate('/department')
    }
    const handleComputerSW = () => {
        dispatch(computerSoftwareMap())
        navigate('/department/csw')
    }
    const handleIndustrialDesign = () => {
        dispatch(industrialDesignMap())
        navigate('/department/id')
    }
    const handleFoodNutrition = () => {
        dispatch(foodNutritionMap())
        navigate('/department/fn')
    }
    const handleYuhanBio = () => {
        dispatch(yuhanBioMap())
        navigate('/department/bio')
    }
    const handleDeptRec = () => {
        dispatch(deptRec())
    }

    // 쿠키 값 가져오기를 위한 훅
    const [cookies] = useCookies(['user']);

    return (
        <>
            <div>
                <AccountBalanceIcon />
                <span><a href='https://www.yuhan.ac.kr/ibuilder.do?menu_idx=3007'>대학소개</a></span>
            </div>
            <div>
                <InfoIcon />
                <span><a href='https://sky.yuhan.ac.kr/intro.html'>입학안내</a></span>
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
                <span><a onClick={handleSideMenuBoard}>게시판</a></span>
            </div>
            {/* 쿠키가 있을 때만 상담신청 메뉴를 표시 */}
            {cookies.user && (
                <div>
                    <FontAwesomeIcon icon={faEnvelopeOpenText} />
                    <span><a onClick={handleSideMenuConsultation}>상담신청</a></span>
                </div>
            )}
            <div>
                <RestaurantMenu />
                <span><a onClick={handleSideMenuFood}>오늘의 메뉴</a></span>
            </div>
            <div>
                <FontAwesomeIcon icon={faLightbulb} />
                <span><a onClick={handleDeptRec}>전공추천</a></span>
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
            {/* <div>
                <FontAwesomeIcon icon={faChalkboardTeacher}/>
                <span><a>학과체험</a></span>
            </div> */}
            {/* <div>
                <FontAwesomeIcon icon={faCode} />
                <span><a onClick={handleComputerSW}>컴퓨터소프트웨어공학과체험</a></span>
            </div>
            <div>
                <FontAwesomeIcon icon={faPenRuler} />
                <span><a onClick={handleIndustrialDesign}>산업디자인학과체험</a></span>
            </div>
            <div>
                <FontAwesomeIcon icon={faBowlFood} />
                <span><a onClick={handleFoodNutrition}>식품영양학과체험</a></span>
            </div>
            <div>
                <FontAwesomeIcon icon={faDna} />
                <span><a onClick={handleYuhanBio}>유한생명바이오학과체험</a></span>
            </div> */}
            {/* test용 디비 
            <div>
                <AssignmentIcon />
                <span><a href='/boardtest'>디비test</a></span>
            </div> */}
        </>
    )
}

export default MainSideBarMenu