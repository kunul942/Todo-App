export interface AuthState {
    status: string;
    user: User;
    errorMessage: undefined | string;
}

export interface Login {
    name: string;
    uid: string;
    role: string;
}

export interface Todo {
    id: number;
    desc: string;
    completed: boolean;
}

export interface TodoState {
    todos: Todo[];
}

export interface User {
    uid: string;
    name: string;
    role: string;
}

export interface ChatStructure {
    _id: number;
    text: string;
    user: User;
    status: boolean;
}

export interface ChatState {
    messages: ChatStructure[];
    errorMessage: undefined | string;
}

export interface Modal {
    isModalOpen: boolean;
}
