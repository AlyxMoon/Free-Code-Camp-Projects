import {List, Map, fromJS} from 'immutable';

export const INITIAL_STATE = Map();

export function setData(state, data) {
    return state.merge(data);
}

export function movePlayer(state, direction) {
    let [dx, dy] = [0, 0];
    if(direction === 'UP')          [dx, dy] = [-1, 0];
    else if(direction === 'DOWN')   [dx, dy] = [1, 0];
    else if(direction === 'LEFT')   [dx, dy] = [0, -1];
    else if(direction === 'RIGHT')  [dx, dy] = [0, 1];

    let [x, y] = state.getIn(['entities', 'player', 'location']).toList();
    [x, y] = [x + dx, y + dy];
    let newTile = x < 0 || y < 0 ? 0 : state.get('dungeonMap').get(x, List()).get(y, 0)

    const enemyCollision = state.getIn(['entities', 'enemies'], Map()).findKey(enemy => {
        return enemy.get('location').equals(fromJS([x, y]));
    });

    const itemCollision = state.getIn(['entities', 'items'], Map()).findKey(item => {
        return item.get('location').equals(fromJS([x, y]));
    });

    if(newTile !== 1) {
        return state;
    }
    else if(enemyCollision !== undefined) {
        return state.set('collision', List.of('enemies', enemyCollision));
    }
    else if(itemCollision !== undefined) {
        return state.set('collision', List.of('items', itemCollision));
    }
    else {
        return state.updateIn(
            ['entities', 'player', 'location'],
            location => List.of(location.get(0) + dx, location.get(1) + dy)
        );
    }
}

export function handleCollision(state) {
    const [type, id] = state.get('collision', List.of(undefined, undefined)).toList();
    if(!type) return state;

    if(type === 'enemies') {
        let newPlayerHealth = state.getIn(['entities', 'player', 'health']) - randomizeAttack(state.getIn(['entities', 'enemies', id, 'attack']), 1);
        let newEnemyHealth = state.getIn(['entities', 'enemies', id, 'health']) - randomizeAttack(state.getIn(['entities', 'player', 'attack']), 1);

        if(newPlayerHealth <= 0) {
            return gameOver(state);
        }
        else if(newEnemyHealth <= 0) {
            return killEnemy(state.setIn(
                ['entities', 'player', 'health'],
                newPlayerHealth
            ).remove('collision'), id);
        }
        else {
            return state.setIn(
                ['entities', 'player', 'health'],
                newPlayerHealth
            ).setIn(
                ['entities', 'enemies', id, 'health'],
                newEnemyHealth
            ).remove('collision');
        }
    }
    else if(type === 'items') {
        let [stat, change] = state.getIn(['entities', 'items', id, 'effect']);
        return state.updateIn(
            ['entities', 'player', stat],
            newStat => newStat + change
        ).updateIn(
            ['entities', 'items'],
            items => items.delete(id)
        ).remove('collision');
    }

    return state;
}

function killEnemy(state, id) {
    if(state.getIn(['entities', 'enemies', id, 'boss'])) return gameOver(state, true);

    const nextState = state.updateIn(
        ['entities', 'player', 'experience'],
        experience => experience + state.getIn(['entities', 'enemies', id, 'experience'])
    ).updateIn(
        ['entities', 'enemies'],
        enemies => enemies.delete(id)
    );

    let experienceToLevel = state.getIn(['entities', 'player', 'experienceToLevel']);
    if(nextState.getIn(['entities', 'player', 'experience']) >= experienceToLevel) {
        return levelUp(nextState);
    }

    return nextState;
}

function levelUp(state) {
    return state.updateIn(
        ['entities', 'player', 'experience'],
        experience => experience - state.getIn(['entities', 'player', 'experienceToLevel'])
    ).updateIn(
        ['entities', 'player', 'level'],
        level => level + 1
    ).updateIn(
        ['entities', 'player', 'health'],
        health => health + state.getIn(['entities', 'player', 'healthOnLevel'])
    ).updateIn(
        ['entities', 'player', 'attack'],
        attack => attack + state.getIn(['entities', 'player', 'attackOnLevel'])
    );
}

function gameOver(state, win = false) {
    return state.remove('dungeonMap').remove('entities').set('gameOver', win ? "win" : "lose");
}

function randomizeAttack(attack, variation) {
    let min = attack - variation
    let max = attack + variation
    return Math.floor(Math.random() * (max - min + 1)) + min;
}