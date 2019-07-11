import React from 'react';
import { Field, reduxForm } from 'redux-form';

const options=["coty","promotion","coupon"];

let SliderPromotionTypeSelector = (props) => {
    const { handleSubmit } = props
        return (
            
            <form onSubmit={handleSubmit} className="w-100 p-3">
                {props.children}
                <div className="form-row">
                    <label className="col-3 "><strong>Promotion Type</strong></label>
                    <div className="col-5">
                        <Field disabled={props.disabled} className="form-control col text-capitalize" name="selectedPromotionType" component="select">
                            <option required value="" hidden>Select type of promotion</option>
                            { Object.entries(options).map(([key,value])=>{
                                return <option className="text-capitalize" key={key} value={value}>{value}</option>;
                                })
                            }      
                        </Field>
                    </div>
                    
                    <button hidden={props.disabled} type="submit" className="btn btn-link col-1">New</button>
                    <div className="col-3 text-right">
                        <button hidden={!props.disabled} className="btn btn-link" onClick={props.handleFinish}>Finish</button>
                    </div>
                </div>
            </form>
        )
};

SliderPromotionTypeSelector = reduxForm({
    // a unique name for the form
    form: 'selector'
  })(SliderPromotionTypeSelector)
  

export default SliderPromotionTypeSelector;