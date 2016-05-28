var React = require('react');
var DefaultLayout = require('./layout/master');
var styles = require('../public/css/style.css');

var IndexComponent = React.createClass({
    render:function() {
        return (
            <DefaultLayout name={this.props.name}>
            <h1 classname=>Clockwise</h1>
            </DefaultLayout>
        )
    }
});

module.exports = IndexComponent;
