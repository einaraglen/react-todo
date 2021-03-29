const Reducer = (state, action) => {

    switch (action.type) {
        //for setting data from session storage
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