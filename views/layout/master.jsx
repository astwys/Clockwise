var React = require('react');
var Navbar = require('./navbar');

var s = require('./masterstyle');

var MasterLayout = React.createClass({
    render:function() {
        return (
            <html>
                <head>
                    <title>{this.props.name}</title>
                </head>
                <body style={s.master}>
                    <Navbar />
                    {this.props.children}
                </body>
            </html>
        )
    }
});

module.exports = MasterLayout;
