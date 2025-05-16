import React, { useCallback, useMemo, useState } from 'react';
import { useTaskMutations, useTasks } from '~/store/tasks';
import { TasksList } from '~/components/tasks-list/tasks-list';
import { TaskCreate } from '~/components/task-create/task-create';
import { TasksFilter } from '~/components/tasks-filter/tasks-filter';
import { TasksSkeleton } from '~/components/tasks-skeleton/tasks-skeleton';
import { Toaster } from '~/components/toaster/toaster';
import { Task } from '~/types';

export const Tasks: React.FC = () => {
    const { data, isLoading, isError } = useTasks();
    const [addTask, updateTask, deleteTask] = useTaskMutations();
    const [activeFilter, setActiveFilter] = useState('');

    const filteredData = useMemo(() => {
        let filtered = data;

        if (activeFilter === 'Completed') filtered = (data as Task[])?.filter(task => task.completed)
        if (activeFilter === 'Active') filtered = (data as Task[])?.filter(task => !task.completed)

        return filtered;
    }, [data, activeFilter]);

    const onFilterChange = useCallback((newVal: string) => {
        setActiveFilter(newVal);
    }, [setActiveFilter])

    const onSubmit = useCallback((taskName: Task['name']) => {
        // @ts-ignore-next-line
        addTask.mutate(taskName);
    }, [addTask]);

    const onDelete = useCallback((id: Task['id']) => {
        // @ts-ignore-next-line
        deleteTask.mutate(id);
    }, [deleteTask]);

    const onComplete = useCallback((task: Task) => {
        // @ts-ignore-next-line
        updateTask.mutate({ ...task, completed: !task.completed });
    }, [updateTask]);

    const onEdit =  useCallback((task: Task) => {
        // @ts-ignore-next-line
        updateTask.mutate(task);
    }, [updateTask]);

    return (
        <div className='flex flex-col gap-4 items-center pt-20 py-40 px-5 min-h-screen'>
            <h1 className='text-7xl font-bold font-mono text-indigo-300'>TODOer</h1>
            <TaskCreate onSubmit={onSubmit} />
            <TasksFilter onChange={onFilterChange} />
            {filteredData && !isLoading && !isError ?
                <TasksList tasks={filteredData} onDelete={onDelete} onComplete={onComplete} onEdit={onEdit} /> :
                <TasksSkeleton />
            }
            <Toaster />
        </div>
    );
}