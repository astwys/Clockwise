var React = require('react');
var DefaultLayout = require('./layout/master');

var AccountComponent = React.createClass({
    render:function() {
        return (
            <DefaultLayout name={this.props.name}>
                <p>{this.props.error}</p>
                <p>{this.props.user.username}</p>
                <p>{this.props.user.email}</p>
            </DefaultLayout>
        )
    }
});

module.exports = AccountComponent;
