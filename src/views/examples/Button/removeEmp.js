import React from "react";
import axios from 'axios';

export default class removeEmp extends React.Component {

    removeEmp = (id) => {
        axios.delete(`https://5d2bff168c90070014971f65.mockapi.io/api/v1/employees/${id}`)
            .then(res => {console.log(res.data); window.location.reload()});
        return (
            window.alert("OK: This employee has removed successfully!")
        );
    };

    render() {
        let id = this.props.id;
        return (
            <>
                <button type="button" className="bg-secondary text-danger btn btn-danger" data-toggle="modal" data-target={`#model${id}c`}>
                    X
                </button>

                <div className="modal fade" id={`model${id}c`} tabIndex="-1" role="dialog" aria-labelledby="modelTitleId"
                     aria-hidden="true">
                    <div className="modal-lg modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <h5 className="text-danger">
                                    WARNING: <br/>All data of this employee on the server will be permanently deleted!<br/>
                                    Are you sure you want to delete this employee?</h5>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-danger" onClick={(e) => this.removeEmp(id)}>OK</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
