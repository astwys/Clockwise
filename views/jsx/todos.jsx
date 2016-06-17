var React = require('react');
var DefaultLayout = require('./layout/master');

var TodosComponent = React.createClass({
    render:function() {
        return (
            <DefaultLayout name={this.props.name}>
                <h1>Todos</h1>
            </DefaultLayout>
        )
    }
});

module.exports = TodosComponent;
