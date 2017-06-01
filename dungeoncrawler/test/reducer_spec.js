import {Map, List, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {

    it('has an initial state', () => {
        const action = {type: 'SET_DATA', data: {dungeonMap: [0, 0]}};
        const nextState = reducer(undefined, action);
        expect(nextState).to.equal(fromJS({
            dungeonMap: [0, 0]
        }));
    });

    it('can be used with reduce', () => {
        const actions = [
            {type: 'SET_DATA', data: {dungeonMap: [0, 0]}}
        ];
        const finalState = actions.reduce(reducer, Map());
        expect(finalState).to.equal(fromJS({
            dungeonMap: [0, 0]
        }));
    });

    it('handles SET_DATA', () => {
        const initialState = Map();
        const action = {type: 'SET_DATA', data: {dungeonMap: [0, 0]}};
        const nextState = reducer(initialState, action);
        expect(nextState).to.equal(fromJS({
            dungeonMap: [0, 0]
        }));
    });

    it('handles MOVE_PLAYER', () => {
        const state = fromJS({
            dungeonMap: [[1, 1, 1], [1, 1, 1], [1, 1, 1]],
            entities: {
                player: { location: [1, 1] },
                enemies: [
                    { location: [0, 0] }
                ]
            }
        });
        const action = {type: 'MOVE_PLAYER', direction: 'DOWN'};
        const nextState = reducer(state, action);
        expect(nextState).to.equal(fromJS({
            dungeonMap: [[1, 1, 1], [1, 1, 1], [1, 1, 1]],
            entities: {
                player: { location: [2, 1] },
                enemies: [
                    { location: [0, 0] }
                ]
            }
        }));
    })

});