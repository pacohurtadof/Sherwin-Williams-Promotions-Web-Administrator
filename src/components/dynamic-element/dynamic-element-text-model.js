import React, { Component } from 'react'
import { addTextElement, updateImageUrls } from '../../actions/promotions/actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { formValueSelector } from 'redux-form'
import InformationTable from '../common/information-table' 

class DynamicElementText extends Component {
    state = {
        valid: false,
        text:[]
    }

    initialLanguages={
        en: 'English',
        es: 'Spanish',
        fr: 'French',
        pt: 'Portuguese'
    }
    usedLanguages=''

    handleAddElementInTable=(e,selectLanguage, stateProperty)=> {
        e.preventDefault();
        let newElement = this.state[stateProperty]
        newElement[this.props.selectTextLanguage] = this.props.text;
        this.setState({...this.state, valid: true})
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

    handleSave=(e)=>{ 
        e.preventDefault();
        this.setState({...this.state, textStyle: this.props.textStyle},()=>{
            this.props.actions.addTextElement({
                type: 'TextModel',
                textStyle: this.props.textStyle,
                text:this.state.text
            })
        });

        this.props.handleElementCreated();
        
    };



    render() {
        return (
            <div>
                <form onSubmit={this.handleSave}>
                    <label><strong>Text</strong></label>

                    <div className="form-row">
                        <div className="col-4 form-group">    
                            <Field className="form-control col text-capitalize" name="textStyle" component="select">
                                <option value="" hidden>Select Text Style</option>
                                <option value="largeTitle" >Large title</option>
                                <option value="title1" >Title 1</option>
                                <option value="title2" >Title 2</option>
                                <option value="title3" >Title 3</option>
                                <option value="headline" >Headline</option>
                                <option value="body" >Body</option>
                                <option value="subhead" >Subhead</option>
                                <option value="FootnoteBold" >Footnote Bold</option>
                                <option value="footnote" >Footnote</option>
                                <option value="callout" >Callout</option>
                                <option value="caption1" >Caption 1</option>
                                <option value="caption2" >Caption 2</option>
                            </Field>
                        </div>
                    </div>

                    <div className="form-row ">
                            <label className="col-12 text-left"><strong >Title</strong></label>
                            <div className="col-4 form-group">
                                
                                <Field className="form-control col text-capitalize" name="selectTextLanguage" component="select">
                                    <option value="" hidden>Select language</option>
                                    {this.handleLanguagesOptions(this.state.text)}
                                </Field>
                            </div>
                            <div className="col-7">
                                <Field className="form-control " name="text" component="input" type="text" placeholder="Text"/>
                            </div>
                            <button id="text" onClick={(e)=>this.handleAddElementInTable(e,'selectTextLanguage', 'text')} className="btn btn-link col-1">Add</button>
                    </div>
                    <InformationTable delete={(e)=>this.deleteFromInformationTable(e, 'text')} info={this.state.text}/>
                    <div className="row justify-content-end">
                        <button className="btn btn-primary" type="submit" onClick={this.handleSave} disabled={!this.state.valid}>Save</button>
                    </div>
                </form>
                

            </div>
        )
    }

}


const mapStateToProps = (state) => {
    if(state.form.text){
        if(state.form.text.values){
            return{
                text: state.form.text.values.text,
                selectTextLanguage: state.form.text.values.selectTextLanguage,
                textStyle: state.form.text.values.textStyle,
            } 
        }
        return {}
        
    }
    return {}
}

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators({ addTextElement, updateImageUrls }, dispatch)
    }
}

DynamicElementText = reduxForm({
    // a unique name for the form
    form: 'text'
  })(DynamicElementText)

export default connect(mapStateToProps, mapDispatchToProps)(DynamicElementText)