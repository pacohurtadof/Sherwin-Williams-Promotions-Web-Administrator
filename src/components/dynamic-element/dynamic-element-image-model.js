import React, { Component } from 'react'
import UploadImage from '../common/upload-image/upload-image'
import { addDynamicElement, updateImageUrls } from '../../actions/promotions/actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Field, reduxForm } from 'redux-form'

class DynamicElementImageModel extends Component {
    state = {
        valid: false
    }

    isValid = (valid) => {
        this.setState({
            ...this.state,
            valid: valid
        })
    }

    handleSave = (values) => {
        this.props.actions.addDynamicElement({
            aspectRatio: values.aspectRatio,
            imagesUrls: this.props.imageUrl,
            type:'ImageModel'
        })
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
        const { handleSubmit } = this.props;
        return (
            <div>
                <form onSubmit={handleSubmit(this.handleSave)}>
                    <div className="form-row">
                        <label><strong>Aspect Ratio</strong></label>
                    </div>
                    <div className="form-row form-group">
                        <Field className="form-control col-3" name="aspectRatio" component="select">
                            <option value="" hidden>Select language</option>
                            <option value="16:9">16:9</option>
                            <option value="1:1">1:1</option>
                        </Field>
                    </div>

                    <UploadImage title="Header Element"
                        promotionType={this.props.promotionType}
                        isValid={this.isValid}
                        addImageUrl={this.handleAddImage}
                        handleDeleteImagenUrl={this.handleDeleteImage}
                        tableInfo={this.props.imageUrl}
                    />
                    <div className="row justify-content-end">
                        <button className="btn btn-primary" type="submit">Save</button>
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

const mapStateToProps = ({ promotions }) => {
    return {
        imageUrl: promotions.imageModel.imageUrl,
        imageModel: promotions.imageModel
    }
}

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators({ addDynamicElement, updateImageUrls }, dispatch)
    }
}


DynamicElementImageModel = reduxForm({
    form: 'imageModel'
})(DynamicElementImageModel)

export default connect(mapStateToProps, mapDispatchToProps)(DynamicElementImageModel)