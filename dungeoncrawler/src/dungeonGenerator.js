import {fromJS} from 'immutable';

export function generateItems(state, count = 4) {
    let rowRange = [5, 16];
    let colRange = [1, 15];
    let attacksPlaced = 0;
    let healthPlaced = 0;

    if(state.getIn(['entities', 'items']).size < count) {
        let row = Math.floor(Math.random() * (rowRange[1] - rowRange[0] + 1)) + rowRange[0];
        let col = Math.floor(Math.random() * (colRange[1] - colRange[0] + 1)) + colRange[0];
        let stat = Math.floor(Math.random() * 2) ? 'attack' : 'health';
        let strength = stat === 'attack' ? Math.floor(Math.random() * 3) + 1 : Math.floor(Math.random() * 6) + 5;

        if(state.get('dungeonMap').get(row).get(col) === 1 && !squareOccupied(state, row, col)) {
            return generateItems(state.updateIn(
                ['entities', 'items'],
                items => items.push(fromJS({
                    location: [row, col],
                    sprite: `item-${stat}.png`,
                    effect: [stat, strength]
                }))
            ), count);
        }
        return generateItems(state);
    }
    return state;

}

export function generateEnemies(state, count = 6) {
    let rowRange = [5, 16];
    let colRange = [1, 15];

    let healthOnLevel = 3;
    let attackOnLevel = 1;

    if(state.getIn(['entities', 'enemies']).size < count) {
        let row = Math.floor(Math.random() * (rowRange[1] - rowRange[0] + 1)) + rowRange[0];
        let col = Math.floor(Math.random() * (colRange[1] - colRange[0] + 1)) + colRange[0];
        let level = Math.floor(Math.random() * 3) + 1;

        if(state.get('dungeonMap').get(row).get(col) === 1 && !squareOccupied(state, row, col)) {
            return generateEnemies(state.updateIn(
                ['entities', 'enemies'],
                items => items.push(fromJS({
                    location: [row, col],
                    sprite: 'enemy.png',
                    health: 3 + healthOnLevel * level,
                    attack: 1 + attackOnLevel * level,
                    experience: 2 * level
                }))
            ), count);
        }
        return generateEnemies(state);
    }
    return state;
}

function squareOccupied(state, i, j) {
    if(state.hasIn(['entities', 'enemies'])) {
        const enemies = state.getIn(['entities', 'enemies']);
        if(enemies.some(enemy => {
            const [x,y] = enemy.get('location');
            return x === i && y === j;
        })) return true;
    }
    if(state.hasIn(['entities', 'items'])) {
        const items = state.getIn(['entities', 'items']);
        if(items.some(item => {
            const [x,y] = item.get('location');
            return x === i && y === j;
        })) return true;
    }

    return false;
}