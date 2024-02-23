import { User, designs_user } from "../interfaces/ILogin";

export interface AuthState {
    status: 'cheking' | 'authenticated' | 'not-authenticated';
    token: string | null;
    errorMessage: string;
    user: User | null;
    designs_user: designs_user | null;
}

export type AuthAction =
    | { type: 'singUp', payload: { token: string, user: User } }
    | { type: 'addError', payload: string }
    | { type: 'removeError' }
    | { type: 'notAuthenticated' }
    | { type: 'logout' }
    | { type: 'updateUser', payload: { user: User } }
    | { type: 'getDesigns', payload: { designs_user: designs_user } }
    | { type: 'addDesigns', payload: { designs_user: designs_user } }
    | { type: 'updateDesign', payload: {designs_user: designs_user  } }
    | { type: 'deleteDesign', payload: { designs_user: designs_user  } };

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {

    switch (action.type) {
        case 'addError':
            return {
                ...state,
                user: null,
                status: 'not-authenticated',
                token: null,
                errorMessage: action.payload
            }

        case 'removeError':
            return {
                ...state,
                errorMessage: ''
            };

        case 'singUp':
            return {
                ...state,
                errorMessage: '',
                status: 'authenticated',
                token: action.payload.token,
                user: action.payload.user
            };

        case 'logout':
        case 'notAuthenticated':
            return {
                ...state,
                status: 'not-authenticated',
                token: null,
                user: null,
            };
        case 'updateUser':
            return {
                ...state,
                user: action.payload.user
            }

        
            case 'getDesigns':
                case 'addDesigns':
                case 'deleteDesign':
                case 'updateDesign':
                    return {
                        ...state,
                        designs_user: action.payload.designs_user
                    }
        default:
            return state;
    }


}