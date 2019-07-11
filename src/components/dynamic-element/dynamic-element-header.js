import React, { Component } from 'react'
import UploadImage from '../common/upload-image/upload-image'
import { addDynamicElement, updateImageUrls } from '../../actions/promotions/actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class DynamicElementHeader extends Component {
    state = {
        valid: false
    }

    isValid = (valid) => {
        this.setState({
            ...this.state,
            valid: valid
        })
    }

    handleSave = () => {
        this.props.actions.addDynamicElement(this.props.headerModel)
        this.props.handleElementCreated()
    }

    handleAddImage = (size, imageUrl) => {
        let images = this.props.imageUrl

        images[size] = imageUrl
        this.props.actions.updateImageUrls(images)
    }

    handleDeleteImage = (size) => {
        let images = this.props.imageUrl
        delete images[size]

        this.props.actions.updateImageUrls(images)
    }

    render() {
        return (
            <div>
                <UploadImage title="Header Element"
                    promotionType={this.props.promotionType}
                    isValid={this.isValid}
                    addImageUrl={this.handleAddImage}
                    handleDeleteImagenUrl={this.handleDeleteImage}
                    tableInfo={this.props.imageUrl}
                />
                <div className="row justify-content-end">

                    <button className="btn btn-primary" onClick={this.handleSave}>Save</button>
                    {/*
                    TODO: add validation to form
                    disabled={!this.state.valid}>Save</button>
                    */}

                </div>
            </div>
        )
    }

}

const mapStateToProps = ({ promotions }) => {
    return {
        imageUrl: promotions.headerModel.imageUrl,
        headerModel: promotions.headerModel
    }
}

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators({ addDynamicElement, updateImageUrls }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DynamicElementHeader)