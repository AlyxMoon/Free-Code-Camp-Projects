import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';

export const Stats = React.createClass({
    mixins: [PureRenderMixin],

    render: function() {
        return !this.props.gameOver ?
        <div className = "stats">
            <p>
                Level: {this.props.player.get('level')} |
                XP: {this.props.player.get('experience')} / 10 |
                Health: {this.props.player.get('health')} |
                Attack: {this.props.player.get('attack')}
            </p>
        </div> :
        <div className = "stats"></div>;
    }
});

function mapStateToProps(state) {
    return {
        player: state.getIn(['entities', 'player']),
        gameOver: state.get('gameOver')
    };
}

export const StatsContainer = connect(
    mapStateToProps
)(Stats);