import React from 'react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const Input = ({ location, placeholder, style, input, className = '' }: any) => {
  return (
    <div
      style={{ ...style, display: 'flex', alignItems: 'center' }}
      className={`border w-full rounded-full flex items-center ${className} border-gray-200 px-2 mx-2`}
    >
      <SearchOutlinedIcon sx={{ color: style.color }} className="text-gray-500 " />
      {input && (
        <input
          style={{
            padding: '8px',
            outline: '2px solid transparent',
            border: '0px solid transparent',
            outlineOffset: '2px',
            width: '100%',

            color: style?.textColor,
            backgroundColor: 'transparent',
          }}
          placeholder={placeholder}
          className={`outline-none placeholder:text-[${style?.textColor}] bg-transparent p-2 w-full rounded-full`}
        />
      )}
    </div>
  );
};

export default Input;
