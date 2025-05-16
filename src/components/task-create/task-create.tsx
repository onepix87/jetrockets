import React, { useState, KeyboardEvent } from 'react';

type TaskCreateProps = {
    onSubmit: (name: string) => void
}

export const TaskCreate: React.FC<TaskCreateProps> = ({ onSubmit }) => {
    const [taskName, setTaskName] = useState<string>('');

    const submitHandler = () => {
        if (taskName !== '') {
            onSubmit(taskName);
            setTaskName('');
        }
    }

    const enterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') submitHandler();
    }

    return (
        <div className='flex items-center justify-center w-full max-w-5xl gap-4'>
            <input className='block rounded-lg border-none bg-gray-500/13 px-3 py-2 text-sm/6 w-full focus:bg-gray-500/20 transition-colors' value={taskName} onChange={(e) => setTaskName(e.target.value)} onKeyDown={enterHandler}/>
            <button className='shrink-0 py-2 px-3.5 bg-indigo-400 rounded-lg text-white cursor-pointer hover:bg-indigo-500/90 active:bg-indigo-500 transition-colors' onClick={submitHandler}>Add Task</button>
        </div>
    )
}