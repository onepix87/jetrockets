import React, { KeyboardEvent, useState } from 'react';
import { Trash, Edit } from '../icons';
import { Checkbox } from '../checkbox/checkbox';
import { Task as TaskType } from '~/types';

type CardProps = {
    task: TaskType;
    failed?: boolean;
    onComplete: () => void;
    onDelete: () => void;
    onEdit: (task: TaskType) => void;
}

export const Task: React.FC<CardProps> = ({ task, failed, onComplete, onDelete, onEdit }) => {
    const [edit, setEdit] = useState(false);
    const [currName, setCurrName] = useState(task.name);

    const toggleEdit = () => {
        setEdit((prevState) => !prevState);
    }

    const enterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') submitEdit();
    }

    const submitEdit = () => {
        setEdit(false);
        onEdit({ ...task, name: currName });
    }

    return <div className={`flex items-center gap-2 p-2.5 first:rounded-t-xl last:rounded-b-xl rounded-md transition-[border-radius,background-color] ${!failed ? 'bg-neutral-100' : 'bg-rose-200'}`}>
        <Checkbox type='checkbox' checked={task.completed} onChange={onComplete} />
        { !edit ?
            <span className={`grow truncate px-1.5 ${!task.completed ? '' : 'text-gray-500/80 line-through'}`}>{task.name}</span> :
            <input autoFocus className='grow w-full rounded-md px-1.5 border-none bg-gray-500/13 focus:bg-gray-500/13' value={currName} onChange={(e) => setCurrName(e.target.value)} onKeyDown={enterHandler} />
        }
        <div className='flex items-center gap-0.5 ml-2 md:ml-0'>
            <button onClick={toggleEdit} className='p-1 text-gray-500/60 cursor-pointer hover:text-gray-700/60 transition-colors'>
                <Edit size={20}/>
            </button>
            <button onClick={onDelete} className='p-1 text-red-500/60 cursor-pointer hover:text-red-700/60 transition-colors'>
                <Trash size={20}/>
            </button>
        </div>
    </div>
}