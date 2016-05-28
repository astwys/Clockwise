var React = require('react');
var DefaultLayout = require('./layout/master');

var RegisterComponent = React.createClass({
    render:function() {
        return (
            <DefaultLayout name={this.props.name}>
                <p>
                    {this.props.error}
                </p>
                <form method="post">
                    <input type="hidden" name="_csrf" value={this.props.csrfToken}></input>
                    <p>
                        <span>Username: </span>
                        <input type="text" name="username" required="true" placeholder="Username"/>
                    </p>
                    <p>
                        <span>Email: </span>
                        <input type="email" name="email" required="true" placeholder="Email"/>
                    </p>
                    <p>
                        <span>Password: </span>
                        <input type="password" name="password" required="true" placeholder="Password"/>
                    </p>
                    <p>
                        <input type="submit" />
                    </p>
                </form>
            </DefaultLayout>
        )
    }
});

module.exports = RegisterComponent;
