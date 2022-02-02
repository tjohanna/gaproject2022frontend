import React, {useContext, useReducer} from "react";

/////////////////////
// INITIAL STATE
////////////////////

const initialState = {
    url: "https://goals2022project.herokuapp.com",
    token: null,
    username: null,
    goals: null,
    new: {
        goal: "",
        target_date: "",
        notes: "",
        completed: ""
    },
    edit: {
        id:0,
        goal: "",
        target_date: "",
        notes: "",
        completed: ""
    }
};

//////////////////
// REDUCER - handling state changes
//////////////////
const reducer = (state, action) => {
    let newState;
    switch (action.type) {
        case "auth": 
            newState = { ...state, ...action.payload };
            return newState;
            break;
        case "logout":
            newState = {...state, token:null, username: null}
            window.localStorage.removeItem("auth");
            return newState;
            break
            case "getGoals":
                newState = { ...state, goals:action.payload}
                return newState;
                break
            case "select":
            newState = { ...state, edit: action.payload}
            return newState
            break
        default:
            return state;
            break;
        }
    };

///////////////////
// AppContext - creates context object
////////////////////
const AppContext = React.createContext(null)


/////////////////////
// AppState Component
/////////////////////
export const AppState = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
    <AppContext.Provider value={{state, dispatch}}>
        {props.children}
    </AppContext.Provider>
    );
};

///////////////////////
// userAppState hook - allows to pull context whereever needed
///////////////////////
export const useAppState = () => {
    return React.useContext(AppContext)
}

