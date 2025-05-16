import { Task } from '~/types';
import defaultState from './mock.json'

let serverState = defaultState as Task[];

export const getTasks = async () => {
    return new Promise<Task[]>((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < 0.3) reject()
            else resolve(serverState);
        }, 1000);
    });
}

export const addTask = async (name: Task['name']) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < 0.3) reject()
            else {
                serverState.push({ id: window.crypto.randomUUID(), name, completed: false });
                resolve(true);
            }
        }, 500);
    });
}

export const deleteTask = async (id: Task['id']) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < 0.3) reject()
            else {
                serverState = serverState.filter((task) => task.id !== id)
                resolve(true);
            }
        }, 500);
    });
}

export const updateTask = async (task: Task) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < 0.3) reject()
            else {
                serverState = serverState.map((prevTask) => prevTask.id !== task.id ? prevTask : task);
                resolve(true);
            }
        }, 300);
    });
}