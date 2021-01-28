import  { useEffect } from 'react';
import { connect, useDispatch } from "react-redux"
import { removeUser } from '../actions/userAction';
import { toast } from "react-toastify";

const Deleteaccount = ({token}) => {
const dispatch =  useDispatch();
console.log(token)

    useEffect(()=>{
    dispatch(removeUser(token))
    .then(()=> {
        toast.success("Your Account Is Deleted Successfully")
        window.location = "/";
    })        
}, [dispatch, token])

    return ( 
        null
     );
}

const mapStateToProps = (state) => ({
 token:  state.users.token
})
 
export default connect(mapStateToProps)(Deleteaccount);