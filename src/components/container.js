import React, { Component } from 'react';
import jobs from "../data.json"
import Header from './header';
import JobsDetails from './jobsDetails';
import '../styling/container.scss'

class Container extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chosenRoles: [],
            allJobs: jobs,
            hiddenIndexes: {}
        };
    };

    filtration = (roles) => {
        let allJobs = this.state.allJobs;
        let chosenRoles = this.state.chosenRoles;
        const rolesObj = {}
        // console.log(chosenRoles.length);
        if (chosenRoles.length === 0) {
            return true
        };

        for (let i = 0; i < roles.length; i++) {
            const element = roles[i];
            rolesObj[element] = true;
        };

        for (let j = 0; j < chosenRoles.length; j++) {
            if (rolesObj[chosenRoles[j]]) {
                return true
            };
        };

        return false
    };

    handleChoosingRole = (role) => {
        let chosenRoles = this.state.chosenRoles
        if (!chosenRoles.includes(role)) {
            chosenRoles = [...chosenRoles, role]
        };
        
        this.setState({
            chosenRoles: chosenRoles,
        });
    };

    handleRemoveFilter = (index) => {
        console.log(this.state.chosenRoles);
    };

    setInitialHiddenState = () => {
        this.setState({
            hiddenIndexes: {}
        })
    }

    render() {
        return (
            <div>
                <Header
                    setInitialHiddenState={this.setInitialHiddenState}
                    chosenRoles={this.state.chosenRoles}
                    handleRemoveFilter={this.handleRemoveFilter}
                />
                <div className='companyContainer'>
                    {this.state.allJobs.map((job, i) => {
                        return <div key={job.id} className={this.state.hiddenIndexes[i] && "hidden"}>
                            <JobsDetails
                                filtration={this.filtration}
                                handleChoosingRole={this.handleChoosingRole}
                                job={job}
                            />
                        </div>
                    })}
                </div>

            </div>
        );
    }
}

export default Container;