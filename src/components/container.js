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

    selectingJobHelper = (showElement, allJobs, role) => {
        for (let i = 0; i < allJobs.length; i++) {
            let filterBoolean = true

            if (allJobs[i].role === role || allJobs[i].level == role) {
                filterBoolean = false
            };

            for (const j of allJobs[i].languages) {
                if (j === role) {
                    filterBoolean = false
                }
            };

            if (filterBoolean) {
                let hiddenIndexes = this.state.hiddenIndexes;
                hiddenIndexes[i] = showElement
                this.setState({
                    hiddenIndexes: hiddenIndexes
                });
            };
        };
    };

    handleChoosingRole = (role) => {
        const allJobs = this.state.allJobs
        let chosenRoles = this.state.chosenRoles
        if (!chosenRoles.includes(role)) {
            chosenRoles = [...chosenRoles, role]
        };

        this.selectingJobHelper(true, allJobs, role)
        this.setState({
            chosenRoles: chosenRoles,
        });
    };

    handleRemoveFilter = (index) => {
        const allJobs = this.state.allJobs;
        const role = this.state.chosenRoles[index];
        this.selectingJobHelper(false, allJobs, role);
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