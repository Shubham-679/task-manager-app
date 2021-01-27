const userReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_USER":
      return (state = action.payload);

    case "FIND_USER":
      return {
        token : action.payload.token,
        user : action.payload.user,
        isAdmin : action.payload.user.isAdmin
      };

    case "LOGOUT_USER":
      return (state = {});

    case "UPDATE_USER":
      return {
        // token : state.token,
        ...state,
        user :  action.payload
      }
      case "ADD_PHOTO":
        return  {
          ...state,
          user : action.payload,      
        }
      case "REMOVE_USER":
        return state = []
      
      case "GET_USER":
        return state = action.payload

    default:
      return state;
  }
};

export default userReducer;
