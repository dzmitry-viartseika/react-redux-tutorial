export function createStore(rootReducer, initialState) {

    //rootReducer функция которая первым принимает state(состояние) и action(действие)

    let state = rootReducer(initialState, {
        type: 'INCREMENT'
    });
    const subscribers = [];

    return {
        dispatch(action) {
            state = rootReducer(state, action);
            subscribers.forEach(sub => sub());
        },
        subscribe(callback) {
            subscribers.push(callback)
        },
        getState() {
            return state;
        }
    }
}