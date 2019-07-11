import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import DatePicker from "react-datepicker";
import { formValueSelector } from 'redux-form'; 
import InformationTable from '../common/information-table';
import { required } from '../common/form-validations';

import * as promotionsActions from '../../actions/promotions/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UploadImage from '../common/upload-image/upload-image';


class SliderCoupon extends Component {

    constructor(props){
        super(props);
        this.state = {
            startDateAndTime:new Date(),
            endDateAndTime: new Date(),
            analyticsOnClickEvent:'',
            title:[],
            caption:[],
            active:false,
            sliderType:'coupon',
            imageUrl:[]
        }

        this.initialLanguages={
            en: 'English',
            es: 'Spanish',
            fr: 'French',
            pt: 'Portuguese'
        };
        this.usedLanguages='';
    };

    handleStartDateChange=(date)=> {
        this.setState({
            startDateAndTime: date
        });
    };

    handleEndDateChange=(date)=> {
        this.setState({
            endDateAndTime: date
        });
    };

    handleAddElementInTable=(selectLanguage, stateProperty)=> {
        let newElement = this.state[stateProperty]
        newElement[this.props[selectLanguage]] = this.props[stateProperty];
        this.setState({...this.state})
    };

    handleLanguagesOptions=(takenElements)=>{ 
        
         this.usedLanguages= Object.entries(takenElements).map(([key,value])=>{
             return key
         });
         return Object.entries(this.initialLanguages).map(([key,value])=>{
              if(!this.usedLanguages.includes(key)){
                  return <option key={key} value={key}>{value}</option>;
              }
          
             return null;
         })
     };

    deleteFromInformationTable=(idInTable, stateProperty)=>{ 
        let newTitle = this.state[stateProperty];
        delete newTitle[idInTable];
        this.setState({...this.state, [stateProperty]: newTitle});
    };

    handleSubmit=(e)=>{
        e.preventDefault();
        this.setState({
            ...this.state,
            active: this.props.active|| false,
            analyticsOnClickEvent: this.props.analyticsOnClickEvent
        
        },()=> this.props.actions.addSlider(this.state));
        this.props.onSubmit();
    }

    handleAddImage = (size, imageUrl) => {
        let images = this.state.imageUrl
        images[size] = imageUrl
        this.setState({...this.state, imageUrl:[...this.state.imageUrl, {images}]})
    }

    handleDeleteImage = (size) => {
        let images = this.state.imageUrl
        delete images[size]
        this.props.actions.updateImageUrls(images)
    }

    isValid = (valid) => {
        this.setState({
            ...this.state,
            valid: valid
        })
    }

    render(){

        const { error, touched } = this.props
        return (
            <div className="card">
                {this.props.children}
                <div className="card-body">
                    <form onSubmit={this.handleSubmit}>
                        
                        <div className="form-row col-12 form-group">
                            <div className="col-4">
                                <label><strong>Analytics On Click Event</strong></label>
                                <Field  className="form-control" name="analyticsOnClickEvent" component="input" type="text" placeholder="analytics on click event" validate={required} >{touched && error &&
                            <span className="error">{error}</span>}</Field>
                            </div>
                            <div className="col-6">
                                <div className="text-center">
                                    <label><strong> Active</strong></label>
                                </div>
                                <Field className="col-12 text-center" name="active" component="input" type="checkbox"/>
                                
                                
                            </div>
                        </div>
                        
                        <div className="form-row col-12 form-group">
                            <div className="col-6">
                                <label className="col-12 text-left"><strong >Start Date</strong></label> 
                                <DatePicker
                                    className="form-control"
                                    selected={this.state.startDateAndTime}
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
                                    selected={this.state.endDateAndTime}
                                    onChange={this.handleEndDateChange}
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    timeIntervals={15}
                                    dateFormat="MMMM d, yyyy h:mm aa"
                                    timeCaption="time"
                                />
                            </div>
                        </div>
                        <div className="form-row col-12 form-group ">
                            <label className="col-12 text-left"><strong >Title</strong></label>
                            <div className="col-4">
                                
                                <Field className="form-control col text-capitalize" name="selectTitleLanguage" component="select">
                                    <option value="" hidden>Select language</option>
                                    {this.handleLanguagesOptions(this.state.title)}
                                </Field>
                            </div>
                            <div className="col-7">
                                <Field className="form-control " name="title" component="input" type="text" placeholder="Coupon title"/>
                            </div>
                            <button id="title" onClick={()=>this.handleAddElementInTable('selectTitleLanguage', 'title')} className="btn btn-link">Add</button>
                        </div>

                        <InformationTable delete={(e)=>this.deleteFromInformationTable(e,"title")} info={this.state.title}/>

                        <div className="form-row col-12 form-group">
                            <label className="col-12 text-left"><strong >Caption</strong></label>
                            <div className="col-4">
                                <Field className="form-control col text-capitalize" name="selectCaptionLanguage" component="select">
                                    <option value="" hidden>Select language</option>
                                    {this.handleLanguagesOptions(this.state.caption)}
                                </Field>
                            </div>
                            <div className="col-7">
                                <Field className="form-control " name="caption" component="input" type="text" placeholder="Coupon caption"/>
                            </div>
                            <button id="caption" onClick={()=>this.handleAddElementInTable('selectCaptionLanguage', 'caption')} className="btn btn-link">Add</button>
                        </div>
                        <InformationTable delete={(e)=>this.deleteFromInformationTable(e, "caption")} info={this.state.caption}/>

                        <UploadImage
                            tableInfo= {this.state.imageUrl}
                            addImageUrl={this.handleAddImage}
                            title="Header Element"
                            isValid={this.isValid}
                            handleDeleteImagenUrl={this.handleDeleteImage}
                        />

                        <div className="form-row justify-content-end">
                            <button type="submit" className="btn btn-primary col-2" onClick={this.handleSubmit}>Next</button>
                        </div>
                    </form>
                    
                </div>
                
            </div>
        )
};
}


const mapStateToProps = state => {
    const {title, selectTitleLanguage, caption, selectCaptionLanguage, analyticsOnClickEvent, active, id, locatorNumber, number} = 
    selector(
        state,
        'title',
        'selectTitleLanguage',
        'caption',
        'selectCaptionLanguage',
        'analyticsOnClickEvent',
        'active',
        'id',
        'locatorNumber',
        'number'
    )

    return {
        title,
        selectTitleLanguage,
        caption,
        selectCaptionLanguage, 
        analyticsOnClickEvent,
        active,
        id,
        locatorNumber,
        number
    }
    
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(promotionsActions, dispatch)
    };
};

SliderCoupon = reduxForm({
    // a unique name for the form
    form: 'coupon'
  })(SliderCoupon)

const selector = formValueSelector('coupon')





export default connect(mapStateToProps, mapDispatchToProps)(SliderCoupon);