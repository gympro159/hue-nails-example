import React from 'react';
import axios from 'axios';

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.jsx";
import SimpleFooter from "components/Footers/SimpleFooter.jsx";
import FusionCharts from 'fusioncharts';
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";
import Column2D from 'fusioncharts/fusioncharts.charts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

ReactFusioncharts.fcRoot(FusionCharts, Column2D, FusionTheme);


// Resolves charts dependancy
charts(FusionCharts);

export default class revenue extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            economic: [],
            plus: [],
            onTip: true,
            isFetched: false,
            isPlus: false,
            dataSource: {
            }
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

    componentDidMount() {
        axios.get(`https://5d2bff168c90070014971f65.mockapi.io/api/v1/economic`)
            .then(res => {
                const economic = res.data.sort(this.compareValues('month'));
                this.setState({economic, isFetched: true});
                // console.log(economic);
                if(this.state.isFetched) {
                    let plus = [0,0,0,0,0,0,0,0,0,0,0,0];
                    for (let i = 0; i < 12; i++) {
                        for (let pl of economic[i].expenditure.plus) {
                            plus[i] += pl.money;
                        }
                    }
                    this.setState({plus, isPlus: true})
                }
                if(this.state.isFetched && this.state.isPlus) {
                    this.setState({
                        dataSource: {
                            chart: {
                                caption: "Revenue and Expenditure Chart",
                                subcaption: "In 2019",
                                yaxisname: "Dollars",
                                numvisibleplot: "8",
                                labeldisplay: "auto",
                                theme: "fusion"
                            },
                            categories: [
                                {
                                    category: [
                                        {
                                            label: "Jan"
                                        },
                                        {
                                            label: "Feb"
                                        },
                                        {
                                            label: "Mar"
                                        },
                                        {
                                            label: "Apr"
                                        },
                                        {
                                            label: "May"
                                        },
                                        {
                                            label: "Jun"
                                        },
                                        {
                                            label: "Jul"
                                        },
                                        {
                                            label: "Aug"
                                        },
                                        {
                                            label: "Sep"
                                        },
                                        {
                                            label: "Oct"
                                        },
                                        {
                                            label: "Nov"
                                        },
                                        {
                                            label: "Dec"
                                        }
                                    ]
                                }
                            ],
                            dataset: [
                                {
                                    seriesname: "Revenue",
                                    data: [
                                        {
                                            value: this.state.economic[0].revenue.make + this.state.economic[0].revenue.tip
                                        },
                                        {
                                            value: this.state.economic[1].revenue.make + this.state.economic[1].revenue.tip
                                        },
                                        {
                                            value: this.state.economic[2].revenue.make + this.state.economic[2].revenue.tip
                                        },
                                        {
                                            value: this.state.economic[3].revenue.make + this.state.economic[3].revenue.tip
                                        },
                                        {
                                            value: this.state.economic[4].revenue.make + this.state.economic[4].revenue.tip
                                        },
                                        {
                                            value: this.state.economic[5].revenue.make + this.state.economic[5].revenue.tip
                                        },
                                        {
                                            value: this.state.economic[6].revenue.make + this.state.economic[6].revenue.tip
                                        },
                                        {
                                            value: this.state.economic[7].revenue.make + this.state.economic[7].revenue.tip
                                        },
                                        {
                                            value: this.state.economic[8].revenue.make + this.state.economic[8].revenue.tip
                                        },
                                        {
                                            value: this.state.economic[9].revenue.make + this.state.economic[9].revenue.tip
                                        },
                                        {
                                            value: this.state.economic[10].revenue.make + this.state.economic[10].revenue.tip
                                        },
                                        {
                                            value: this.state.economic[11].revenue.make + this.state.economic[11].revenue.tip
                                        }
                                    ]
                                },
                                {
                                    seriesname: "Expenditure",
                                    data: [
                                        {
                                            value: this.state.economic[0].expenditure.makeSalary + this.state.economic[0].expenditure.tipSalary + this.state.plus[0]
                                        },
                                        {
                                            value: this.state.economic[1].expenditure.makeSalary + this.state.economic[1].expenditure.tipSalary + this.state.plus[1]
                                        },
                                        {
                                            value: this.state.economic[2].expenditure.makeSalary + this.state.economic[2].expenditure.tipSalary + this.state.plus[2]
                                        },
                                        {
                                            value: this.state.economic[3].expenditure.makeSalary + this.state.economic[3].expenditure.tipSalary + this.state.plus[3]
                                        },
                                        {
                                            value: this.state.economic[4].expenditure.makeSalary + this.state.economic[4].expenditure.tipSalary + this.state.plus[4]
                                        },
                                        {
                                            value: this.state.economic[5].expenditure.makeSalary + this.state.economic[5].expenditure.tipSalary + this.state.plus[5]
                                        },
                                        {
                                            value: this.state.economic[6].expenditure.makeSalary + this.state.economic[6].expenditure.tipSalary + this.state.plus[6]
                                        },
                                        {
                                            value: this.state.economic[7].expenditure.makeSalary + this.state.economic[7].expenditure.tipSalary + this.state.plus[7]
                                        },
                                        {
                                            value: this.state.economic[8].expenditure.makeSalary + this.state.economic[8].expenditure.tipSalary + this.state.plus[8]
                                        },
                                        {
                                            value: this.state.economic[9].expenditure.makeSalary + this.state.economic[9].expenditure.tipSalary + this.state.plus[9]
                                        },
                                        {
                                            value: this.state.economic[10].expenditure.makeSalary + this.state.economic[10].expenditure.tipSalary + this.state.plus[10]
                                        },
                                        {
                                            value: this.state.economic[11].expenditure.makeSalary + this.state.economic[11].expenditure.tipSalary + this.state.plus[11]
                                        }
                                    ]
                                }
                            ]
                        }
                    });
                }
            });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.onTip !== this.state.onTip && this.state.isFetched) {
            this.setState({
                dataSource: {
                    chart: {
                        caption: "Revenue and Expenditure Chart",
                        subcaption: "In 2019",
                        yaxisname: "Dollars",
                        numvisibleplot: "8",
                        labeldisplay: "auto",
                        theme: "fusion"
                    },
                    categories: [
                        {
                            category: [
                                {
                                    label: "Jan"
                                },
                                {
                                    label: "Feb"
                                },
                                {
                                    label: "Mar"
                                },
                                {
                                    label: "Apr"
                                },
                                {
                                    label: "May"
                                },
                                {
                                    label: "Jun"
                                },
                                {
                                    label: "Jul"
                                },
                                {
                                    label: "Aug"
                                },
                                {
                                    label: "Sep"
                                },
                                {
                                    label: "Oct"
                                },
                                {
                                    label: "Nov"
                                },
                                {
                                    label: "Dec"
                                }
                            ]
                        }
                    ],
                    dataset: [
                        {
                            seriesname: "Revenue",
                            data: [
                                {
                                    value: `${(this.state.onTip) ? `${this.state.economic[0].revenue.make + this.state.economic[0].revenue.tip}` : `${this.state.economic[0].revenue.make}`}`
                                },
                                {
                                    value: `${(this.state.onTip) ? `${this.state.economic[1].revenue.make + this.state.economic[1].revenue.tip}` : `${this.state.economic[1].revenue.make}`}`
                                },
                                {
                                    value: `${(this.state.onTip) ? `${this.state.economic[2].revenue.make + this.state.economic[2].revenue.tip}` : `${this.state.economic[2].revenue.make}`}`
                                },
                                {
                                    value: `${(this.state.onTip) ? `${this.state.economic[3].revenue.make + this.state.economic[3].revenue.tip}` : `${this.state.economic[3].revenue.make}`}`
                                },
                                {
                                    value: `${(this.state.onTip) ? `${this.state.economic[4].revenue.make + this.state.economic[4].revenue.tip}` : `${this.state.economic[4].revenue.make}`}`
                                },
                                {
                                    value: `${(this.state.onTip) ? `${this.state.economic[5].revenue.make + this.state.economic[5].revenue.tip}` : `${this.state.economic[5].revenue.make}`}`
                                },
                                {
                                    value: `${(this.state.onTip) ? `${this.state.economic[6].revenue.make + this.state.economic[6].revenue.tip}` : `${this.state.economic[6].revenue.make}`}`
                                },
                                {
                                    value: `${(this.state.onTip) ? `${this.state.economic[7].revenue.make + this.state.economic[7].revenue.tip}` : `${this.state.economic[7].revenue.make}`}`
                                },
                                {
                                    value: `${(this.state.onTip) ? `${this.state.economic[8].revenue.make + this.state.economic[8].revenue.tip}` : `${this.state.economic[8].revenue.make}`}`
                                },
                                {
                                    value: `${(this.state.onTip) ? `${this.state.economic[9].revenue.make + this.state.economic[9].revenue.tip}` : `${this.state.economic[9].revenue.make}`}`
                                },
                                {
                                    value: `${(this.state.onTip) ? `${this.state.economic[10].revenue.make + this.state.economic[10].revenue.tip}` : `${this.state.economic[10].revenue.make}`}`
                                },
                                {
                                    value: `${(this.state.onTip) ? `${this.state.economic[11].revenue.make + this.state.economic[11].revenue.tip}` : `${this.state.economic[10].revenue.make}`}`
                                }
                            ]
                        },
                        {
                            seriesname: "Expenditure",
                            data: [
                                {
                                    value: `${(this.state.onTip) ? `${this.state.economic[0].expenditure.makeSalary + this.state.economic[0].expenditure.tipSalary + this.state.plus[0]}` : `${this.state.economic[0].expenditure.makeSalary + this.state.plus[0]}`}`
                                },
                                {
                                    value: `${(this.state.onTip) ? `${this.state.economic[1].expenditure.makeSalary + this.state.economic[1].expenditure.tipSalary + this.state.plus[1]}` : `${this.state.economic[1].expenditure.makeSalary + this.state.plus[1]}`}`
                                },
                                {
                                    value: `${(this.state.onTip) ? `${this.state.economic[2].expenditure.makeSalary + this.state.economic[2].expenditure.tipSalary + this.state.plus[2]}` : `${this.state.economic[2].expenditure.makeSalary + this.state.plus[2]}`}`
                                },
                                {
                                    value: `${(this.state.onTip) ? `${this.state.economic[3].expenditure.makeSalary + this.state.economic[3].expenditure.tipSalary + this.state.plus[3]}` : `${this.state.economic[3].expenditure.makeSalary + this.state.plus[3]}`}`
                                },
                                {
                                    value: `${(this.state.onTip) ? `${this.state.economic[4].expenditure.makeSalary + this.state.economic[4].expenditure.tipSalary + this.state.plus[4]}` : `${this.state.economic[4].expenditure.makeSalary + this.state.plus[4]}`}`
                                },
                                {
                                    value: `${(this.state.onTip) ? `${this.state.economic[5].expenditure.makeSalary + this.state.economic[5].expenditure.tipSalary + this.state.plus[5]}` : `${this.state.economic[5].expenditure.makeSalary + this.state.plus[5]}`}`
                                },
                                {
                                    value: `${(this.state.onTip) ? `${this.state.economic[6].expenditure.makeSalary + this.state.economic[6].expenditure.tipSalary + this.state.plus[6]}` : `${this.state.economic[6].expenditure.makeSalary + this.state.plus[6]}`}`
                                },
                                {
                                    value: `${(this.state.onTip) ? `${this.state.economic[7].expenditure.makeSalary + this.state.economic[7].expenditure.tipSalary + this.state.plus[7]}` : `${this.state.economic[7].expenditure.makeSalary + this.state.plus[7]}`}`
                                },
                                {
                                    value: `${(this.state.onTip) ? `${this.state.economic[8].expenditure.makeSalary + this.state.economic[8].expenditure.tipSalary + this.state.plus[8]}` : `${this.state.economic[8].expenditure.makeSalary + this.state.plus[8]}`}`
                                },
                                {
                                    value: `${(this.state.onTip) ? `${this.state.economic[9].expenditure.makeSalary + this.state.economic[9].expenditure.tipSalary + this.state.plus[9]}` : `${this.state.economic[9].expenditure.makeSalary + this.state.plus[9]}`}`
                                },
                                {
                                    value: `${(this.state.onTip) ? `${this.state.economic[10].expenditure.makeSalary + this.state.economic[10].expenditure.tipSalary + this.state.plus[10]}` : `${this.state.economic[10].expenditure.makeSalary + this.state.plus[10]}`}`
                                },
                                {
                                    value: `${(this.state.onTip) ? `${this.state.economic[11].expenditure.makeSalary + this.state.economic[11].expenditure.tipSalary + this.state.plus[11]}` : `${this.state.economic[11].expenditure.makeSalary + this.state.plus[11]}`}`
                                }
                            ]
                        }
                    ]
                }
            })
        }
    }

    setTip() {
        if (this.state.onTip) {
            this.setState({onTip: false})
        } else this.setState({onTip: true})
    }

    render() {
        const {isFetched} = this.state;
        // console.log(this.state);
        if (!isFetched) return null;
        return (
            <>
                <DemoNavbar/>
                <main className="profile-page" ref="main">
                    <section className="section-profile-cover section-shaped my-0">
                        {/* Circles background */}
                        <div className="shape shape-style-1 shape-default alpha-4">
                            <span/>
                            <span/>
                            <span/>
                            <span/>
                            <span/>
                            <span/>
                            <span/>
                        </div>
                        <br/><br/><br/><br/><br/><br/><br/><br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <h2 className="text-center text-white">Chart showing HueNails revenue and expenditure in</h2>
                        <h2 className="text-center text-white">2019</h2>
                        {/* SVG separator */}
                        <div className="separator separator-bottom separator-skew">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                preserveAspectRatio="none"
                                version="1.1"
                                viewBox="0 0 2560 100"
                                x="0"
                                y="0"
                            >
                                <polygon
                                    className="fill-white"
                                    points="250 0 2560 100 0 100"
                                />
                            </svg>
                        </div>
                    </section>
                    <div type="button" className="bg-secondary text-info btn btn-info ml-lg-5"
                         onClick={() => {
                             this.setTip()
                         }}>Tip: {`${(this.state.onTip) ? "ON" : "OFF"}`}
                    </div>
                    <div className="bg-secondary container-fluid mb-5 mt-150">
                        <ReactFusioncharts
                            type="scrollcolumn2d"
                            width="100%"
                            height="100%"
                            dataFormat="JSON"
                            dataSource={this.state.dataSource}
                        />
                    </div>
                </main>
                <SimpleFooter/>
            </>
        );
    }
}