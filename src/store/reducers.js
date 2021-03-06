import axios from 'axios'
import * as actions from './actions';


const initialState={
	localUID:null,
	levels: [0],
}





const reducer =(state=initialState, action) => {
	
	switch (action.type){
		case actions.Login:
			console.log(action.levels)
			return {
				...state,
				localUID: action.user,
				levels: action.levels,
			
		};

		case actions.Update: 
			
			const newlevels= [...state.levels];
			console.log(newlevels);

			if( !newlevels.includes(action.level)){
				newlevels.push(action.level);
				const data= {levels: newlevels};

				if(state.localUID){
					axios.patch('https://smartdriverreact.firebaseio.com/user/'+state.localUID+'.json', data)
					.then(response=> console.log(response.data))
					.catch(err=> console.log(err.response))
				}
				
						
			}

			return {
				...state,
				levels: newlevels,
			};

		case actions.Logout:
			alert('You have logged out!');
			return{
				...state,
				localUID: null,
				levels:[0]
			};

		default: {
			return{
				...state
			}
		}
		
	}
	return{
		...state
	}
}


export default reducer;