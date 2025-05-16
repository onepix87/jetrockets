import React from 'react';

type TasksFilterProps = {
    onChange: (value: string) => void;
}

const tasksFilters = ['All', 'Active', 'Completed'];

export const TasksFilter: React.FC<TasksFilterProps> = ({ onChange }) => {
    return (
        <div className='flex justify-end w-full max-w-5xl py-2 mb-[-10px]'>
            <select className='md:w-48 w-full border-2 border-gray-500/20 cursor-pointer rounded-lg py-2 px-2' onChange={(e) => onChange(e.target.value)}>
                {tasksFilters.map(filter => <option value={filter} key={filter}>{filter}</option>)}
            </select>
        </div>
    )
}