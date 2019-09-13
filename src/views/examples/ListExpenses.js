import React from "react";
import AddExpenses from './Button/AddExpenses';
import InfoExpen from './Button/infoExpensesPlus';

export default class listExpenses extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            plus: this.props.plus
        }
    }

    // hàm sắp xếp động
    compareValues = (key, order = 'asc') => {
        return function(a, b) {
            if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
                // nếu không tồn tại
                return 0;
            }
            a[key]= parseInt(a[key]);
            b[key]= parseInt(b[key]);
            const varA = (typeof a[key] === 'string') ?
                a[key].toUpperCase() : a[key];
            const varB = (typeof b[key] === 'string') ?
                b[key].toUpperCase() : b[key];

            let comparison = 0;
            if (varA > varB) {
                comparison = 1;
            } else if (varA < varB) {
                comparison = -1;
            }
            return (
                (order === 'desc') ? (comparison * -1) : comparison
            );
        };
    };

    // updateState = (plus) => {
    //         this.setState({plus});
    //         console.log(this.state.plus);
    //     };

    render() {
        let newEconomic = this.props.economic;
        return (
            <>
                <table className="table table-striped table-bordered table-hover">
                    <thead>
                    <tr>
                        <th className="text-center w-auto" rowSpan={2}>Month</th>
                        <th className="text-center w-auto" colSpan={2}>Revenue</th>
                        <th className="text-center w-auto" colSpan={4}>Expenditure</th>
                    </tr>
                    <tr>
                        <th className="text-center w-auto">Make</th>
                        <th className="text-center w-auto">Tip</th>
                        <th className="text-center w-auto">Salary</th>
                        <th className="text-center w-auto">Tip</th>
                        <th className="text-center w-25" colSpan={2}>Plus</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        newEconomic.map((econo, i) => {
                        return (
                            <tr key={i}>
                                <th className="text-center w-auto">{econo.month}</th>
                                <td className="text-center w-auto">{econo.revenue.make} </td>
                                <td className="text-center w-auto">{econo.revenue.tip} </td>
                                <td className="text-center w-auto">{econo.expenditure.makeSalary} </td>
                                <td className="text-center w-auto">{econo.expenditure.tipSalary} </td>
                                <td className="text-center w-auto">
                                    {this.props.plus[i]}
                                </td>
                                <td className="text-center w-auto">
                                    <InfoExpen id={i} economic={this.props.economic} plus={this.state.plus[i]}/>
                                </td>
                            </tr>
                        )
                    })}
                    <tr>
                        <th className="text-center w-auto"> </th>
                        <th className="text-center w-auto"> </th>
                        <th className="text-center w-auto"> </th>
                        <th className="text-center w-auto"> </th>
                        <th className="text-center w-auto"> </th>
                        <th className="text-center w-auto"> </th>
                        <th className="text-center w-auto"><AddExpenses economic={this.props.economic}/></th>
                    </tr>
                    </tbody>
                </table>
            </>
        );
    }
}