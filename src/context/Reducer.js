
const Reducer = (state, action) => {

    switch (action.type) {
        //for setting the context
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