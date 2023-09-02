import React from "react";



const DropDown = ({heading,placeholder,data,error,onChange,name,value,title,id,disabled = false,...props}) => {



    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
       
        if (onChange)
            onChange(event);
    };

    return (



        <div>
            {heading && <label className="form-control-label  h6">{heading}</label>}
            <select value={value} className="form-control form-select" {...props} onChange={handleSelectChange} name={name} disabled={disabled}>
                {/* <option >{placeholder}</option> */}
                {data && data.length > 0 ? data.map((item, index) => (
                    <option className="dropdown-item" key={index} value={item.id || item.type}>
                        {item.name ? item.name : item.group_name}  {item.title}
                    </option>
                )) : <option disabled>{'--- No Record Found ---'}</option>}
            </select>
            {error && <code className="text-danger">{error}</code>}
        </div>
    )
};

export { DropDown };
