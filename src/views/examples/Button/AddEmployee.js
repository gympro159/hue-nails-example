
import React from "react";
import axios from 'axios';


export default class AddEmployee extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            employees: this.props.employees
        }
    }

    saveEmp = () => {
        let dataEmp = {
            id: this.state.employees.length+1,
            fullName: this._inputElementName.value,
            birth: this._inputElementBirth.value,
            gender: this._inputElementGender.value,
            phone: this._inputElementPhone.value,
            email: this._inputElementEmail.value,
            city: this._inputElementCity.value,
            socialSecurityNumber: this._inputElementSs.value,
            driversLicenseNumber: this._inputElementDl.value,
            monthSalary: [{
                month: "07",
                cash: 0,
                sec: 0
            }]
        };
        console.log(dataEmp.id);
        let check = true;
        this.state.employees.map((employee) => {
            if (employee.socialSecurityNumber === dataEmp.socialSecurityNumber ||employee.driversLicenseNumber === dataEmp.driversLicenseNumber
                || employee.email===dataEmp.email)
                check = false
        });
        if (!check) {
            return (
                window.alert("ERROR: This employee has existed!")
            );
        } else {
            axios.post(`https://5d2bff168c90070014971f65.mockapi.io/api/v1/employees`, dataEmp)
                .then(res => {
                    console.log(res.data);
                });
            return (
                window.alert("OK: This employee has added successfully!")
            );

        }
    };

    render() {
        return (
            <>
                <button type="button" className="btn btn-primary fa fa-plus" data-toggle="modal" data-target="#modelId">
                </button>

                <div className="modal fade" id="modelId" tabIndex="-1" role="dialog" aria-labelledby="modelTitleId"
                     aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add Employee</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">

                                <form className="was-validated" onSubmit={this.saveEmp}>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="inputName">Full Name</label>
                                            <input type="text" className="form-control" id="inputName"
                                                   placeholder="Full Name" required
                                                   ref={(a) => this._inputElementName = a}/>
                                            <p className="invalid-feedback">Not a valid name</p>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="inputEmail">Email</label>
                                            <input type="email" className="form-control" id="inputEmail"
                                                   placeholder="Email" required
                                                   ref={(b) => this._inputElementEmail = b}/>
                                            <p className="invalid-feedback">Not a valid email address</p>
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group col-md-4">
                                            <label htmlFor="inputPhone">Phone Number</label>
                                            <input type="number" className="form-control" id="inputPhone"
                                                   placeholder="Phone Number" required
                                                   ref={(c) => this._inputElementPhone = c}/>
                                            <p className="invalid-feedback">Not a valid phone number</p>
                                        </div>
                                        <div className="form-group col-md-5">
                                            <label htmlFor="inputBirth">Birthday</label>
                                            <input type="date" className="form-control" id="inputBirth" required
                                                   ref={(d) => this._inputElementBirth = d}/>
                                            <p className="invalid-feedback">Not a valid birthday</p>
                                        </div>
                                        <div className="form-group col-md-3">
                                            <label htmlFor="inputGender">Gender</label>
                                            <select className="custom-select" id="inputGender" required
                                                    ref={(f) => this._inputElementGender = f}>
                                                <option value="">Gender..</option>
                                                <option value="true">Male</option>
                                                <option value="false">Female</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="inputSs">Social Security Number</label>
                                            <input type="number" className="form-control" id="inputNameSs"
                                                   placeholder="Social Security Number" required
                                                   ref={(g) => this._inputElementSs = g}/>
                                            <p className="invalid-feedback">Not a valid Social Security Number</p>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="inputDl">Driver's License Number</label>
                                            <input type="text" className="form-control" id="inputDl"
                                                   placeholder="Driver's License Number" required
                                                   ref={(h) => this._inputElementDl = h}/>
                                            <p className="invalid-feedback">Not a valid Driver's License Number</p>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputCity">City</label>
                                        <input type="text" className="form-control" id="inputCity" placeholder="City"
                                               required ref={(k) => this._inputElementCity = k}/>
                                        <p className="invalid-feedback">Not a valid address</p>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Save</button>
                                </form>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
