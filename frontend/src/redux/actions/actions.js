// 파일 생성자 : 임성준

/* 액션타입 정의영역 - 성준 */

// 클라이언트 사이드 메뉴
export const INIT_SIDE_MENU = 'INIT_SIDE_MENU'
export const SIDE_MENU_CONSULTATION = 'SIDE_MENU_CONSULTATION'
export const SIDE_MENU_BOARD = 'SIDE_MENU_BOARD'
export const SIDE_MENU_FOOD = 'SIDE_MENU_FOOD'
export const SIDE_MENU_DEPT_REC = 'SIDE_MENU_DEPT_REC'

// 맵
export const YH_MAP = 'YH_MAP'
export const DEPT_MAP = 'DEPT_MAP'
export const COMPUTER_SOFTWARE_MAP = 'COMPUTER_SOFTWARE_MAP'
export const INDUSTRIAL_DESIGN_MAP = 'INDUSTRIAL_DESIGN_MAP'
export const FOOD_NUTRITION_MAP = 'FOOD_NUTRITION_MAP'
export const YUHAN_LIFE_BIO_MAP = 'YUHAN_LIFE_BIO_MAP'


// 모달
export const ADMIN_ENTER_MODAL = 'ADMIN_ENTER_MODAL'
export const INIT_MODAL = 'INIT_MODAL'


/* 액션 생성자 정의영역 - 성준 */

// 맵
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

// 클라이언트 사이드 메뉴
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

// 모달
export const initModal = () => ({
    type: INIT_MODAL
})
export const adminEnterModal = () => ({
    type: ADMIN_ENTER_MODAL
})