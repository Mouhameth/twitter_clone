import React from 'react'
interface ButttonProps{
    label: string;
    secondary?: boolean;
    fullWidth?: boolean;
    large?: boolean;
    onClick: () =>void;
    disabled?: boolean;
    outline?: boolean;
}

const Button: React.FC<ButttonProps> = ({label,secondary,fullWidth,large,onClick,disabled,outline}) => {
  return (
    <button 
          disabled={disabled}
          onClick={onClick}
          className={` disabled: cursor-not-allowed rounded-full 
          font-semibold opacity-80 transition border-2 
          ${fullWidth ? ' w-full': ' w-fit'} 
          ${secondary ? ' bg-gray-500': ' bg-sky-500'} 
          ${secondary? ' text-white': 'text-white'} 
          ${secondary? ' border-gray-500': ' border-sky-500'} 
          ${large? ' text-xl': 'text-md'} 
          ${large? ' px-5': 'px-4'}
          ${large? ' py-3': 'py-1'}
          ${outline? ' bg-transparent': ''}
          ${outline? ' border-white': ''}
          ${outline? ' text-white': ''}
          `
        }>{label}</button>
  )
}

export default Button