/**
 * Redux Reducer
 * A reducer will actually carry out the manipulation/mutation on the
 * state data. It should expect an "action" to be passed in with any
 * necessary target data to perform its duty.
 */

import { v4 as uuidv4 } from 'uuid';



const displayPostReducer = ( state = [], action ) => { // Default state is an empty array here.
    switch ( action.type )
    {
      
      case 'ADD_NEWS_FEED':

        const newsFeed = {
            uniqueId: uuidv4(), // Ensure a unique ID.
            value: action.value // Read passed-in "new to-do" value.
          };
        //Create a new array (with the same contents as the original.)
        const updatedState=state.slice();      
        updatedState.push(newsFeed);// Add this task to the state
        return updatedState;   // Return the updated state value.
        default:
            return state;
    }
  }
  export default displayPostReducer;