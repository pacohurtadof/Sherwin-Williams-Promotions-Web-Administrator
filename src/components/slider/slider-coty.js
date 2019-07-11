import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import DatePicker from "react-datepicker";
import { formValueSelector } from 'redux-form'; 
import InformationTable from '../common/information-table';

import * as promotionsActions from '../../actions/promotions/actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import UploadImage from '../common/upload-image/upload-image'

const required = value => value ? undefined : 'Required';

class SliderCoty extends Component {

    constructor(props){
        super(props);
        this.state = {
            startDate:new Date(),
            endDate: new Date(),
            title:[],
            caption:[],
            active:false,
            programId:'',
            sliderType:'coty',
            color:{
                id:'',
                locatorNumber:'',
                number:''
            },
            imageUrl:[],
            videoUrl:[]
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
          startDate: date
        });
    };

    handleEndDateChange=(date)=> {
        this.setState({
          endDate: date
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
            programId: this.props.programId, 
            active: this.props.active|| false,
            color:{
                ...this.state.color,
                id: this.props.id,
                locatorNumber: this.props.locatorNumber,
                number: this.props.number
            }

        }, ()=> this.props.actions.addSlider(this.state));
        this.props.onSubmit();
    }

    handleAddImage = (size, imageUrl) => {
        let images = this.state.imageUrl;
        images[size] = imageUrl;
        this.setState({...this.state, imageUrl:images})
    }

    handleDeleteImage = (size) => {
        let images = this.state.imageUrl;
        delete images[size];
        this.setState({imageUrl: images });
    }

    isValid = (valid) => {
        this.setState({
            ...this.state,
            valid: valid
        });
    }

    render(){
        const { error } = this.props
        return (
            <div className="card">
                {this.props.children}
                <div className="card-body">
                    <form onSubmit={this.handleSubmit}>
                        
                        <div className="form-row col-12 form-group">
                            <div className="col-4">
                                <label><strong>Program Id</strong></label>
                                <Field className="form-control" name="programId" component="input" type="text" placeholder="Program Id" validate={required} />
                            </div>
                            <div className="col-6">
                                <div className="text-center">
                                    <label><strong> Active</strong></label>
                                </div>
                                <Field className="col-12 text-center" name="active" component="input" type="checkbox"/>
                            </div>
                        </div>
                        <div className="form-row col-12 form-group">
                            <div className="col-4">
                                <label><strong>Color Id</strong></label>
                                <Field className="col-10 form-control" name="id" component="input" type="text" placeholder="Color Id" validate={required} />
                            </div>
                            <div className="col-4 form-group" >
                                <label><strong >Locator number</strong></label>
                                <Field className="col-10 form-control" name="locatorNumber" component="input" type="text" placeholder=" Locator number"/>
                            </div>
                            <div className="col-4 form-group" >
                                <label><strong > Color number</strong></label>
                                <Field className="col-10 form-control" name="number" component="input" type="text" placeholder="Color number"/>
                            </div>
                        </div>
                        <div className="form-row col-12 form-group">
                            <div className="col-6">
                                <label className="col-12 text-left"><strong > Start Date</strong></label> 
                                <DatePicker
                                    className="form-control"
                                    selected={this.state.startDate}
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
                                    selected={this.state.endDate}
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
                                <Field className="form-control " name="title" component="input" type="text" placeholder="Coty title"/>
                            </div>
                            <div className="col-1">
                                <button id="title" onClick={()=>this.handleAddElementInTable('selectTitleLanguage', 'title')} className="btn btn-link">Add</button>
                            </div>
                        </div>

                        <InformationTable delete={(e)=>this.deleteFromInformationTable(e, "title")} info={this.state.title}/>

                        <div className="form-row col-12 form-group">
                            <label className="col-12 text-left"><strong >Caption</strong></label>
                            <div className="col-4">
                                <Field className="form-control col text-capitalize" name="selectCaptionLanguage" component="select">
                                    <option value="" hidden>Select language</option>
                                    {this.handleLanguagesOptions(this.state.caption)}
                                </Field>
                            </div>
                            <div className="col-7">
                                <Field className="form-control " name="caption" component="input" type="text" placeholder="Coty caption"/>
                            </div>
                            <div className="col-1">
                                    <button id="caption" onClick={()=>this.handleAddElementInTable('selectCaptionLanguage', 'caption')} className="btn btn-link">Add</button>
                            </div>
                        </div>
                        <InformationTable delete={(e)=>this.deleteFromInformationTable(e, "caption")} info={this.state.caption}/>

                        <div className="form-row col-12 form-group">
                            <label className="col-12 text-left"><strong >Video Url</strong></label>
                            <div className="col-4">
                                <Field className="form-control col text-capitalize" name="selectVideoLanguage" component="select">
                                    <option value="" hidden>Select language</option>
                                    {this.handleLanguagesOptions(this.state.videoUrl)}
                                </Field>
                            </div>
                            <div className="col-7">
                                <Field className="form-control " name="videoUrl" component="input" type="text" placeholder="Video Url"/>
                            </div>
                            <div className="col-1">
                                    <button id="videoUrl" onClick={()=>this.handleAddElementInTable('selectVideoLanguage','videoUrl')} className="btn btn-link">Add</button>
                            </div>
                        </div>
                        <InformationTable delete={(e)=>this.deleteFromInformationTable(e, "videoUrl")} info={this.state.videoUrl}/>

                        
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
    const {title, selectTitleLanguage, caption, selectCaptionLanguage, programId, active, id, locatorNumber, number, videoUrl, selectVideoLanguage} = 
    selector(
        state,
        'title',
        'selectTitleLanguage',
        'caption',
        'selectCaptionLanguage',
        'programId',
        'active',
        'id',
        'locatorNumber',
        'number',
        'videoUrl',
        'selectVideoLanguage'
    )

    return {
        title,
        selectTitleLanguage,
        caption,
        selectCaptionLanguage, 
        programId,
        active,
        id,
        locatorNumber,
        number,
        videoUrl,
        selectVideoLanguage
    }
    
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(promotionsActions, dispatch)
    };
};

SliderCoty = reduxForm({
    // a unique name for the form
    form: 'coty'
  })(SliderCoty)

const selector = formValueSelector('coty')

export default connect(mapStateToProps, mapDispatchToProps)(SliderCoty);