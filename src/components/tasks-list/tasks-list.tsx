import React from 'react';
import { Task } from '../task/task';
import { Task as TaskType } from '../../types';
import { useFailedTasks } from '~/store/tasks';

type ListProps = {
    tasks: TaskType[];
    onDelete: (id: TaskType['id']) => void;
    onComplete: (task: TaskType) => void;
    onEdit: (task: TaskType) => void;
}

export const TasksList: React.FC<ListProps> = ({ tasks, onDelete, onComplete, onEdit }) => {
    const failedTasksIds = useFailedTasks(state => state.ids);

    return <div className='flex flex-col w-full max-w-5xl px-5 py-7 gap-2 bg-slate-300 rounded-lg min-h-64 transition-[max-height] duration-150 overflow-hidden' style={{maxHeight: `${48 + 56 * (tasks?.length ?? 0)}px`}}>
        {
            tasks?.map((task) =>
                <Task
                    key={`${task.id}-${task.name}`}
                    task={task}
                    failed={failedTasksIds.some(id => id === task.id)}
                    onComplete={() => onComplete(task)}
                    onDelete={() => onDelete(task.id)}
                    onEdit={onEdit}
                />
            )
        }
    </div>
}