import React from "react";
    // import RemoveInfoExpens from './removeInfoExpens';
import axios from "axios";

export default class InfoExpensesPlus extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            expenditure: this.props.economic[this.props.id].expenditure,
            economic: [],
            isRemoved: false,
            pl :0
        }
    }

    // updateState = (expen) => {
    //     this.setState({expenditure: expen});
    //     console.log(this.state.expenditure)
    // };

    removeInfo = (month, index) => {
        console.log(index);
        console.log('Month-------',month);
        if (window.confirm("Are you sure you want to delete?")) {
            let expenditure = this.state.expenditure;
            let economic = this.props.economic[this.props.id];
            // console.log(economic);
            expenditure.plus.splice(index, 1);
            console.log(expenditure);
            economic.expenditure = expenditure;
            economic.id = economic.id.toString();
            this.setState({economic});
            console.log(economic);
            for(let econ of this.props.economic) {
                let econMonthInt = parseInt(econ.month);
                if(econMonthInt===month+1) {
                    axios.delete(`https://5d2bff168c90070014971f65.mockapi.io/api/v1/economic/${econ.id}`)
                        .then(res => {
                            console.log('---------', res.data);
                            this.setState({isRemoved: true});
                            // this.setState({expenditure: res.data});
                            // this.props.expen(this.state.expenditure);
                            // window.alert("OK: You has deleted successfully!");
                            // window.location.reload();
                        });
                }
            }
                // console.log(this.state.expenditure);
        }
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.isRemoved) {
            let economic = this.state.economic;
            axios.post(`https://5d2bff168c90070014971f65.mockapi.io/api/v1/economic/`, {id: economic.id, month: economic.month, revenue: economic.revenue, expenditure: economic.expenditure})
                .then(res => {
                    console.log(res.data);
                    window.alert("OK: You has deleted successfully!");
                    window.location.reload();
                })
        }
    }

    // componentDidMount() {
    //     this.setState({pl: sum});
    //     this.props.plus(this.state.pl);
    // }

    render() {
        let month = this.props.id;
        let i = 0;
        var sum =0;
        // console.log(this.state);
        return (
            <>
                <button type="button" className="btn btn-primary btn-lg" data-toggle="modal"
                        data-target={`#modal${month}pp`}>
                    More
                </button>

                <div className="modal fade" id={`modal${month}pp`} tabIndex="-1" role="dialog"
                     aria-labelledby="modelTitleId" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Month {month + 1}</h5>
                                <button type="button" className="close" data-dismiss="modal"
                                        aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <table className="table table-striped table-bordered table-hover">
                                    <thead>
                                    <tr>
                                        <th className="text-center w-auto">#</th>
                                        <th className="text-center w-auto">Money</th>
                                        <th className="text-center w-auto">Note</th>
                                        <th className="text-center w-auto"> </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.expenditure.plus.map((pl, index) => {
                                        if (pl.money !== 0) {
                                            i = i + 1;
                                            sum += pl.money;
                                            return (
                                                <tr key={`${index}zzz`}>
                                                    <th className="text-center w-auto">{i}</th>
                                                    <td className="text-center w-auto">{pl.money}</td>
                                                    <td className="text-center w-auto">{pl.note}</td>
                                                    <td className="text-center w-auto">
                                                        <button type="button" className="bg-secondary text-danger btn btn-danger"
                                                                onClick={(e) => this.removeInfo(month, index)}>
                                                            X
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        }
                                    })}
                                    <tr>
                                        <th className="text-center w-auto">SUM</th>
                                        <th className="text-center w-auto">{sum}</th>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary"
                                        data-dismiss="modal">Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}