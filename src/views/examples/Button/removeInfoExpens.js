import React from "react";
import axios from 'axios';

export default class removeInfoExpens extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isUpdated: false,
            expenditure: this.props.expenditure
        }
    }


    removeInfo = (month, index) => {
        console.log(index);
        if (window.confirm("Are you sure you want to delete?")) {
            let expenditure = this.state.expenditure;
            expenditure.plus.splice(index, 1);
            console.log(expenditure);
            axios.put(`https://5d2bff168c90070014971f65.mockapi.io/api/v1/economic/${this.props.month + 1}`, {expenditure})
                .then(res => {
                    axios.put(`https://5d2bff168c90070014971f65.mockapi.io/api/v1/economic/${this.props.month + 1}`, {expenditure})
                        .then(respon => {
                            console.log('---------', respon.data);
                            // this.setState({expenditure: res.data});
                            // this.props.expen(this.state.expenditure);
                            window.alert("OK: You has deleted successfully!");
                            // window.location.reload();
                        })
                });
            // console.log(this.state.expenditure);
        }
    };

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     if (this.state.isUpdated) {
    //         let expenditure = this.state.expenditure;
    //         console.log('-----', this.state);
    //         axios.put(`https://5d2bff168c90070014971f65.mockapi.io/api/v1/economic/${this.props.month + 1}`, {expenditure})
    //             .then(res => {
    //                 console.log(res.data);
    //                 this.setState({expenditure: res.data});
    //                 // this.props.expen(this.state.expenditure)
    //             });
    //         return(
    //             window.alert("OK: You has deleted successfully!")
    //         )
    //     }
    // }

    render() {
        let month = this.props.month;
        let index = this.props.index;
        return (
            <>
                <button type="button" className="bg-secondary text-danger btn btn-danger"
                        onClick={(e) => this.removeInfo(month, index)}>
                    X
                </button>
            </>
        );
    }
}
