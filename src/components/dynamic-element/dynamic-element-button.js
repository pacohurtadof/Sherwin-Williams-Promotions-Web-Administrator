import React, { Component } from 'react'
import { Field, reduxForm, change } from 'redux-form'
import { formValueSelector } from 'redux-form';
import { addDynamicElement } from '../../actions/promotions/actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import InformationTable from '../common/information-table'

class DynamicElementButton extends Component {
    state = {
        valid: false,
        ctaUrl: {},
        title: {}
    }

    initialLanguages = {
        en: 'English',
        es: 'Spanish',
        fr: 'French',
        pt: 'Portuguese'
    }

    /*TODO: add validation to form
    isValid = (valid) => {
        this.setState({
            ...this.state,
            valid: valid
        })
    }*/

    _handleLanguages = (stateProperty) => {
        let languages = {}
        let usedLanguages = Object.entries(this.state[stateProperty]).map(([key, value]) => {
            return key
        })

        Object.entries(this.initialLanguages).forEach(([key, value]) => {
            if (!usedLanguages.includes(key)) {
                languages[key] = value
            }
        })

        return languages
    }

    handleAddElementInTable = (selectedLanguage, stateProperty) => {
        let elements = this.state[stateProperty]
        elements[this.props[selectedLanguage]] = this.props[stateProperty]

        this.setState({
            ...this.state,
            [stateProperty]: elements
        }, () => {
            this.props.dispatch(change('button', stateProperty, ''))
        })
    }

    deleteFromInformationTable = (idInTable, stateProperty) => {
        let newTitle = this.state[stateProperty];
        delete newTitle[idInTable];
        this.setState({ ...this.state, [stateProperty]: newTitle });
    }

    handleSubmit = (e) => {
        e.preventDefault()
        e.stopPropagation()
    }

    handleSave = () => {
        let buttonModel = {
            analyticsOnClickEvent: this.props.analyticsOnClickEvent,
            ctaUrl: this.state.ctaUrl,
            tag: this.props.tag,
            title: this.state.title,
            type: 'ButtonModel'
        }
        
        this.props.actions.addDynamicElement(buttonModel)
        this.props.handleElementCreated()
    }

    render() {
        return (
            <div>
                {this.props.children}
                <form onSubmit={this.handleSubmit}>
                    <div className="form-row col-12 form-group">
                        <div className="col-8">
                            <label><strong>analyticsOnClickEvent</strong></label>
                            <Field className="col-10 form-control" name="analyticsOnClickEvent" component="input" type="text" placeholder="analyticsOnClickEvent" />
                        </div>
                        <div className="col-4 form-group" >
                            <label><strong>tag</strong></label>
                            <Field className="col-10 form-control" name="tag" component="input" type="text" placeholder="tag" />
                        </div>
                    </div>
                    <div className="form-row col-12 form-group ">
                        <label className="col-12 text-left"><strong >ctaUrl</strong></label>
                        <div className="col-3">
                            <Field name="ctaUrlLanguage" className="form-control" component="select">
                                <option value="" hidden>Languaje</option>
                                {
                                    Object.entries(this._handleLanguages('ctaUrl')).map(([key, value]) => {
                                        return <option key={key} value={key.toString()}>{value}</option>
                                    })
                                }
                            </Field>
                        </div>
                        <div className="col-7">
                            <Field className="form-control " name="ctaUrl" component="input" type="text" placeholder="ctaUrl" />
                        </div>
                        <button onClick={() => { this.handleAddElementInTable('ctaUrlLanguage', 'ctaUrl') }} className="btn btn-link">Add</button>
                    </div>
                    <InformationTable delete={() => this.deleteFromInformationTable("ctaUrl")} info={this.state.ctaUrl} />
                    <div className="form-row col-12 form-group ">
                        <label className="col-12 text-left"><strong >Title</strong></label>
                        <div className="col-3">
                            <Field name="titleLanguage" className="form-control" component="select">
                                <option value="" hidden>Languaje</option>
                                {
                                    Object.entries(this._handleLanguages('title')).map(([key, value]) => {
                                        return <option key={key} value={key.toString()}>{value}</option>
                                    })
                                }
                            </Field>
                        </div>
                        <div className="col-7">
                            <Field className="form-control " name="title" component="input" type="text" placeholder="Coupon title" />
                        </div>
                        <button onClick={() => { this.handleAddElementInTable('titleLanguage', 'title') }} className="btn btn-link">Add</button>
                    </div>
                    <InformationTable delete={() => this.deleteFromInformationTable("title")} info={this.state.title} />
                    <div className="row justify-content-end">
                        <button className="btn btn-primary" type="button" onClick={this.handleSave}>Save</button>
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

const mapStateToProps = state => {
    const { titleLanguage, title, ctaUrlLanguage, ctaUrl, analyticsOnClickEvent, tag } =
        selector(
            state,
            'titleLanguage',
            'title',
            'ctaUrlLanguage',
            'ctaUrl',
            'analyticsOnClickEvent',
            'tag'
        )

    return {
        titleLanguage,
        title,
        ctaUrlLanguage,
        ctaUrl,
        analyticsOnClickEvent,
        tag
    }
}

DynamicElementButton = reduxForm({
    form: 'button'
})(DynamicElementButton)

const selector = formValueSelector('button')

export default connect(mapStateToProps, mapDispatchToProps)(DynamicElementButton)