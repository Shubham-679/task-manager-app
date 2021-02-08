import React from 'react';


const Input = ({value, onChange, name, type, error, label, placeholder, maxlength}) => {
  
  return ( <div>
        <div className="form-group">
            <label htmlFor={name} className="form-label float-left" >{label}</label>
            <input
              value={value}
              onChange={onChange}
              name={name}
              type={type}
              placeholder={placeholder}
              className="form-control form-control-lg"
              maxLength={maxlength}
              
              style={{width:"150"}}
            />  
          </div>
            <div>
            {error && <small className="text-danger">{error}</small>} 
            </div>        
          </div>
     );
}
 
export default Input
