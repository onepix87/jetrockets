import React from 'react';
import { useToastsStore } from '~/store/toasts';
import { Error, Close } from '../icons';

export const Toaster: React.FC = () => {
    const toasts = useToastsStore((state) => state.toasts);
    const deleteToast = useToastsStore((state) => state.deleteToast);

    const onDelete = (index: number) => {
        deleteToast(index);
    }

    return (
        <div className='fixed bottom-0 md:right-0 flex flex-col gap-1 p-2'>
            {toasts.map(
                (toast, index) =>
                    <div key={`${toast.timestamp}`} className='flex items-center justify-start gap-1 w-64 h-16 relative py-1.5 px-3 shadow-md bg-neutral-100 rounded-md text-neutral-600 before:block before:h-1 before:bg-red-500 before:w-full before:absolute before:bottom-0 before:left-0 overflow-hidden transition animate-appear'>
                        <button className='absolute top-0 right-0 p-2 cursor-pointer' onClick={() => onDelete(index)}>
                            <Close size={16}/>
                        </button>
                        <Error size={20}/>
                        {toast.text}
                    </div>
            )}
        </div>
    )
}