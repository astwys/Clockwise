var React = require('react');
var Navbar = require('./navbar');


var MasterLayout = React.createClass({
    render:function() {
        return (
            <html>
                <head>
                    <title>{this.props.name}</title>
                </head>
                <body>
                    <Navbar />
                    {this.props.children}
                </body>
            </html>
        )
    }
});

module.exports = MasterLayout;
