import {INITIAL_STATE, setData, movePlayer, handleCollision} from './core';
import {generateItems, generateEnemies} from './dungeonGenerator';

export default function reducer(state = INITIAL_STATE, action) {
    switch(action.type) {
    case 'SET_DATA':
        return setData(state, action.data);
    case 'GENERATE_ENTITIES':
        return generateEnemies(generateItems(state));
    case 'MOVE_PLAYER':
        return handleCollision(movePlayer(state, action.direction));
    }

    return state;
}