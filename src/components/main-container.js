import React, { Component } from 'react';
import SliderContainer from './slider/slider-container';
import DynamicElementsContainer from './dynamic-element/dynamic-element-container';
import SliderPromotionTypeSelector from './slider/slider-promotion-type-selector';
import * as promotionsActions from '../actions/promotions/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class MainContainer extends Component {

    state={
        selectedPromotionType:'',
        activeDynamics: false
    }

    handleSelectedPromotionType=(values)=>{
        this.setState({
            ...this.state,
            selectedPromotionType: values.selectedPromotionType
        });
        this.props.actions.clearPromoStore();
    }

    handleSubmit=()=>{
        this.setState({
            ...this.state,
            activeDynamics: true});
    }

    handleFinish = () =>{
       this.props.actions.createData(this.props.promotions)
    }
    
    render() {
        return (
            <div>
                {this.props.children}
                <div className="card">
                    <div className="card-header" >
                        <SliderPromotionTypeSelector onSubmit={this.handleSelectedPromotionType} disabled={this.state.activeDynamics} handleFinish={this.handleFinish}/>
                    </div>
                    <div className="card-body ">
                        <div className="container">
                            <div hidden={this.state.activeDynamics}>
                                <SliderContainer selectedPromotionType={this.state.selectedPromotionType} onSubmit={this.handleSubmit} />
                            </div>
                           <div hidden={!this.state.activeDynamics}>
                                <DynamicElementsContainer promotionType={this.state.selectedPromotionType}/>
                           </div>     
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(promotionsActions, dispatch)
    };
};

const mapStateToProps = state => {
    return {
        promotions: state.promotions
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);