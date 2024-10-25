// 파일 생성자 : 임성준

/* 액션타입 정의영역 - 성준 */
// 현재 사용자 정보 - 성준
export const CURRENT_STUDENT_USER = 'CURRENT_STUDENT_USER'
export const CURRENT_PROFESSOR_USER = 'CURRENT_PROFESSOR_USER'

// 교수정보 저장 - 성준
export const MY_PROFESSOR_INFO = 'MY_PROFESSOR_INFO'

// 캐릭터 - 성준
export const INIT_CHARACTER = 'INIT_CHARACTER'
export const MAIN_CHARACTER = 'MAIN_CHARACTER'
export const MAIN_CHARACTER_DEPT = 'MAIN_CHARACTER_DEPT'

// 미니맵 - 성준
export const INIT_MINI_MAP_TELEPORT = 'INIT_MINI_MAP_TELEPORT'
export const MINI_MAP_TELEPORT = 'MINI_MAP_TELEPORT'

// 애니메이션

// 클라이언트 사이드 메뉴 - 성준
export const INIT_SIDE_MENU = 'INIT_SIDE_MENU'
export const SIDE_MENU_CONSULTATION = 'SIDE_MENU_CONSULTATION'
export const SIDE_MENU_BOARD = 'SIDE_MENU_BOARD'
export const SIDE_MENU_FOOD = 'SIDE_MENU_FOOD'
export const SIDE_MENU_DEPT_REC = 'SIDE_MENU_DEPT_REC'

// 상담신청 - 성준
export const INIT_CONSULTATION_MENU = 'INIT_CONSULTATION_MENU'
export const REQ_FOR_CONSULTATION = 'REQ_FOR_CONSULTATION'
export const MY_COUNSEL = 'MY_COUNSEL'
export const COUNSEL_DATE = 'COUNSEL_DATE'
export const REQ_FOR_CONSULTATION_LIST = 'REQ_FOR_CONSULTATION_LIST'
export const COUNSEL_DATE_REGISTER = 'COUNSEL_DATE_REGISTER'

// 맵 - 성준
export const YH_MAP = 'YH_MAP'
export const DEPT_MAP = 'DEPT_MAP'
export const COMPUTER_SOFTWARE_MAP = 'COMPUTER_SOFTWARE_MAP'
export const INDUSTRIAL_DESIGN_MAP = 'INDUSTRIAL_DESIGN_MAP'
export const FOOD_NUTRITION_MAP = 'FOOD_NUTRITION_MAP'
export const YUHAN_LIFE_BIO_MAP = 'YUHAN_LIFE_BIO_MAP'

// 가이드
export const INIT_GUIDE = 'INIT_GUIDE'
export const GUIDE_WELCOME = 'GUIDE_WELCOME'
export const GUIDE_TV = 'GUIDE_TV'
export const GUIDE_STATUE = 'GUIDE_STATUE'

// 모달 - 성준
export const ADMIN_ENTER_MODAL = 'ADMIN_ENTER_MODAL'
export const INIT_MODAL = 'INIT_MODAL'

// 키오스크 - 성준
export const INIT_KIOSK = 'INIT_KIOSK'
export const KIOSK_PYEONGHWA_ONE = 'KIOSK_PYEONGHWA_ONE'
export const KIOSK_PYEONGHWA_TWO = 'KIOSK_PYEONGHWA_TWO'
export const KIOSK_BONGSA = 'KIOSK_BONGSA'
export const KIOSK_JAYU = 'KIOSK_JAYU'
export const KIOSK_STUDENT_CAFETERIA = 'KIOSK_STUDENT_CAFETERIA'
export const KIOSK_NANUM = 'KIOSK_NANUM'
export const KIOSK_CHANGJO = 'KIOSK_CHANGJO'
export const KIOSK_MEMORIAL_HALL = 'KIOSK_MEMORIAL_HALL'
export const KIOSK_YUJAELA = 'KIOSK_YUJAELA'

// 학과체험 맵 학과소개 - 성준
export const INIT_DEPT_INFO = 'INIT_DEPT_INFO'
export const DEPT_INFO_EDU_GOALS = 'DEPT_INFO_EDU_GOALS' // 교육목표
export const DEPT_INFO_MAIN_EDU_FIELDS = 'DEPT_INFO_MAIN_EDU_FIELDS' // 주요교육분야
export const DEPT_INFO_CAREER_EMPLOYMENT_FIELD = 'DEPT_INFO_CAREER_EMPLOYMENT_FIELD' // 진로 및 취업분야
export const DEPT_INFO_LICENSE = 'DEPT_INFO_LICENSE' // 자격증
export const DEPT_INFO_DEPT_FEATURES = 'DEPT_INFO_DEPT_FEATURES' // 학과특징

