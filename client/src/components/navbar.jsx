import React from 'react';
import { NavLink, Link } from 'react-router-dom'
import { connect } from 'react-redux';

const Navbar = ({users}) => {
  
        return (
            <div className="container-fluid"  style={{backgroundColor : '#2d4059'}}>
                <nav className="navbar sticky-top navbar-expand-sm navbar-dark" >
                    <div className="container-fluid">
                        
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">


                                {!users.token && (
                                <React.Fragment>
                                <Link className="navbar-brand" to="/home">Home</Link>
                                <NavLink className="nav-link " to="/login">Login</NavLink>
                                <NavLink className="nav-link " to="/signup">SignUp</NavLink>
                                </React.Fragment>
                                )}

                                {users.token && users.isAdmin && (
                                <React.Fragment>
                                <Link className="navbar-brand" to="/home">Home</Link>
                                <NavLink className="nav-link" to="/addproject">Projects</NavLink>
                                <NavLink className="nav-link" to="/profile">Profile</NavLink>
                                {/* <NavLink className="nav-link" to="/delete-account">Delete Account</NavLink> */}
                                <NavLink className="nav-link" to="/logout">Logout</NavLink>
                                </React.Fragment>
                                )}

                                {users.token  && !users.isAdmin &&  (
                                <React.Fragment>
                                <Link className="navbar-brand" to="/home">Home</Link>
                                <NavLink className="nav-link" to="/addtasks">Tasks</NavLink>
                                <NavLink className="nav-link" to="/profile">Profile</NavLink>
                                <NavLink className="nav-link" to="/logout">Logout</NavLink>
                                </React.Fragment>
                                )}
                                
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
    const mapStateToProps = (state) => ({
        users : state.users
      })

export default connect(mapStateToProps)(Navbar);