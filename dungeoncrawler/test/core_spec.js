import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import {setData, movePlayer, handleCollision} from '../src/core';

describe('application logic', () => {

    describe('setData', () => {

        it('adds the data to the state', () => {
            const state = Map();
            const data = fromJS({
                dungeonMap: [[0, 0, 0, 0]]
            });
            const nextState = setData(state, data);
            expect(nextState).to.equal(fromJS({
                dungeonMap: [[0, 0, 0, 0]]
            }));
        });

        it('converts to immutable', () => {
            const state = Map();
            const data = {
                dungeonMap: [0, 0, 0, 0]
            };
            const nextState = setData(state, data);
            expect(nextState).to.equal(fromJS({
                dungeonMap: [0, 0, 0, 0]
            }));
        });

    });

    describe('movePlayer', () => {

        it('changes location of player based on direction', () => {
            const state = fromJS({
                dungeonMap: [[1, 1, 1], [1, 1, 1], [1, 1, 1]],
                entities: {
                    player: { location: [1, 1] },
                    enemies: [
                        { location: [0, 0] }
                    ]
                }
            });
            const moveUp = movePlayer(state, 'UP');
            const moveDown = movePlayer(state, 'DOWN');
            const moveLeft = movePlayer(state, 'LEFT');
            const moveRight = movePlayer(state, 'RIGHT');

            expect(moveUp).to.equal(fromJS({
                dungeonMap: [[1, 1, 1], [1, 1, 1], [1, 1, 1]],
                entities: {
                    player: { location: [0, 1] },
                    enemies: [
                        { location: [0, 0] }
                    ]
                }
            }));
            expect(moveDown).to.equal(fromJS({
                dungeonMap: [[1, 1, 1], [1, 1, 1], [1, 1, 1]],
                entities: {
                    player: { location: [2, 1] },
                    enemies: [
                        { location: [0, 0] }
                    ]
                }
            }));
            expect(moveLeft).to.equal(fromJS({
                dungeonMap: [[1, 1, 1], [1, 1, 1], [1, 1, 1]],
                entities: {
                    player: { location: [1, 0] },
                    enemies: [
                        { location: [0, 0] }
                    ]
                }
            }));
            expect(moveRight).to.equal(fromJS({
                dungeonMap: [[1, 1, 1], [1, 1, 1], [1, 1, 1]],
                entities: {
                    player: { location: [1, 2] },
                    enemies: [
                        { location: [0, 0] }
                    ]
                }
            }));
        });

        it('will not move player to impassable tile', () => {
            const state = fromJS({
                dungeonMap: [[1, 1], [0, 0]],
                entities: {
                    player: { location: [0, 0] },
                    enemies: [
                        { location: [0, 1] }
                    ]
                }
            });
            const nextState = movePlayer(state, 'DOWN');
            expect(nextState).to.equal(fromJS({
                dungeonMap: [[1, 1], [0, 0]],
                entities: {
                    player: { location: [0, 0] },
                    enemies: [
                        { location: [0, 1] }
                    ]
                }
            }));
        });

        it('will not move player out of map', () => {
            const state = fromJS({
                dungeonMap: [[1]],
                entities: {
                    player: { location: [0, 0] },
                    enemies: [
                        { location: [-1, -1] }
                    ]
                }
            });
            const moveUp = movePlayer(state, 'UP');
            const moveDown = movePlayer(state, 'DOWN');
            const moveLeft = movePlayer(state, 'LEFT');
            const moveRight = movePlayer(state, 'RIGHT');

            expect(moveUp.getIn(['entities', 'player', 'location'])).to.equal(List.of(0, 0));
            expect(moveDown.getIn(['entities', 'player', 'location'])).to.equal(List.of(0, 0));
            expect(moveLeft.getIn(['entities', 'player', 'location'])).to.equal(List.of(0, 0));
            expect(moveRight.getIn(['entities', 'player', 'location'])).to.equal(List.of(0, 0));
        });

        it('will set a collision in the state if collides with an enemy or item', () => {
            const state = fromJS({
                dungeonMap: [[1, 1], [1, 1]],
                entities: {
                    player: { location: [0, 0] },
                    enemies: [ { location: [0, 1] } ],
                    items: [ { location: [1, 0] } ]
                }
            });
            const moveDown = movePlayer(state, 'DOWN');
            const moveRight = movePlayer(state, 'RIGHT');

            expect(moveDown.getIn(['entities', 'player', 'location'])).to.equal(List.of(0, 0));
            expect(moveDown.get('collision')).to.equal(List.of('items', 0));

            expect(moveRight.getIn(['entities', 'player', 'location'])).to.equal(List.of(0, 0));
            expect(moveRight.get('collision')).to.equal(List.of('enemies', 0));
        });

    });

    describe('handleCollision', () => {

        it('returns state if there is no collision', () => {
            const state = fromJS({
                property: 'value'
            });
            const nextState = handleCollision(state);
            expect(nextState).to.equal(fromJS({
                property: 'value'
            }));
        });

        it('removes collision property', () => {
            const state = fromJS({
                entities: {
                    player: {
                        location: [0, 0],
                        health: 10,
                        attack: 2
                    },
                    enemies: [
                        {
                            location: [0, 1],
                            health: 10,
                            attack: 1
                        }
                    ]
                },
                collision: ['enemies', 0]
            });
            const nextState = handleCollision(state);
            expect(nextState.has('collision')).to.be.false;
        })

        it('reduces health of player and enemy on collision', () => {
            const state = fromJS({
                entities: {
                    player: {
                        location: [0, 0],
                        health: 10,
                        attack: 2
                    },
                    enemies: [
                        {
                            location: [0, 1],
                            health: 10,
                            attack: 1
                        }
                    ]
                },
                collision: ['enemies', 0]
            });
            const nextState = handleCollision(state);
            expect(nextState.getIn(['entities', 'player', 'health'])).to.be.at.most(10);
            expect(nextState.getIn(['entities', 'enemies', 0, 'health'])).to.be.at.most(10);
        });

        it('kills enemy and adds exp to player if their health drops to 0', () => {
            const state = fromJS({
                entities: {
                    player: {
                        location: [0, 0],
                        health: 10,
                        level: 1,
                        experienceToLevel: 10,
                        attackOnLevel: 2,
                        healthOnLevel: 10,
                        experience: 0,
                        attack: 2
                    },
                    enemies: [
                        {
                            location: [0, 1],
                            health: 1,
                            experience: 2,
                            attack: 1
                        }
                    ]
                },
                collision: ['enemies', 0]
            });
            const nextState = handleCollision(state);

            expect(nextState.getIn(['entities', 'player', 'experience'])).to.equal(2);
        });

        it('levels up player if they pass experienceToLevel threshold', () => {
            const state = fromJS({
                entities: {
                    player: {
                        location: [0, 0],
                        health: 10,
                        level: 1,
                        experienceToLevel: 10,
                        attackOnLevel: 2,
                        healthOnLevel: 10,
                        experience: 9,
                        attack: 2
                    },
                    enemies: [
                        {
                            location: [0, 1],
                            health: 1,
                            experience: 2,
                            attack: 1
                        }
                    ]
                },
                collision: ['enemies', 0]
            });
            const nextState = handleCollision(state);

            expect(nextState.getIn(['entities', 'player', 'level'])).to.equal(2);
            expect(nextState.getIn(['entities', 'player', 'experience'])).to.equal(1);
            expect(nextState.getIn(['entities', 'player', 'attack'])).to.equal(4);
            expect(nextState.getIn(['entities', 'player', 'health'])).to.be.within(18, 20);
        });

    });

});