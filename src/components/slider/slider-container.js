import React, { Component } from 'react';
import SliderCoty from './slider-coty';
import SliderCoupon from './slider-coupon';
import SliderPromo from './slider-promo';
import "react-datepicker/dist/react-datepicker.css";

class SliderContainer extends Component {


    render() {
        return (
            <div>
                {this.props.children}
                <div>
                    <div hidden={this.props.selectedPromotionType !== "coty"}>
                        <SliderCoty onSubmit={this.props.onSubmit}></SliderCoty>
                    </div>
                    <div  hidden={this.props.selectedPromotionType !== "coupon"}>
                        <SliderCoupon onSubmit={this.props.onSubmit}></SliderCoupon>
                    </div>
                    <div  hidden={this.props.selectedPromotionType !== "promotion"}>
                        <SliderPromo onSubmit={this.props.onSubmit}></SliderPromo>
                    </div> 
                </div>
            </div>
        );
    }
}



export default SliderContainer;