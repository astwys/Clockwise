var React = require('react');
var DefaultLayout = require('./layout/master');

var IndexComponent = React.createClass({
    render:function() {
        return (
            <DefaultLayout name={this.props.name}>
            <h1>Clockwise</h1>
            <h3>500 Internal Server Error</h3>
            </DefaultLayout>
        )
    }
});

module.exports = IndexComponent;
