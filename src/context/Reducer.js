
/**
 * For storing information, that can be mutated and set from all the
 * different compontens of a project
 * @param {Object} state 
 * @param {Function} action 
 * @returns 
 */
const Reducer = (state, action) => {

    //can be customized to fit the needs of different projects
    //very reusable
    switch (action.type) {
        case 'SET_DATA':
            return {
                ...state,
                data: action.payload
            }
        default:
            return state;
    }
};

export default Reducer;