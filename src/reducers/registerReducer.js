import {
    INIT_REGISTER,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from '../actions/types';

const INITIAL_STATE = {
    error: '',
    user: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case INIT_REGISTER:
            return { ...state, ...INITIAL_STATE };
        case REGISTER_SUCCESS:
            return { ...state, ...INITIAL_STATE, user: action.payload };
        case REGISTER_FAIL:
            return { ...state, ...INITIAL_STATE, error: action.payload };
        default:
            return state;
    }
};
