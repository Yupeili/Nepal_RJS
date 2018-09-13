let DefaultState = {
    program: 'Loading...'
}

const HistoryReducers = (state:Object=DefaultState, action:Function)=> {
    switch(action.type){
        case "SET_PROGRAM":
        return {
        ...state, program: action.payload
        }
        case "SET_PROGRAM_ID":
        return {
        ...state, programID: action.payload
        }
        case "SET_CURRENT_WEEK" :
        return {
        ...state, currentWeek: action.payload
        }

        case "SET_CURRENT_DAY" :
        return {
        ...state, currentDay: action.payload
        }

        case "SET_EXERCISE_RECORD" :
        return {
        ...state, record: action.payload
        }

        case "SET_EXERCISE_ID" :
        return {
        ...state, recordID: action.payload
        }
        default:
            return state
    }
}

export default HistoryReducers;