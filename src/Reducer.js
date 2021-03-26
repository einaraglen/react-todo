const Reducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return {
                ...state,
                data: action.payload
            };
        case 'ADD_DATA':
            return {
                ...state,
                data: state.data.concat(action.payload)
            };
        case 'REMOVE_DATA':
            return {
                ...state,
                data: state.data.filter(data => data.title !== action.payload)
            };
        default:
            return state;
    }
};

export default Reducer;