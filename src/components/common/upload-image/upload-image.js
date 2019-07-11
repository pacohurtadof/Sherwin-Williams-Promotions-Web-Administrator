import React, { Component } from 'react'
import InformationTable from '../information-table'
import SelectImage from './select-image'

class UploadImage extends Component {
    state = {
        loading: false,
        size: ''
    }

    handleDelete = (key) => {
        this.setState({
            ...this.state,
            size: key
        })

        this.props.handleDeleteImagenUrl(key)
    }

    render() {
        return (
            <div>
                {this.props.children}
                <div className="form-row">
                    <label htmlFor="ctaText" className="form-label">
                        <strong>{this.props.title}</strong>
                    </label>
                </div>
                <SelectImage
                    promotionType={this.props.promotionType}
                    addImageUrl={this.props.addImageUrl}
                    isValid={this.props.isValid}
                    size={this.state.size}
                    />
                <InformationTable
                    info={this.props.tableInfo}
                    delete={this.handleDelete} />
            </div>
        )
    }
}

export default UploadImage