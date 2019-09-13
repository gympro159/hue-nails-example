import React from "react";
import axios from 'axios';

export default class ModalsAdd extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            employees: []
        }
    }

    componentDidMount() {
        axios.get(`https://5d2bff168c90070014971f65.mockapi.io/api/v1/employees`)
            .then(res => {
                const employees = res.data;
                this.setState({employees});
            });
    }

    render() {
        let id = this.props.id;
        return (
            <>
                <button type="button" className="ni ni-badge bg-secondary text-info btn btn-info" data-toggle="modal" data-target={`#model${id}`}> </button>

                <div className="modal fade" id={`model${id}`} tabIndex="-1" role="dialog" aria-labelledby="modelTitleId"
                     aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Information</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {
                                    this.state.employees.map((employee) => {
                                    if (employee.id===id) {
                                        return(
                                        <div key={id}>
                                            <h3>{employee.fullName}</h3>
                                            <div className="media">
                                                <a className="d-flex" href="#">
                                                    <img src={employee.avatar} alt=""/>
                                                </a>
                                                <div className="media-body">
                                                    <div className="container">
                                                        <div className="row">
                                                            <h5 className="col-md-6 text-left text-uppercase text-primary">Gender: </h5>
                                                            <h5 className="col-md-6 text-left">{(employee.gender === true) ? "Male" : "Female"}</h5>
                                                        </div>
                                                        <div className="row">
                                                            <h5 className="col-md-6 text-left text-uppercase text-primary">Birthday: </h5>
                                                            <h5 className="col-md-6 text-left">{employee.birth}</h5>
                                                        </div>
                                                        <div className="row">
                                                            <h5 className="col-md-6 text-left text-uppercase text-primary">Phone Number: </h5>
                                                            <h5 className="col-md-6 text-left">{employee.phone}</h5><br/>
                                                        </div>
                                                        <div className="row">
                                                            <h5 className="col-md-6 text-left text-uppercase text-primary">Email: </h5>
                                                            <h5 className="col-md-6 text-left">{employee.email}</h5><br/>
                                                        </div>
                                                        <div className="row">
                                                            <h5 className="col-md-6 text-left text-uppercase text-primary">City: </h5>
                                                            <h5 className="col-md-6 text-left">{employee.city}</h5><br/>
                                                        </div>
                                                        <div className="row">
                                                            <h5 className="col-md-6 text-left text-uppercase text-primary">Social Security Number: </h5>
                                                            <h5 className="col-md-6 text-left">{employee.socialSecurityNumber}</h5><br/>
                                                        </div>
                                                        <div className="row">
                                                            <h5 className="col-md-6 text-left text-uppercase text-primary">Driver's License Number: </h5>
                                                            <h5 className="col-md-6 text-left">{employee.driversLicenseNumber}</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                    }
                                })}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}