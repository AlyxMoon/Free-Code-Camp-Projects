import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';

export const DungeonMap = React.createClass({
    mixins: [PureRenderMixin],

    getTileClass: function(tile) {
        return 'tile ' + (tile === 1 ? 'floor' : 'wall');
    },

    playerOnTile: function(i, j) {
        if(!this.props.entities || !this.props.entities.get('player')) return false;

        const [x,y] = this.props.entities.getIn(['player','location']);
        return x === i && y === j;
    },

    enemyOnTile: function(i, j) {
        if(!this.props.entities || !this.props.entities.get('enemies')) return false;

        const enemies = this.props.entities.get('enemies');
        return enemies.some(enemy => {
            const [x,y] = enemy.get('location');
            return x === i && y === j;
        });
    },

    itemOnTile: function(i, j) {
        if(!this.props.entities || !this.props.entities.get('items')) return false;

        const items = this.props.entities.get('items');
        return items.some(item => {
            const [x,y] = item.get('location');
            return x === i && y === j;
        });
    },

    getPlayerSprite: function() {
        return this.props.entities.getIn(['player', 'sprite']);
    },

    getEnemySpriteAt: function(i, j) {
        const enemies = this.props.entities.get('enemies');
        return enemies.find(enemy => {
            const [x,y] = enemy.get('location');
            return x === i && y === j;
        }).get('sprite');
    },

    getItemSpriteAt: function(i, j) {
        const items = this.props.entities.get('items');
        return items.find(item => {
            const [x,y] = item.get('location');
            return x === i && y === j;
        }).get('sprite');
    },

    isSeenByPlayer: function(i, j) {
        if(!this.props.entities || !this.props.entities.get('player') || !this.props.entities.getIn(['player', 'sight'])) return true;

        let range = this.props.entities.getIn(['player', 'sight']);
        let location = this.props.entities.getIn(['player', 'location']).toArray();

        let [dx, dy] = [Math.abs(location[0] - i), Math.abs(location[1] - j)];
        return dx <= range && dy <= range;
    },

    render: function() {
        return !this.props.gameOver ?
        <div className = "map">
            {this.props.dungeonMap.map((row, i) =>
                <div key = {i} className = "row">
                    {row.map((tile, j) => this.isSeenByPlayer(i, j) &&
                            <div key = {j} className = {this.getTileClass(tile)}>
                                {this.playerOnTile(i, j) &&
                                <img src={require(`../data/img/${this.getPlayerSprite()}`)} className = "sprite" /> }
                                {this.enemyOnTile(i, j) &&
                                <img src={require(`../data/img/${this.getEnemySpriteAt(i, j)}`)} className = "sprite" /> }
                                {this.itemOnTile(i, j) &&
                                <img src={require(`../data/img/${this.getItemSpriteAt(i, j)}`)} className = "sprite" /> }
                            </div>
                    )}
                </div>
            )}
        </div> :
        <div className = "map"></div>;
    }
});

function mapStateToProps(state) {
    return {
        dungeonMap: state.get('dungeonMap'),
        entities: state.get('entities'),
        gameOver: state.get('gameOver')
    };
}

export const DungeonMapContainer = connect(
    mapStateToProps
)(DungeonMap);