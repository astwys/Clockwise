var React = require('react');

var MasterNavbar = new React.createClass({
    render:function() {
        return (
            <nav>
                <ul>
                    <li><a href="/time">Time</a></li>
                    <li><a href="/projects">Projects</a></li>
                    <li><a href="/newproject">New Project</a></li>
                    <li><a href="/todos">Todos</a></li>
                    <li><a href="/account">Account</a></li>
                    <li><a href="/logout">Logout</a></li>
                </ul>
            </nav>
        )
    }
});

module.exports = MasterNavbar;
