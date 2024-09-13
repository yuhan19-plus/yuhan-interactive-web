// 파일 생성자 : 임성준

/* 액션타입 정의영역 - 성준 */

// 캐릭터 - 성준
export const MAIN_CHARACTER = 'MAIN_CHARACTER'

// 애니메이션

// 클라이언트 사이드 메뉴 - 성준
export const INIT_SIDE_MENU = 'INIT_SIDE_MENU'
export const SIDE_MENU_CONSULTATION = 'SIDE_MENU_CONSULTATION'
export const SIDE_MENU_BOARD = 'SIDE_MENU_BOARD'
export const SIDE_MENU_FOOD = 'SIDE_MENU_FOOD'
export const SIDE_MENU_DEPT_REC = 'SIDE_MENU_DEPT_REC'

// 맵 - 성준
export const YH_MAP = 'YH_MAP'
export const DEPT_MAP = 'DEPT_MAP'
export const COMPUTER_SOFTWARE_MAP = 'COMPUTER_SOFTWARE_MAP'
export const INDUSTRIAL_DESIGN_MAP = 'INDUSTRIAL_DESIGN_MAP'
export const FOOD_NUTRITION_MAP = 'FOOD_NUTRITION_MAP'
export const YUHAN_LIFE_BIO_MAP = 'YUHAN_LIFE_BIO_MAP'


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

// 미니맵 상단 버튼 그룹 - 성준
export const AERIAL_VIEW = 'AERIAL_VIEW'


/* 액션 생성자 정의영역 - 성준 */

// 캐릭터 - 성준
export const mainChar = () => ({
    type: MAIN_CHARACTER
})

// 맵 - 성준
export const yhMap = () => ({
    type: YH_MAP
})
export const deptMap = () => ({
    type: DEPT_MAP
})
export const computerSoftwareMap = () => ({
    type: COMPUTER_SOFTWARE_MAP
})
export const industrialDesignMap = () => ({
    type: INDUSTRIAL_DESIGN_MAP
})
export const foodNutritionMap = () => ({
    type: FOOD_NUTRITION_MAP
})
export const yuhanBioMap = () => ({
    type: YUHAN_LIFE_BIO_MAP
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

// 모달 - 성준
export const initModal = () => ({
    type: INIT_MODAL
})
export const adminEnterModal = () => ({
    type: ADMIN_ENTER_MODAL
})

// 미니맵 상단 버튼 그룹 - 성준
export const aerialView = () => ({
    type: AERIAL_VIEW
})

// 키오스크
export const initKiosk = () => ({
    type: INIT_KIOSK
})
export const kioskPyeonghwaOne = () => ({
    type: KIOSK_PYEONGHWA_ONE
})
export const kioskPyeonghwaTwo = () => ({
    type: KIOSK_PYEONGHWA_TWO
})
export const kioskBongSa = () => ({
    type: KIOSK_BONGSA
})
export const kioskJayu = () => ({
    type: KIOSK_JAYU
})
export const kioskCafeteria = () => ({
    type: KIOSK_STUDENT_CAFETERIA
})
export const kioskNanum = () => ({
    type: KIOSK_NANUM
})
export const kioskChangjo = () => ({
    type: KIOSK_CHANGJO
})
export const kioskMemorialHall = () => ({
    type: KIOSK_MEMORIAL_HALL
})
export const kioskYujaela = () => ({
    type: KIOSK_YUJAELA
})