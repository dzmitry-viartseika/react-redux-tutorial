import './styles.css';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger'
import { rootReducer } from "./redux/rootReducer";
import { increment, decrement, asyncIncrement, changeTheme } from "./redux/actions";

// просто передается rootReducer и не вызывается

const store = createStore(
    rootReducer,
    // 0,
    compose(
        applyMiddleware(thunk, logger),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

window.store = store;

const counter = document.getElementById('counter');
const addBtn = document.getElementById('add');
const subBtn = document.getElementById('sub');
const asyncBtn = document.getElementById('async');
const themeBtn = document.getElementById('theme');

subBtn.addEventListener('click', () => {
    console.log('subBtn');
    store.dispatch(decrement());
});

addBtn.addEventListener('click', () => {
    console.log('addBtn');
    store.dispatch(increment());
});

asyncBtn.addEventListener('click', async () => {
    console.log('asyncBtn');
    store.dispatch(asyncIncrement());
});

themeBtn.addEventListener('click', () => {
    console.log('themeBtn');
    const newTheme = document.body.classList.contains('light') ? 'dark' : 'light';
    store.dispatch(changeTheme(newTheme));
});

store.subscribe(() => {
    const state = store.getState();
    counter.textContent = state.counter;
    document.body.className = state.theme.value;

    [addBtn, subBtn, themeBtn, asyncBtn].forEach(btn => {
        btn.disabled = state.theme.disabled
    })
});

store.dispatch({type: 'INIT_APPLICATION'});
