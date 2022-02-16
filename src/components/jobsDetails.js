import React, { Component } from 'react';
import "../styling/jobsDetails.scss"

class JobsDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roles: [],
        };
    };

    componentDidMount = () => {
        const languages = this.props.job.languages;
        const level = this.props.job.level;
        const role = this.props.job.role;
        const allRoles = [...languages, level, role]
        this.setState({
            roles: allRoles, 
        });
    };


    render() {
        return <> {this.props.job &&
            <div className='companyData'>
                <img className='companyLogo' src={this.props.job.logo} />
                <div className='companyDetails' >
                    <div className='companyInfo'>
                        <h2 className='companyName'>{this.props.job.company}</h2>
                        {this.props.job.new && <div className='new'>New</div>}
                        {this.props.job.featured && <div className='featured'>featured</div>}
                    </div>

                    <h3 className='jobPosition'>{this.props.job.position}</h3>

                    <div className='jobFeatures'>
                        <p className='features'>{this.props.job.postedAt} . {this.props.job.contract} . {this.props.job.location}</p>
                    </div>
                </div>

                <div className='jobRoles'>
                    {this.state.roles.map(role => {
                        return <div key={role} onClick={() => this.props.handleChoosingRole(role)} className="eachRole">{role}</div>
                    })}
                </div>
            </div>
        }
        </>

    }
}

export default JobsDetails;