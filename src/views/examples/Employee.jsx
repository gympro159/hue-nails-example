
import React, { Suspense } from "react";
import classNames from 'classnames';
import _ from 'lodash'
// reactstrap components
import {
    TabContent,
    TabPane,
    Row,
    Col,
    Nav,
    NavItem,
    NavLink,
} from "reactstrap";

// List Employees

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.jsx";
import SimpleFooter from "components/Footers/SimpleFooter.jsx";
import AddEmployee from "./Button/AddEmployee";
import ListExpenses from "./ListExpenses";
import axios from "axios";
const ListEmp = React.lazy(() => import ('./ListEmp'));

class Employee extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: '1',
            economic: [],
            employees: [],
            plus: [],
            monthSalary: [],
            isFetched: false,
            isFetched2: false,
            isUpdated :false
        };
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

    toggle = (tab) => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    };

    componentDidMount() {
        // document.documentElement.scrollTop = 0;
        // document.scrollingElement.scrollTop = 0;
        // this.refs.main.scrollTop = 0;
        axios.get(`https://5d2bff168c90070014971f65.mockapi.io/api/v1/employees`)
            .then(res => {
                const employees = res.data;
                this.setState({
                    employees,
                    isFetched2: true
                });
            });

        axios.get(`https://5d2bff168c90070014971f65.mockapi.io/api/v1/economic`)
            .then(res => {
                const economic = res.data.sort(this.compareValues('month'));
                // console.log(res.data);
                for(let econo of economic)
                {
                    econo.month= econo.month.toString();
                }
                this.setState({economic, isFetched: true});
                // console.log(this.state.economic);
                if(this.state.isFetched) {
                    let plus = [0,0,0,0,0,0,0,0,0,0,0,0];
                    for (let i = 0; i < 12; i++) {
                        for (let pl of economic[i].expenditure.plus) {
                            plus[i] += pl.money;
                        }
                    }
                    this.setState({plus, isUpdated: true});
                    // console.log(this.state.plus);
                }
            });
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        // console.log('-------------', this.state)
        if (prevState.isFetched2 !== this.state.isFetched2) {
            let tmp = [];
            // console.log(this.state.employees)
            this.state.employees.forEach(el => {
                // tmp.concat(el.monthSalary)
                // console.log(tmp)
                tmp = _.concat(tmp, el.monthSalary)
            });
            this.setState({
                monthSalary: tmp,
                isUpdated: true
            });
        }
    }

    calculateRevenue = () => {
        let economic = [
            {
                month: "1",
                revenue: {
                    make: 0,
                    tip: 0
                },
                expenditure: {
                    makeSalary: 0,
                    tipSalary: 0,
                    plus: [
                        {
                            money: 0,
                            note: ""
                        }
                    ]
                }
            },
            {
                month: "2",
                revenue: {
                    make: 0,
                    tip: 0
                },
                expenditure: {
                    makeSalary: 0,
                    tipSalary: 0,
                    plus: [
                        {
                            money: 0,
                            note: ""
                        }
                    ]
                }
            },
            {
                month: "3",
                revenue: {
                    make: 0,
                    tip: 0
                },
                expenditure: {
                    makeSalary: 0,
                    tipSalary: 0,
                    plus: [
                        {
                            money: 0,
                            note: ""
                        }
                    ]
                }
            },
            {
                month: "4",
                revenue: {
                    make: 0,
                    tip: 0
                },
                expenditure: {
                    makeSalary: 0,
                    tipSalary: 0,
                    plus: [
                        {
                            money: 0,
                            note: ""
                        }
                    ]
                }
            },
            {
                month: "5",
                revenue: {
                    make: 0,
                    tip: 0
                },
                expenditure: {
                    makeSalary: 0,
                    tipSalary: 0,
                    plus: [
                        {
                            money: 0,
                            note: ""
                        }
                    ]
                }
            },
            {
                month: "6",
                revenue: {
                    make: 0,
                    tip: 0
                },
                expenditure: {
                    makeSalary: 0,
                    tipSalary: 0,
                    plus: [
                        {
                            money: 0,
                            note: ""
                        }
                    ]
                }
            },
            {
                month: "7",
                revenue: {
                    make: 0,
                    tip: 0
                },
                expenditure: {
                    makeSalary: 0,
                    tipSalary: 0,
                    plus: [
                        {
                            money: 0,
                            note: ""
                        }
                    ]
                }
            },
            {
                month: "8",
                revenue: {
                    make: 0,
                    tip: 0
                },
                expenditure: {
                    makeSalary: 0,
                    tipSalary: 0,
                    plus: [
                        {
                            money: 0,
                            note: ""
                        }
                    ]
                }
            },
            {
                month: "9",
                revenue: {
                    make: 0,
                    tip: 0
                },
                expenditure: {
                    makeSalary: 0,
                    tipSalary: 0,
                    plus: [
                        {
                            money: 0,
                            note: ""
                        }
                    ]
                }
            },
            {
                month: "10",
                revenue: {
                    make: 0,
                    tip: 0
                },
                expenditure: {
                    makeSalary: 0,
                    tipSalary: 0,
                    plus: [
                        {
                            money: 0,
                            note: ""
                        }
                    ]
                }
            },
            {
                month: "11",
                revenue: {
                    make: 0,
                    tip: 0
                },
                expenditure: {
                    makeSalary: 0,
                    tipSalary: 0,
                    plus: [
                        {
                            money: 0,
                            note: ""
                        }
                    ]
                }
            },
            {
                month: "12",
                revenue: {
                    make: 0,
                    tip: 0
                },
                expenditure: {
                    makeSalary: 0,
                    tipSalary: 0,
                    plus: [
                        {
                            money: 0,
                            note: ""
                        }
                    ]
                }
            }
        ];
        for(let econo of economic) {
            let econoMonthInt = parseInt(econo.month);
            for (let monthSlr of this.state.monthSalary) {
                let monthSlrMonthInt = parseInt(monthSlr.month);
                if (econoMonthInt===monthSlrMonthInt) {
                    // console.log(monthSlrMonthInt);
                    econo.revenue.make += (monthSlr.cash / 0.4 / 0.6);
                    econo.revenue.tip += (monthSlr.sec - monthSlr.cash*1.5);
                    econo.expenditure.makeSalary += (monthSlr.cash / 0.4);
                }
            }
            let m = parseFloat(econo.revenue.make); econo.revenue.make = Math.round(m * 1000)/1000;
            let n = parseFloat(econo.expenditure.makeSalary); econo.expenditure.makeSalary = Math.round(n * 1000)/1000;
            let k = parseFloat(econo.revenue.tip); econo.revenue.tip = Math.round(k * 1000)/1000;
            econo.expenditure.tipSalary = econo.revenue.tip;
        }
        // console.log(economic);
        // console.log(this.state.economic);
        for(let econ of economic) {
            for(let eco of this.state.economic) {
                if (econ.month.localeCompare(eco.month)===0) {
                    let revenue = econ.revenue, expenditure = econ.expenditure;
                    axios.put(`https://5d2bff168c90070014971f65.mockapi.io/api/v1/economic/${eco.id}`, {
                        revenue,
                        expenditure
                    })
                        .then(res => {
                            // console.log(res.data);
                        });
                }
            }
        }
    };

    render() {
        console.log(this.state);
        if (this.state.isUpdated) {
            this.calculateRevenue();
        }
        if(!this.state.isFetched2) return null;
            return (
                <>
                    <DemoNavbar/>
                    <main ref="main">
                        <section className="section section-shaped section-lg">
                            <div className="shape shape-style-1 bg-gradient-default">
                                <span/>
                                <span/>
                                <span/>
                                <span/>
                                <span/>
                                <span/>
                                <span/>
                                <span/>
                            </div>
                            <br/>
                            <br/>
                            <h3 className="text-white text-center text-uppercase text-success mb-100">Employees
                                Manager</h3>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <div className="bg-secondary container-fluid mb-5 mt-150">
                                <Nav tabs>
                                    <NavItem>
                                        <NavLink className={classNames({active: this.state.activeTab === '1'})}
                                                 onClick={() => this.toggle('1')}>
                                            <h5 className="text-uppercase text-primary text-center">Employees List</h5>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className={classNames({active: this.state.activeTab === '2'})}
                                                 onClick={() => this.toggle('2')}>
                                            <h5 className="text-uppercase text-primary text-center">Revenue</h5>
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                                <TabContent id="listEmp" activeTab={this.state.activeTab}>
                                    <TabPane tabId="1">
                                        <Row>
                                            <Col sm="12">
                                                <table className="table table-striped table-hover">
                                                    <thead>
                                                    <tr>
                                                        <th className="text-center w-auto" scope="row">#</th>
                                                        <th className="text-center w-auto">Full Name</th>
                                                        <th className="text-center w-auto">Gender</th>
                                                        <th className="text-center w-auto">Birthday</th>
                                                        <th className="text-center w-auto">City</th>
                                                        <th className="text-center w-auto">Social Security Number</th>
                                                        <th className="text-center w-auto">Driver's License Number</th>
                                                        <th colSpan={3} className="text-center w-auto"/>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <Suspense fallback={<div>Loading...</div>}>
                                                        <ListEmp employees={this.state.employees}/>
                                                        <tr>
                                                            <td/>
                                                            <td/>
                                                            <td/>
                                                            <td/>
                                                            <td/>
                                                            <td/>
                                                            <td/>
                                                            <td/>
                                                            <td/>
                                                            <td className="text-center">
                                                                <AddEmployee employees={this.state.employees}/>
                                                            </td>
                                                        </tr>
                                                    </Suspense>
                                                    </tbody>
                                                </table>
                                            </Col>
                                        </Row>
                                    </TabPane>
                                    <TabPane tabId="2">
                                        <Row>
                                            <Col sm="12">
                                                <ListExpenses economic={this.state.economic} plus={this.state.plus}/>
                                            </Col>
                                        </Row>
                                    </TabPane>
                                </TabContent>

                            </div>
                        </section>
                    </main>
                    <SimpleFooter/>
                </>
            );
    }
}

export default Employee;
