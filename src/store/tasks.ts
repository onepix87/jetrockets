import { useQuery, useQueryClient, useMutation, DefaultError } from '@tanstack/react-query';
import { create } from 'zustand'
import { getTasks, addTask, deleteTask, updateTask } from '~/api/tasks';
import { useToastsStore } from './toasts';
import { Task } from '~/types';

export const useTasks = () => {
    const addToast = useToastsStore((state) => state.addToast);
    const clearTasks = useFailedTasks((state) => state.clearTasks);
    return useQuery({
        queryKey: ['tasks'],
        queryFn: async () => getTasks().then(res => {
            clearTasks();
            return res;
        }),
        throwOnError: () => {
            addToast('Failed to fetch tasks');
            return false;
        }
    });
}

export const useFailedTasks = create<{ ids: Task['id'][]; addFailedTask: (id: Task['id']) => void; clearTasks: () => void }>((set) => ({
    ids: [],
    addFailedTask: (id) => {
        set((state) => ({ ids: [...state.ids, id] }));
    },
    clearTasks: () => {
        set({ ids: [] });
    },
}))

export const useTaskMutations = () => {
    const queryClient = useQueryClient();
    const addToast = useToastsStore((state) => state.addToast);
    const addFailedTask = useFailedTasks((state) => state.addFailedTask);

    const addTaskMutation = useMutation<unknown, DefaultError, Task['name'], { newTask?: Task }>({
        mutationFn: addTask,
        onMutate: async (name) => {
            await queryClient.cancelQueries({ queryKey: ['tasks'] });
            let newTask: Task | undefined;

            queryClient.setQueryData(['tasks'], (old: Task[]) => {
                newTask = { id: window.crypto.randomUUID(), name, completed: false } as Task;
                return [...old, newTask];
            });
            return { newTask };
        },
        onError: (_e, _v, context) => {
            addToast('Failed to add new task');
            if (context?.newTask) addFailedTask(context.newTask.id);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        }
    });

    const updateTaskMutation = useMutation<unknown, DefaultError, Task, { updTask?: Task }>({
        mutationFn: updateTask,
        onMutate: async (updTask) => {
            await queryClient.cancelQueries({ queryKey: ['tasks'] });

            queryClient.setQueryData(['tasks'], (old: Task[]) => [...old.map(task => task.id !== updTask.id ? task : updTask)]);
            return { updTask };
        },
        onError: (_e, _v, context) => {
            addToast('Failed to update task');
            if (context?.updTask) addFailedTask(context.updTask.id);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        }
    });

    const deleteTaskMutation = useMutation<unknown, DefaultError, Task['id'], { deletedTask?: Task }>({
        mutationFn: deleteTask,
        onMutate: async (id) => {
            await queryClient.cancelQueries({ queryKey: ['tasks'] });
            const deletedTask = (queryClient.getQueryData(['tasks']) as Task[]).find((task: Task) => task.id === id) as Task;

            queryClient.setQueryData(['tasks'], (old: Task[]) => [...old.filter(task => task.id !== id)]);
            return { deletedTask };
        },
        onError: (_e, _v, context) => {
            addToast('Failed to delete task');
            if (context?.deletedTask) addFailedTask(context.deletedTask.id);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        }
    });

    return [
        addTaskMutation,
        updateTaskMutation,
        deleteTaskMutation,
    ];
}