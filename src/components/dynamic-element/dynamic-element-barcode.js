import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import DatePicker from "react-datepicker"
import { addDynamicElement } from '../../actions/promotions/actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class DynamicElementBarcode extends Component {
    state = {
        valid: false,
        offerEndDate: new Date(),
        offerStartDate: new Date(),
    }

    /*TODO: add validation to form
    isValid = (valid) => {
        this.setState({
            ...this.state,
            valid: valid
        })
    }*/

    handleStartDateChange = (date) => {
        this.setState({
            ...this.state,
            offerStartDate: date
        })
    }

    handleEndDateChange = (date) => {
        this.setState({
            ...this.state,
            offerEndDate: date
        })
    }

    handleSave = (values) => {
        let barcodeModel = {
            affiliateId: values.affiliateId,
            barcode: values.barcode,
            merchantId: values.merchantId,
            programId: values.programId,
            offerEndDate: this.state.offerEndDate,
            offerStartDate: this.state.offerStartDate,
            type: 'BarcodeModel'
        }

        this.props.actions.addDynamicElement(barcodeModel)
        this.props.handleElementCreated()
    }


    render() {
        const { handleSubmit } = this.props;

        return (
            <div>
                {this.props.children}
                <form onSubmit={handleSubmit(this.handleSave)} >
                    <div className="form-row col-12 form-group">
                        <div className="col-4">
                            <label><strong>affiliateId</strong></label>
                            <Field className="col-10 form-control" name="affiliateId" component="input" type="text" placeholder="affiliateId" />
                        </div>
                        <div className="col-4 form-group" >
                            <label><strong>merchantId</strong></label>
                            <Field className="col-10 form-control" name="merchantId" component="input" type="text" placeholder="merchantId" />
                        </div>
                        <div className="col-4 form-group" >
                            <label><strong>programId</strong></label>
                            <Field className="col-10 form-control" name="programId" component="input" type="text" placeholder="programId" />
                        </div>
                    </div>
                    <div className="form-row col-12 form-group">
                        <div className="col-6">
                            <label className="col-12 text-left"><strong > Start Date</strong></label>
                            <DatePicker
                                className="form-control"
                                selected={this.state.offerStartDate}
                                onChange={this.handleStartDateChange}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                dateFormat="MMMM d, yyyy h:mm aa"
                                timeCaption="time"
                            />
                        </div>
                        <div className="col-6 form-group">
                            <label className="col-12 text-left"><strong > End Date</strong></label>
                            <DatePicker
                                className="form-control"
                                selected={this.state.offerEndDate}
                                onChange={this.handleEndDateChange}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                dateFormat="MMMM d, yyyy h:mm aa"
                                timeCaption="time"
                            />
                        </div>
                        <div className="form-row form-group col-12">
                            <div className="col-12">
                                <label><strong>Barcode</strong></label>
                                <Field className="form-control" name="barcode" component="input" type="text" placeholder="barcode" />
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-end">
                        <button className="btn btn-primary" type="submit">Save</button>
                        {/*
                    TODO: add validation to form
                    disabled={!this.state.valid}>Save</button>
                    */}
                    </div>
                </form>
            </div>
        )
    }

}

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators({ addDynamicElement }, dispatch)
    }
}

DynamicElementBarcode = reduxForm({
    form: 'barcode'
})(DynamicElementBarcode)

export default connect(null, mapDispatchToProps)(DynamicElementBarcode)