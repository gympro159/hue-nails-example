import React from "react";
import axios from 'axios';
import 'antd/dist/antd.css';
import './Salary.css';
import {Calendar, Alert} from 'antd';
import moment from 'moment';


export default class Salary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: moment('2019-07-01'),
            selectedValue: moment('2019-07-01'),
            employee: this.props.employee,
            economic: this.props.economic,
            make: "",
            tip: "",
            dteSalary: [],                                  /*use to insert data to api(dataSalary)*/
            montSalary : [],
            objSalary: {},           /*view*/
            objSalaryMonth: {}      /*view*/
        }
    }

    // componentDidMount() {
    //     /*Use to work with revenue*/
    //     axios.get(`https://5d2bff168c90070014971f65.mockapi.io/api/v1/economic`)
    //         .then(res => {
    //             const economic = res.data;
    //             this.setState({economic})
    //         });
    // }

    //this function is called when clicking on the date box
    onSelect = value => {
        console.log(value.toDate());
        this.setState({
            value: value,
            selectedValue: value,
            dteSalary: this.state.employee.dateSalary,       //copy employee.dateSalary of old api to here
            montSalary: this.state.employee.monthSalary
        });

        let objS = {date: "", make: "", tip: ""};
        let valueFormat = value.toDate();
        //use to view Alert
        for(let dateSlr of  this.state.employee.dateSalary)
        {
            if (dateSlr.date.localeCompare(valueFormat) === 0)
            {
                this.setState({objSalary: dateSlr});
                // console.log(this.state.objSalary);
                break;
            }
            else this.setState({objSalary: objS});
        }

        let monthValue = value.format('MM');
        // console.log(monthValue);
        let objMSlr = {month: monthValue, sec: 0, cash:0};
        for (let monthSlr of this.state.employee.monthSalary)
        {
            if(monthSlr.month.localeCompare(monthValue)===0)
            {
                let objMonSlr = {month: monthValue, sec: monthSlr.sec, cash: monthSlr.cash};
                this.setState({objSalaryMonth: objMonSlr});
                break;
            }
            else this.setState({objSalaryMonth: objMSlr});
        }
    };

    onPanelChange = value => {
        this.setState({value});
    };

    changeSalaryMake = (e) => {
        this.setState({make: e.target.value})
    };
    changeSalaryTip = (e) => {
        this.setState({tip: e.target.value})
    };

    //add data from input to api
    editSalary = (e) => {
        let objSlr = {date: `${this.state.value.toDate()}`, make: `${this.state.make}`, tip: `${this.state.tip}`};

        //insert data from objSlr to old api(emp)
        let emp = this.state.employee;
        let dateSalary = this.state.dteSalary.filter(dateS => dateS.date.localeCompare(objSlr.date) !== 0);
        dateSalary = dateSalary.concat(objSlr);
        console.log(dateSalary);

        axios.put(`https://5d2bff168c90070014971f65.mockapi.io/api/v1/employees/${emp.id}`, {dateSalary})
            .then(res => {
                console.log(res.data);
            });

        /*Update Salary month of employee*/
        let makeSlr = 0, makeRevenue = 0, tipRevenue =0;
        let valueFor = new Date(this.state.value);
        console.log(valueFor);
        let cash1, sec1=0;
        for (let dateSlr of this.state.employee.dateSalary)
        {
            let dateSlrFormat = new Date(dateSlr.date);
            if ((dateSlrFormat.getMonth()===valueFor.getMonth())
                && (dateSlrFormat.getFullYear()===valueFor.getFullYear()))
            {
                makeRevenue += 1.0 * dateSlr.make;
                tipRevenue += 1.0 * dateSlr.tip;
                makeSlr += 0.6 * dateSlr.make;
                sec1  += 1.0 * dateSlr.tip
            }
        }
        cash1 = makeSlr*0.4;
        sec1 += makeSlr*0.6;
        let m = parseFloat(cash1); cash1 = Math.round(m * 1000)/1000;
        let n = parseFloat(sec1); sec1 = Math.round(n * 1000)/1000;
        let k = parseFloat(makeSlr); makeSlr = Math.round(k * 1000)/1000;

        let month = this.state.value.format('MM');
        let objSalaryMonth = {month: month, cash: cash1, sec: sec1};
        let monthSalary = this.state.montSalary.filter(monthS => monthS.month.localeCompare(objSalaryMonth.month) !== 0);
        monthSalary = monthSalary.concat(objSalaryMonth);
        axios.put(`https://5d2bff168c90070014971f65.mockapi.io/api/v1/employees/${emp.id}`, {monthSalary})
            .then(res => {
                window.location.reload();
                // console.log(res.data);
            });

        e.preventDefault();
    };

    render() {
        let id = this.state.employee.id;
        const {value, selectedValue} = this.state;

        return (
            <>
                <button type="button" className="fa fa-money bg-secondary text-success btn btn-success"
                        data-toggle="modal" data-target={`#model${id}b`}
                        onClick={() => {
                            console.log(this.state.employee)
                        }}
                > </button>

                <div className="modal fade" id={`model${id}b`}>
                    <div className="modal-xl modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Work Diary</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {
                                    <div>
                                        <Alert message={`SALARY: Month: ${selectedValue.format('MM')} - Cash: ${this.state.objSalaryMonth.cash}$ - Sec: ${this.state.objSalaryMonth.sec}$`}/>
                                        <Alert
                                            message={`DATE: ${selectedValue && selectedValue.format('DD/MM/YYYY')}`}/>
                                        <form className="was-validated" onSubmit={this.editSalary}>
                                            <div className="form-row">
                                                <div className="form-group col-md-5">
                                                    <label>Make Money</label>
                                                    <input type="number" value={this.state.make}
                                                           className="form-control" id="inputMake"
                                                           placeholder={`${this.state.objSalary.make}`} required
                                                           onChange={this.changeSalaryMake}/>
                                                </div>
                                                <div className="form-group col-md-5">
                                                    <label>Tip Money</label>
                                                    <input type="number" value={this.state.tip} className="form-control"
                                                           id="inputTip"
                                                           placeholder={`${this.state.objSalary.tip}`} required
                                                           onChange={this.changeSalaryTip}/>
                                                </div>
                                                <div className="col-md-2 mt-4">
                                                    <button type="submit" className="btn btn-primary">Edit</button>
                                                </div>
                                            </div>
                                        </form>
                                        <Calendar value={value} onSelect={this.onSelect}
                                                  onPanelChange={this.onPanelChange}/>
                                    </div>
                                }

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