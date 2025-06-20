export type DialogsType = {
    id: string
    name: string
}

export type MessageType = {
    id: string
    title: string
}

export type DialogsPageType = { // конкретно этот тип нужен для store-custom. тут не нужен из-за альтернативной типизации
    dialogs: DialogsType[]
    messages: MessageType[]
    // value: string
}

const initialState = {
    dialogs: [
        {id: crypto.randomUUID(), name: 'Ivan'},
        {id: crypto.randomUUID(), name: 'Anna'},
        {id: crypto.randomUUID(), name: 'Melissa'},
        {id: crypto.randomUUID(), name: 'Kristina'},
        {id: crypto.randomUUID(), name: 'Vladimir'},
        {id: crypto.randomUUID(), name: 'Alexandra'},
    ] as DialogsType[], // альтернативный вариант типизации, поэтому в этом файле не нужен тип DialogsPageType
    messages: [
        {id: crypto.randomUUID(), title: 'Hi!'},
        {id: crypto.randomUUID(), title: 'My name is Ivan!'},
        {id: crypto.randomUUID(), title: 'And you?'},
        {id: crypto.randomUUID(), title: 'I am Fine'},
        {id: crypto.randomUUID(), title: 'It s cool!'},
    ] as MessageType[],
    // value: '' as string // мб излишне
};

type InitialStateType = typeof initialState

export const dialogsReducer = (state: InitialStateType = initialState, action: ActionsDialogsTypes): InitialStateType => {
    switch (action.type) {
        case 'DIALOGS/ADD-MESSAGE':
            const newMessage = {
                id: crypto.randomUUID(),
                title: action.title
            };
            return {...state, messages: [...state.messages, newMessage]};
        // case 'CHANGE-MESSAGE':
        //     return {...state, value: action.value};
        default:
            return state;
    }
};

export type ActionsDialogsTypes =
    | ReturnType<typeof addMessage>
    // | ReturnType<typeof changeMessage>

export const addMessage = (title: string) => ({
    type: 'DIALOGS/ADD-MESSAGE', title
}) as const;
// export const changeMessage = (value: string) => ({type: 'CHANGE-MESSAGE', value}) as const;