// 미니맵 상단 버튼 그룹 - 성준
// 항공뷰 버튼 - 성준
export const AERIAL_VIEW = 'AERIAL_VIEW'
// 찾아오는 길버튼 - 자현
export const DIRECTIONS_VIEW = 'DIRECTIONS_VIEW'
// 흡연구역 버튼 - 석재
export const SMOKINGAREA_VIEW = 'SMOKINGAREA_VIEW'
// 캠퍼스안내 버튼 - 성준
export const GUIDE_VIEW = 'GUIDE_VIEW'

//입구 동상 - 정민
export const ENTER_STATUE = 'ENTER_STATUE';
export const LEAVE_STATUE = 'LEAVE_STATUE';

//학생 식당 키오스크 오브젝트 호출 -정민
export const ENTER_STUDENTKIOSK = 'ENTER_STUDENTKIOSK';
export const LEAVE_STUDENTKIOSK = 'LEAVE_STUDENTKIOSK';

// 버스 정류장 - 자현
export const ENTER_BUS_STATION_ONE = 'ENTER_BUS_STATION_ONE';
export const LEAVE_BUS_STATION_ONE = 'LEAVE_BUS_STATION_ONE';
export const ENTER_BUS_STATION_TWO = 'ENTER_BUS_STATION_TWO';
export const LEAVE_BUS_STATION_TWO = 'LEAVE_BUS_STATION_TWO';

// 흡연장 - 석재
export const ENTER_SMOKINGAREA = 'ENTER_SMOKINGAREA'
export const LEAVE_SMOKINGAREA = 'LEAVE_SMOKINGAREA'

// 코딩경험영역 - 자현
export const ENTER_CODINGAREA = 'ENTER_CODINGAREA';
export const LEAVE_CODINGAREA = 'LEAVE_CODINGAREA';

/* 액션 생성자 정의영역 - 성준 */
// 현재 사용자 정보 - 성준
export const currentStudentUserInfo = (currentStudentUserInfoData) => ({
    type: CURRENT_STUDENT_USER,
    payload: currentStudentUserInfoData
})

export const currentProfessorUserInfo = (currentProfessorUserInfoData) => ({
    type: CURRENT_PROFESSOR_USER,
    payload: currentProfessorUserInfoData
})

export const myProfessorInfo = (myProfessorInfo) => ({
    type: MY_PROFESSOR_INFO,
    payload: myProfessorInfo
})

// 캐릭터 - 성준
export const initChar = () => ({
    type: INIT_CHARACTER
})
export const mainChar = (newPosition) => ({
    type: MAIN_CHARACTER,
    payload: newPosition
})
export const mainCharDept = (newPosition) => ({
    type: MAIN_CHARACTER_DEPT,
    payload: newPosition
})

// 미니맵 - 성준
export const initMiniMapTeleport = () => ({
    type: INIT_MINI_MAP_TELEPORT
})

export const miniMapTeleport = (teleportPosition) => ({
    type: MINI_MAP_TELEPORT,
    payload: teleportPosition
})

// 맵 - 성준
export const yhMap = () => ({
    type: YH_MAP
})
export const deptMap = () => ({
    type: DEPT_MAP
})
export const computerSoftwareMap = (pathData) => ({
    type: COMPUTER_SOFTWARE_MAP,
    payload: pathData
})
export const industrialDesignMap = (pathData) => ({
    type: INDUSTRIAL_DESIGN_MAP,
    payload: pathData
})
export const foodNutritionMap = (pathData) => ({
    type: FOOD_NUTRITION_MAP,
    payload: pathData
})
export const yuhanBioMap = (pathData) => ({
    type: YUHAN_LIFE_BIO_MAP,
    payload: pathData
})

// 가이드 - 성준
export const initGuide = () => ({
    type: INIT_GUIDE
})
export const welcomeGuide = () => ({
    type: GUIDE_WELCOME
})
export const tvGuide = () => ({
    type: GUIDE_TV
})
export const statueGuide = () => ({
    type: GUIDE_STATUE
})

// 모달 - 성준
export const initModal = () => ({
    type: INIT_MODAL
})
export const adminEnterModal = () => ({
    type: ADMIN_ENTER_MODAL
})

// 클라이언트 사이드 메뉴 - 성준
export const initSideMenu = () =>({
    type: INIT_SIDE_MENU
})
export const consultation = () => ({
    type: SIDE_MENU_CONSULTATION
})
export const board = () => ({
    type: SIDE_MENU_BOARD
})
export const food = () => ({
    type: SIDE_MENU_FOOD
})
export const deptRec = () => ({
    type: SIDE_MENU_DEPT_REC
})

