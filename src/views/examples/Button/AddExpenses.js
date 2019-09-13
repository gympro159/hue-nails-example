
import React from "react";
import axios from 'axios';

export default class AddExpenses extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            economic: this.props.economic,
            money: 0,
            month: "",
            note: ""
        }
    }

    changeMonth = (e) => {
        this.setState({month: e.target.value})
    };
    changeMoney = (e) => {
        this.setState({money: e.target.value})
    };
    changeNote = (e) => {
        this.setState({note: e.target.value})
    };

    saveEmp = (e) => {
        console.log(this.props);
        let idString = this.state.month;
        let id= parseInt(idString, 10);
        let plus = {
            money: parseInt(this.state.money, 10),
            note: this.state.note
        };
        let expenditure = this.props.economic[id-1].expenditure;
        console.log(plus);
        expenditure.plus = expenditure.plus.concat(plus);
        console.log(expenditure);
        console.log('----------',id);
        for(let econ of this.props.economic) {
            let econMonthInt= parseInt(econ.month);
            if(econMonthInt===id) {
                axios.put(`https://5d2bff168c90070014971f65.mockapi.io/api/v1/economic/${econ.id}`, {expenditure})
                    .then(res => {
                        console.log(res.data);
                        window.alert("OK: You has added successfully!");
                        window.location.reload();
                    });
            }
        }
        e.preventDefault();

    };

    render() {
        //console.log(this.props.economic);
        return (
            <>
                <button type="button" className="btn btn-primary fa fa-plus" data-toggle="modal" data-target="#modelIdabc">
                </button>

                <div className="modal fade" id="modelIdabc" tabIndex="-1" role="dialog" aria-labelledby="modelTitleId"
                     aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form className="was-validated" onSubmit={this.saveEmp}>
                                    <div className="form-row">
                                        <div className="form-group col-md-3">
                                            <label htmlFor="inputMonth">Month</label>
                                            <select className="custom-select" value={this.state.month}
                                                    id="inputMonth" required
                                                    onChange={this.changeMonth}>
                                                <option value="">Month..</option>
                                                <option value="1">Jan</option>
                                                <option value="2">Feb</option>
                                                <option value="3">Mar</option>
                                                <option value="4">Apr</option>
                                                <option value="5">May</option>
                                                <option value="6">Jun</option>
                                                <option value="7">Jul</option>
                                                <option value="8">Aug</option>
                                                <option value="9">Sep</option>
                                                <option value="10">Oct</option>
                                                <option value="11">Nov</option>
                                                <option value="12">Dec</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-md-3">
                                            <label htmlFor="inputMoney">Money</label>
                                            <input type="number" value={this.state.money}
                                                   className="form-control" id="inputMoney"
                                                   placeholder="Money" required
                                                   onChange={this.changeMoney}/>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="inputNote">Note</label>
                                            <input type="text" value={this.state.note}
                                                   className="form-control" id="inputNote"
                                                   placeholder="Note" required
                                                   onChange={this.changeNote}/>
                                        </div>
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
