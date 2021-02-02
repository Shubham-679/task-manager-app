import React from 'react';


const Input = ({value, onChange, name, type, error, label, placeholder}) => {
    return ( 
        <div className="form-group">
            <label htmlFor={name} className="form-label float-left" >{label}</label>
            <input
              value={value}
              onChange={onChange}
              name={name}
              type={type}
              placeholder={placeholder}
              className="form-control"
            />
            {error && <small className="text-danger lead">{error}</small>}           
          </div>
     );
}
 
export default Input
