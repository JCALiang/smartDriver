

const initialState={
	user:null,
	levels: null,

}



const reducer =(state=initialState, action) => {
	console.log(action);
	return {
		...state,
		user: action.user,
		levels: action.levels,
	};
}


export default reducer;