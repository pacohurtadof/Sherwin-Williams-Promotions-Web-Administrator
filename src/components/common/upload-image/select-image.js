import React, { Component } from 'react'
import * as is from 'is_js/is'
import bsCustomFileInput from 'bs-custom-file-input'
import { connect } from 'react-redux'
import { uploadImage, clearImageUrl } from '../../../actions/images/actions'

class SelectImage extends Component {
    constructor(props) {
        super(props)

        this.initialState = {
            size: '',
            file: '',
        }

        this.state = this.initialState

        this.sizes = [
            { 'key': '1x', 'size': '1x' },
            { 'key': '2x', 'size': '2x' },
            { 'key': '3x', 'size': '3x' },
            { 'key': 'hdpi', 'size': 'hdpi' },
            { 'key': 'mdpi', 'size': 'mdpi' },
            { 'key': 'xhdpi', 'size': 'xhdpi' },
            { 'key': 'xxhdpi', 'size': 'xxhdpi' },
            { 'key': 'xxxhdpi', 'size': 'xxxhdpi' },
        ]
    }

    componentDidMount() {
        bsCustomFileInput.init()
    }

    componentDidUpdate(prevProps, prevState) {
        /**
         * TRICKY
         * this validation is for reset the bsCustomFileInput, 
         * for some reason you have to destroy and init 
         * for making works again
         */
        if (is.empty(prevState.file) && is.empty(this.state.file) && is.empty(this.state.size)) {
            bsCustomFileInput.destroy()
            bsCustomFileInput.init()
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.imageUrl !== this.props.imageUrl) {
            this.handleUploading(nextProps.imageUrl)
        }

        /**
         * If a image is deleted, it receives the size of the image deleted
         * for add it again to the sizes array and then the array is
         * ordenered by key propety
         */
        if (is.not.empty(nextProps.size) && nextProps.size !== this.state.size) {
            this.sizes.push({ 'key': nextProps.size, 'size': nextProps.size })
            this.sizes.sort((obj1, obj2) => (obj1.key > obj2.key) ? 1 : ((obj2.key > obj1.key) ? -1 : 0))
        }
    }

    handleUploading = (imageUrl) => {
        if (is.not.empty(imageUrl) && is.not.empty(this.state.size)) {
            this.props.addImageUrl(this.state.size, imageUrl);
            this.props.clearImageUrl();
            this.sizes = this.sizes.filter((obj) => {
                return obj.size !== this.state.size
            })
            this.props.isValid(is.empty(this.sizes))
            this.setState(this.initialState)
        }
    }

    handleInputChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            [name]: value
        })
    }

    handleSeletedFile = (e) => {
        this.setState({
            ...this.state,
            file: e.target.files[0]
        })
    }

    handleAdd = (e) => {
        e.preventDefault()

        this.props.uploadImage(this.props.promotionType, this.state.file)
    }

    render() {
        return (
            <div>
                <div className="form-row">
                    <div className="form-group col-12 no-margin-bottom">
                        <div className="form-row test">
                            <div className="form-group col-sm-2 test2">
                                <select id="inputState" className="form-control" name="size" value={this.state.size}
                                    onChange={this.handleInputChange}>
                                    <option value="" required hidden>Size</option>
                                    {
                                        this.sizes.map((item) => {
                                            return <option key={item.key}
                                                value={item.key}>{item.size}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <div className="form-group  col-sm-9">
                                <div className="custom-file">
                                    <input type="file" className="custom-file-input " name="url"
                                        onChange={this.handleSeletedFile} />
                                    <label className="custom-file-label" htmlFor="customFile">
                                        Choose file
                                    </label>
                                </div>
                            </div>
                            <div className="form-group col-sm-1">
                                <button
                                    className={(this.props.uploading) ? 'hidden' : "btn btn-link add-button-navbar"}
                                    onClick={this.handleAdd}
                                    disabled={is.empty(this.state.size)}
                                >Add
                                </button>
                                <div className={(!this.props.uploading) ? 'hidden' : ''}>
                                    <i className="fas fa-sync fa-spin"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {this.props.children}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        uploading: state.images.uploading,
        imageUrl: state.images.imageUrl
    }
}

const mapDispatchToProps = dispatch => ({
    uploadImage: (type, image) => dispatch(uploadImage(type, image)),
    clearImageUrl: () => dispatch(clearImageUrl())
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectImage)