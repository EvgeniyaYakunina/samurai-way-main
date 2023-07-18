type MessagesType={
    id: number
    message: string
}
type DialogType={
    id: number
    name: string
}
export type PostType={
    id: number
    message: string
    count: number
}
export type ProfilePageType={
    posts: Array<PostType>
    newPostText: string
}
export type DialogPageType={
    dialogs: Array<DialogType>
    messages: Array<MessagesType>
}
export type RootStateType = {
    profilePage: ProfilePageType
    dialogsPages: DialogPageType
}

export type StoreType={
    _state: RootStateType
    _rerenderEntireThree:()=>void
    // addPost: ()=> void
    // updateNewPostText:(newText: string)=> void
    dispatch: (action: ActionsTypes)=> void
    subscribe: (observer: ()=>void)=> void
    getState: ()=> RootStateType
}

type AddPostActionType ={
    type: 'ADD-POST'
    newPostText: string
}

type UpdateNewPostText ={
    type: 'UPDATE-NEW-POST-TEXT'
    newText: string
}

export type ActionsTypes =  AddPostActionType | UpdateNewPostText

export const store: StoreType ={
    _state: {
        profilePage: {
            posts: [
                {id: 0, message: "Hey, how are you", count: 15},
                {id: 1, message: "It is my first post", count: 20},
            ],
            newPostText: "it-Kamasutra.com"
        },
        dialogsPages: {
            dialogs: [
                {id: 1, name: "Dimych"},
                {id: 2, name: "Andrey"},
                {id: 3, name: "Sveta"},
                {id: 4, name: "Sasha"},
                {id: 5, name: "Victor"},
                {id: 6, name: "Valera"},
            ],
            messages: [
                {id: 1, message: "Hi"},
                {id: 2, message: "How is your it-kamasutra?"},
                {id: 3, message: "Yo"},
                {id: 4, message: "Yo"},
                {id: 5, message: "Yo"},
            ]
        },
    },
    _rerenderEntireThree(){
        console.log('State changed')
    },
    // addPost (){
    //     const newPost ={
    //         id:5,
    //         message: this._state.profilePage.newPostText,
    //         count: 0
    //     };
    //     this._state.profilePage.posts.push(newPost);
    //     this._state.profilePage.newPostText = '';
    //     this._rerenderEntireThree();
    // },
    // updateNewPostText  (newText: string){
    //     this._state.profilePage.newPostText = (newText);
    //     this._rerenderEntireThree();
    // },
    dispatch(action){
        if(action.type === 'ADD-POST'){
            const newPost ={
                id:5,
                message: this._state.profilePage.newPostText,
                // action.newPostText,
                count: 0
            };
            this._state.profilePage.posts.push(newPost);
            this._state.profilePage.newPostText = '';
            this._rerenderEntireThree();
        }else  if (action.type === 'UPDATE-NEW-POST-TEXT'){
            this._state.profilePage.newPostText = action.newText;
            this._rerenderEntireThree();
        }
    },

    subscribe (observer) {
       this._rerenderEntireThree = observer;
    },
    getState(){
        return this._state
    }
}

// window.store = store;
