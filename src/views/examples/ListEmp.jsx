import React from 'react';
import InfoFull from "./Button/infoFull"
import Salary from "./Button/Salary";
import RemoveEmp from "./Button/removeEmp"


export default class ListEmp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            employees: this.props.employees,
            economic: this.props.economic
        }
    }

    createTask = (dataEmp, i) => {
        let birthdayCur = new Date(`${dataEmp.birth}`);
        let birthdayFor = birthdayCur.getDate() + "/" + (birthdayCur.getMonth() + 1) + "/" + birthdayCur.getFullYear();
        return (
            <tr key={dataEmp.socialSecurityNumber}>
                <th className="text-center">{i + 1}</th>
                <td className="text-center"> {dataEmp.fullName} </td>
                <td className="text-center"> {(dataEmp.gender) ? "Male" : "Female"} </td>
                <td className="text-center"> {birthdayFor} </td>
                <td className="text-center"> {dataEmp.city} </td>
                <td className="text-center"> {dataEmp.socialSecurityNumber} </td>
                <td className="text-center"> {dataEmp.driversLicenseNumber} </td>
                <td className="text-center"><InfoFull id={dataEmp.id}/></td>
                <td className="text-center"><Salary employee={dataEmp} economic={this.props.economic}/></td>
                <td className="text-center"><RemoveEmp id={dataEmp.id}/></td>
            </tr>
        )
    };

    render() {
        // console.log(this.state.monthSalary);
        // if (!this.state.employees.length) return null
        // console.log(this.state);
        return (
            <>
                {
                    this.state.employees.map((employee, i) => {
                        return this.createTask(employee, i)
                    })
                }
            </>
        );
    }
}