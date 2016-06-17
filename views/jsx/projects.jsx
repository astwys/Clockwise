var React = require('react');
var DefaultLayout = require('./layout/master');

var ProjectsComponent = React.createClass({
    render:function() {
        let currentUser = this.props.user.username;

        return (
            <DefaultLayout name={this.props.name}>
                <h3>Projects</h3>
                {this.props.projects.map(function(project) {
                    return (
                        <div>
                            <h4>{project.projectName}</h4>
                            {project.Members.map(function(member) {
                                return (
                                    <div>
                                        {(() => {
                                            switch (member.username) {
                                                case currentUser:   return "you";
                                                default:            return member.username;
                                            }
                                        })()},
                                        {(() => {
                                            switch(member.userProject.teamleader) {
                                                case true:  return " teamleader";
                                                default:    return " teammember";
                                            }
                                        })()}
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </DefaultLayout>
        )
    }
});

module.exports = ProjectsComponent;
