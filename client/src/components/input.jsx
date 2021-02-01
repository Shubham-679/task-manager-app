import React from 'react';


const Input = ({value, onChange, name, type, error, label, placeholder}) => {
    console.log(error)
    return ( 
        <div className="form-group">
            <label htmlFor={name} className="form-label" >{label}</label>
            <input
              value={value}
              onChange={onChange}
              name={name}
              type={type}
              placeholder={placeholder}
              className="form-control"
            />
            {error && <div className="alert alert-danger">{error}</div>}           
          </div>
     );
}
 
export default Input
