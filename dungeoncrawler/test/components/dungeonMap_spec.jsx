import React from 'react';
import ReactDOM from 'react-dom';
import {
    renderIntoDocument,
    scryRenderedDOMComponentsWithClass,
    scryRenderedDOMComponentsWithTag
} from 'react-addons-test-utils';
import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import {DungeonMap} from '../../src/components/DungeonMap';

describe('DungeonMap', () => {

    it('renders correct number of tiles', () => {
        const dungeonMap = fromJS([[0, 0], [1, 1]]);
        const component = renderIntoDocument(
            <DungeonMap dungeonMap = {dungeonMap} />
        );
        const tiles = scryRenderedDOMComponentsWithClass(component, 'tile');
        expect(tiles.length).to.equal(4);
    });

    it('creates the correct number of rows', () => {
        const dungeonMap = fromJS([[0, 0], [1, 1], [0, 1]]);
        const component = renderIntoDocument(
            <DungeonMap dungeonMap = {dungeonMap} />
        );
        const rows = scryRenderedDOMComponentsWithClass(component, 'row');
        expect(rows.length).to.equal(3);
    });

    it('creates tiles with correct type', () => {
        const dungeonMap = fromJS([[0, 0], [1, 1]]);
        const component = renderIntoDocument(
            <DungeonMap dungeonMap = {dungeonMap} />
        );
        const walls = scryRenderedDOMComponentsWithClass(component, 'wall');
        const floors = scryRenderedDOMComponentsWithClass(component, 'floor');
        expect(walls.length).to.equal(2);
        expect(floors.length).to.equal(2)
    });

    it('makes tile a wall if type not known', () => {
        const dungeonMap = fromJS([[3, 3]]);
        const component = renderIntoDocument(
            <DungeonMap dungeonMap = {dungeonMap} />
        );
        const walls = scryRenderedDOMComponentsWithClass(component, 'wall');
        expect(walls.length).to.equal(2);
    });

    it('draws the player sprite on the correct tile', () => {
        const dungeonMap = fromJS([[1, 1], [1, 1]]);
        const entities = fromJS({
            player: {
                location: [1, 0],
                sprite: 'test-player.png'
            }
        });
        const component = renderIntoDocument(
            <DungeonMap dungeonMap = {dungeonMap}
                        entities = {entities} />
        );
        const tile = scryRenderedDOMComponentsWithClass(component, 'tile')[2];
        const images = scryRenderedDOMComponentsWithTag(component, 'IMG')
        expect(images.length).to.equal(1);
        expect(tile.children[0].tagName).to.equal('IMG');
        expect(tile.children[0].className).to.equal('sprite');
        expect(tile.children[0].src).to.be.defined;
    });

    it('draws enemy sprites on the correct tiles', () => {

            const dungeonMap = fromJS([[1, 1], [1, 1]]);
            const entities = fromJS({
                enemies: [
                    {
                        location: [0, 0],
                        sprite: 'test-enemy.png'
                    },
                    {
                        location: [1, 0],
                        sprite: 'test-enemy.png'
                    }
                ]
            });
            const component = renderIntoDocument(
                <DungeonMap dungeonMap = {dungeonMap}
                            entities = {entities} />
            );
            const tiles = scryRenderedDOMComponentsWithClass(component, 'tile');
            const images = scryRenderedDOMComponentsWithTag(component, 'IMG')
            expect(images.length).to.equal(2);
            expect(tiles[0].children[0].tagName).to.equal('IMG');
            expect(tiles[0].children[0].className).to.equal('sprite');
            expect(tiles[0].children[0].src).to.be.defined;
            expect(tiles[2].children[0].tagName).to.equal('IMG');
            expect(tiles[2].children[0].className).to.equal('sprite');
            expect(tiles[2].children[0].src).to.be.defined;
    });

    it('draws item sprites on the correct tiles', () => {

            const dungeonMap = fromJS([[1, 1], [1, 1]]);
            const entities = fromJS({
                items: [
                    {
                        location: [0, 1],
                        sprite: 'test-item.png'
                    },
                    {
                        location: [1, 1],
                        sprite: 'test-item.png'
                    }
                ]
            });
            const component = renderIntoDocument(
                <DungeonMap dungeonMap = {dungeonMap}
                            entities = {entities} />
            );
            const tiles = scryRenderedDOMComponentsWithClass(component, 'tile');
            const images = scryRenderedDOMComponentsWithTag(component, 'IMG')
            expect(images.length).to.equal(2);
            expect(tiles[1].children[0].tagName).to.equal('IMG');
            expect(tiles[1].children[0].className).to.equal('sprite');
            expect(tiles[1].children[0].src).to.be.defined;
            expect(tiles[3].children[0].tagName).to.equal('IMG');
            expect(tiles[3].children[0].className).to.equal('sprite');
            expect(tiles[3].children[0].src).to.be.defined;
    });

});