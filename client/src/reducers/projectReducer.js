import project from "../components/project";


const projectReducer = (state = [], action) => {
    switch (action.type) {
      
      case "ADD_PROJECT":
        return [...state, action.payload];
      
      case "GET_PROJECT":
        return state = action.payload;
      
      case "REMOVE_PROJECT":
        return state.filter((a) => a._id !== action.payload._id)
      
      case "SINGLE_PROJECT":
        return [ action.payload ]

      case "UPDATE_PROJECT":
        return {
          project : action.payload
        }
          default:
        return state;
    }
  };
  export default projectReducer;