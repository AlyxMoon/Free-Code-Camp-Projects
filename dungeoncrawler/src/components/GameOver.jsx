import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';

export const GameOver = React.createClass({
    render: function() {
        let headerText = this.props.gameOver === "win" ? "You win!" : "You have died!";
        let subText = this.props.gameOver === "win" ? "Congratulations to you" : "That sucks";
        let src = this.props.gameOver === "win" ? "https://s-media-cache-ak0.pinimg.com/originals/1a/84/f3/1a84f3a2d0586c16a00540f056f3b13f.gif" : "https://media.giphy.com/media/qjqFjoqYgLwZO/giphy.gif";

        return this.props.gameOver ?
        <div className = "game-over">
            <h1>{headerText}</h1>
            <p>{subText}</p>
            <img src = {src} />
        </div> :
        <div className = "game-over"></div>
    }
});

function mapStateToProps(state) {
    return {
        gameOver: state.get('gameOver')
    };
}

export const GameOverContainer = connect(
    mapStateToProps
)(GameOver);