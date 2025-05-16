import { create } from 'zustand'

type Toast = {
    text: string;
    timestamp: number;
}

type ToastsStore = {
    toasts: Toast[];
    addToast: (text: string) => void;
    deleteToast: (index: number) => void;
}

export const useToastsStore = create<ToastsStore>((set) => ({
    toasts: [],
    addToast: (text: string) => {
        let timestamp = Date.now();
        set((state) => {
            let prevToasts = state.toasts;
            if (prevToasts.length >= 3) prevToasts = prevToasts.slice(-2);

            return { toasts: [...prevToasts, { text, timestamp }] };
        });
        setTimeout(() => {
            set((state) => ({ toasts: state.toasts.filter((toast) => toast.timestamp !== timestamp) }));
        }, 7000);
    },
    deleteToast: (index: number) => {
        set((state) => ({ toasts: state.toasts.filter((_, i) => i !== index) }));
    }
}))