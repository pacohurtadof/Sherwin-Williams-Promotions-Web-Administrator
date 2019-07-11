import React, { Component } from 'react';

//import { connect } from 'react-redux';
//import { bindActionCreators } from 'redux';

class content extends Component {
    render() {
        return (
            <div>
                {this.props.children}
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="header-body">
                                <div className="row align-items-end">
                                    <div className="col">
                                        <h6 className="header-pretitle">
                                            Promotions
                                    </h6>
                                        <h1 className="header-title">
                                            Web Administrator
                                    </h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-8">
                            {this.props.content}
                        </div>
                        <div className="col-4">
                            <div className="card">
                                <div className="card-header">
                                    <div className="row align-items-center">
                                        <div className="col">
                                            <h4 className="card-header-title">
                                                Simulator
                                        </h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    {this.props.simulator}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

/*
const mapStateToProps = state => {
    
    return {
         cotyComponent: state.coty.coty.cotyModel,
         couponComponent: state.cupon.coupon
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(cotyActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(content);
*/
export default content;