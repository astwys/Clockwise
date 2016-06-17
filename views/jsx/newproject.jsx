var React = require('react');

var DefaultLayout = require('./layout/master');

var NewProjectComponent = React.createClass({
    render:function() {
        return (
            <DefaultLayout name={this.props.name}>
            <form method="post">
                <input type="hidden" name="_csrf" value={this.props.csrfToken} />
                <p>
                    <input type="text" required="true" name="name" placeholder="Project Name"/>
                </p>
                <p>
                    <select name="members">
                        {this.props.users.map(function(user) {
                            return <option value={user.id} key={user.id}>{user.username}</option>
                        })}
                    </select>
                </p>
                <input type="submit" />
            </form>
            </DefaultLayout>
        )
    }
});

module.exports = NewProjectComponent;
