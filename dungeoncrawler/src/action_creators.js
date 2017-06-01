export function setData(data) {
    return {
        type: 'SET_DATA',
        data
    };
}

export function generateEntities() {
    return {
        type: 'GENERATE_ENTITIES'
    };
}

export function movePlayer(direction) {
    return {
        type: 'MOVE_PLAYER',
        direction
    }
}