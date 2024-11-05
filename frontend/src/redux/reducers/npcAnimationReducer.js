import { INIT_NPC_ANIMATION, NPC_ANI_HANDS_UP, NPC_ANI_MOVE } from "../actions/actions";

const initialState = {
    value: false,
    animationName: ''
}

export function npcAnimationReducer(state = initialState, action) {
    switch (action.type) {
        case INIT_NPC_ANIMATION:
            return {
                ...state,
                value: false,
                npcName: '',
                animationName: ''
            }
        case NPC_ANI_MOVE:
            return {
                ...state,
                value: !state.value,
                npcName: '',
                animationName: 'move'
            }
        case NPC_ANI_HANDS_UP:
            return {
                ...state,
                value: !state.value,
                npcName: '',
                animationName: 'handsUp'
            }
    }
}