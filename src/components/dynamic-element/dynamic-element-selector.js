import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { required } from '../common/form-validations';

const typeElements = {
    'HeaderModel': 'Header',
    'TitleModel': 'Title',
    'TextModel': 'Text',
    'BarcodeModel': 'Barcode',
    'ButtonModel': 'Button',
    'ImageModel': 'ImageModel'
}

const selectField = ({ input, meta: { touched, error, warning } }) => (
    <div>
        <select {...input} className="form-control">
            <option value="" required hidden>Select type</option>
            {
                Object.entries(typeElements).map(([key, value]) => {
                    return <option key={key} value={key.toString()}>{value}</option>
                })
            }
        </select>
        {touched && error &&
            <span className="error">{error}</span>}
    </div>
)

const DynamicElementSelector = props => {
    const { handleSubmit, onSelectElement } = props
    const submit = (values) => {
        onSelectElement(values.selectedElement);
    }

    return (
        <div>
            <form onSubmit={handleSubmit(submit)} >
                <div className="form-row">
                    <label className="col-3 col-form-label"><strong>New element</strong></label>
                    <div className="col-5">
                        <Field name="selectedElement" type="select"
                            component={selectField}
                            validate={required} />
                    </div>
                    <div className="col-4">
                        <button type="submit" className="btn btn-link">add</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default reduxForm({
    form: 'dynamicElementSelector'
})(DynamicElementSelector)