// 상담신청 - 성준
export const initConsultation = () => ({
    type: INIT_CONSULTATION_MENU
})
export const myCounsel = () => ({
    type: MY_COUNSEL
})
export const counselDate = () => ({
    type: COUNSEL_DATE
})
export const counselBtn = () => ({
    type: REQ_FOR_CONSULTATION
})
export const reqForConsultation = () => ({
    type: REQ_FOR_CONSULTATION_LIST
})
export const counselDateRegister = () => ({
    type: COUNSEL_DATE_REGISTER
})

// 미니맵 상단 버튼 그룹 - 성준
// 미니맵 상단 항공뷰 버튼 - 성준
export const aerialView = () => ({
    type: AERIAL_VIEW
})
// 미니맵 상단 찾아오는 길 버튼 - 자현
export const directionsView = () => ({
    type: DIRECTIONS_VIEW
})
// 미니맵 상단 흡연구역 버튼 - 석재
export const smokingAreaView = () => ({
    type: SMOKINGAREA_VIEW
})
// 미니맵 상단 캠퍼스안내 버튼 - 성준
export const campusGuideView = () => ({
    type: GUIDE_VIEW
})


// 버스정류장 진입여부
export const enterBusStationOne = () => ({
    type: ENTER_BUS_STATION_ONE,
});

export const leaveBusStationOne = () => ({
    type: LEAVE_BUS_STATION_ONE,
});

export const enterBusStationTwo = () => ({
    type: ENTER_BUS_STATION_TWO,
});

export const leaveBusStationTwo = () => ({
    type: LEAVE_BUS_STATION_TWO,
});
// 키오스크
export const initKiosk = () => ({
    type: INIT_KIOSK
})
export const kioskPyeonghwaOne = (boolValue) => ({
    type: KIOSK_PYEONGHWA_ONE,
    payload: boolValue
})
export const kioskPyeonghwaTwo = (boolValue) => ({
    type: KIOSK_PYEONGHWA_TWO,
    payload: boolValue
})
export const kioskBongSa = (boolValue) => ({
    type: KIOSK_BONGSA,
    payload: boolValue
})
export const kioskJayu = (boolValue) => ({
    type: KIOSK_JAYU,
    payload: boolValue
})
export const kioskCafeteria = (boolValue) => ({
    type: KIOSK_STUDENT_CAFETERIA,
    payload: boolValue
})
export const kioskNanum = (boolValue) => ({
    type: KIOSK_NANUM,
    payload: boolValue
})
export const kioskChangjo = (boolValue) => ({
    type: KIOSK_CHANGJO,
    payload: boolValue
})
export const kioskMemorialHall = (boolValue) => ({
    type: KIOSK_MEMORIAL_HALL,
    payload: boolValue
})
export const kioskYujaela = (boolValue) => ({
    type: KIOSK_YUJAELA,
    payload: boolValue
})
//입구 동상
export const Enter_Statue = () =>({
    type:ENTER_STATUE
})
export const Leave_Statue = () =>({
    type:LEAVE_STATUE
})

//학생 식당 오브젝트 소환
export const Enter_StudentKiosk =() =>({
    type:ENTER_STUDENTKIOSK
})
export const Leave_StudentKiosk =() =>({
    type:LEAVE_STUDENTKIOSK
})

// 흡연장
export const Enter_SmokingArea = () =>({
    type:ENTER_SMOKINGAREA
})
export const Leave_SmokingArea = () =>({
    type:LEAVE_SMOKINGAREA
})

// 학과체험 맵 학과 소개 - 성준
// 교육목표
export const initDeptInfo = () => ({
    type: INIT_DEPT_INFO
})
export const deptInfoEduGoals = () => ({
    type: DEPT_INFO_EDU_GOALS
})
// 주요교육분야
export const deptInfoMainEduFields = () => ({
    type: DEPT_INFO_MAIN_EDU_FIELDS
})
// 진로 및 취업분야
export const deptInfoCareerAndEmploymentField = () => ({
    type: DEPT_INFO_CAREER_EMPLOYMENT_FIELD
})
// 자격증
export const deptInfoLicense = () => ({
    type: DEPT_INFO_LICENSE
})
// 학과특징
export const deptInfoDeptFeatures = () => ({
    type: DEPT_INFO_DEPT_FEATURES
})

//학과체험의 코딩영역
export const Enter_CodingArea= () => ({
    type:ENTER_CODINGAREA
})
export const Leave_CodingArea= () => ({
    type:LEAVE_CODINGAREA 
})