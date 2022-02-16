import React, { Component } from 'react';
import '../styling/header.scss'

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allRoles: this.props.chosenRoles
        };
    };


    componentDidUpdate(prevProps) {
        if (this.props.chosenRoles !== prevProps.chosenRoles) {
            this.setState({
                allRoles: this.props.chosenRoles
            });
        };
    };

    handleRemoveRole = (index) => {
        let allRoles = this.state.allRoles;
        allRoles.splice(index, 1);
        this.setState({
            allRoles: allRoles
        });
        this.props.handleRemoveFilter(index)
    };

    handleClearAll = () => {
        let allRoles = this.state.allRoles;
        allRoles.splice(0)
        this.setState({
            allRoles: allRoles
        });
        this.props.setInitialHiddenState()
    };

    render() {
        return (
            <div className='header'>
                {this.state.allRoles.length !== 0 &&
                    <div className='chosenRoles'>

                        {this.state.allRoles.map((role, index) => {
                            return <div className='headerRoles'>
                                <p className='roleName'>{role}</p>
                                <img onClick={() => { this.handleRemoveRole(index) }} className='removeIcon' src='./images/icon-remove.svg' />
                            </div>
                        })}
                        <p onClick={this.handleClearAll} className='clearAll'>Clear</p>
                    </div>
                }
            </div>
        );
    };
};

export default Header;