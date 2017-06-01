import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import makeStore from './store';
import {setData, movePlayer, generateEntities} from './action_creators';

// Include styling
require('./style.scss');

// Include Components
import App from './components/App';
import {DungeonMapContainer} from './components/DungeonMap';
import {StatsContainer} from './components/Stats';
import {GameOverContainer} from './components/GameOver';
import {Header} from './components/Header';

const store = makeStore();
store.dispatch(setData({
    dungeonMap: require('./data/dungeonMap.json'),
    entities: require('./data/entities.json')
}));
store.dispatch(generateEntities());

ReactDOM.render(
    <Provider store = {store}>
        <App>
            <Header />
            <StatsContainer />
            <DungeonMapContainer />
            <GameOverContainer />
        </App>
    </Provider>,
    document.getElementById('app')
);

// Input Handling
const MOVE_UP       = 87 // W
const MOVE_DOWN     = 83 // S
const MOVE_LEFT     = 65 // A
const MOVE_RIGHT    = 68 // D

window.addEventListener('keydown', event => {
    switch(event.keyCode) {
    case MOVE_UP: // UP
        store.dispatch(movePlayer('UP'));
        break;
    case MOVE_DOWN: // DOWN
        store.dispatch(movePlayer('DOWN'));
        break;
    case MOVE_LEFT: // LEFT
        store.dispatch(movePlayer('LEFT'));
        break;
    case MOVE_RIGHT: // RIGHT
        store.dispatch(movePlayer('RIGHT'));
        break;
    }
});