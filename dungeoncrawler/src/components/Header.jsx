import React from 'react';

export const Header = React.createClass({
    render: function() {
        return <div className = "header">
            <h1>Dungeon O!</h1>
            <p>By Allister Moon (check out the code <a href="https://github.com/AlyxMoon/FCC-Dungeon-Crawler">here</a>)</p>
            <hr />
        </div>;
    }
});