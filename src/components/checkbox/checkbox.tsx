import React, { useId, HTMLProps } from 'react';
import { Check } from '../icons';

export const Checkbox: React.FC<HTMLProps<HTMLInputElement>> = (props) => {
    let id = useId();

    return (
        <div>
            <input id={id} className='sr-only peer' type='checkbox' {...props} />
            <label htmlFor={id} className={`border-2 border-gray-300/80 flex cursor-pointer justify-center items-center h-6 w-6 rounded-sm peer-focus:bg-red ${props.checked ? 'bg-gray-500/20' : ''}`}>
                {props.checked ? <Check size={20} /> : null}
            </label>
        </div>
    )
}