var React = require('react');

var DefaultLayout = require('./layout/master');

var TimeComponent = React.createClass({
    render:function() {
        return (
            <DefaultLayout name={this.props.name}>
                <div>
                    <h4>Log Time</h4>
                    <form method="post">
                        <div>
                            What did you work on?
                            <input type="text" name="work"/>
                        </div>
                        <p>
                            Which project did you work on?

                        </p>
                        <div>
                            How long did you work for?
                            <p>
                                Start:
                            </p>
                            <p>
                                End:
                            </p>
                        </div>

                    </form>
                </div>
            </DefaultLayout>
        )
    }
});

module.exports = TimeComponent;
