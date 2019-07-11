import React, { Component } from 'react'

import { newHeaderElement, newBarcodeElement, clearStore, newImageElement, newButtonElement, newTextElement } from '../../actions/promotions/actions'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import DynamicElementSelector from './dynamic-element-selector'
import DynamicElementHeader from './dynamic-element-header'
import DynamicElementText from './dynamic-element-text-model'

import DynamicElementBarcode from './dynamic-element-barcode'

import DynamicElementImageModel from './dynamic-element-image-model'

import DynamicElementButton from './dynamic-element-button'



class DynamicElementContainer extends Component {
    state = {
        selectedElement: ''
    }

    handleSelectElement = (selectedElement) => {
        this.props.actions.clearStore()

        switch (selectedElement) {
            case 'HeaderModel': {
                this.props.actions.newHeaderElement()
                break
            }

            case 'TextModel':{
                this.props.actions.newTextElement()
            }

            case 'BarcodeModel': {
                this.props.actions.newBarcodeElement()
                break
            }

            case 'ImageModel': {
                this.props.actions.newImageElement()
            }

            case 'ButtonModel': {
                this.props.actions.newButtonElement()

                break
            }
        }

        this.setState({
            ...this.state,
            selectedElement: selectedElement
        })
    }

    handleElementCreated = () => {
        this.setState({
            ...this.state,
            selectedElement: ''
        })
        this.props.actions.clearStore()
    }

    render() {
        return (
            <div>
                {this.props.children}
                <div className="mx-auto subtitle">
                    <h5 className="card-subtitle mb-2 text-muted">Promotion details</h5>
                </div>
                <div className="mt-4 mb-4">
                    <DynamicElementSelector onSelectElement={this.handleSelectElement} />
                </div>

                {this.state.selectedElement === "HeaderModel" && (
                    <DynamicElementHeader handleElementCreated={this.handleElementCreated} promotionType={this.props.promotionType} />
                )}

                {this.state.selectedElement === "BarcodeModel" && (
                    <DynamicElementBarcode handleElementCreated={this.handleElementCreated} promotionType={this.props.promotionType} />
                )}

                {this.state.selectedElement === "ImageModel" && (
                    <DynamicElementImageModel handleElementCreated={this.handleElementCreated} promotionType={this.props.promotionType} />

                )}    
                {this.state.selectedElement === "ButtonModel" && (
                    <DynamicElementButton handleElementCreated={this.handleElementCreated} promotionType={this.props.promotionType} />

                )}
                {this.state.selectedElement === "TextModel" && (
                    <DynamicElementText handleElementCreated={this.handleElementCreated}  />
                )}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {


        actions: bindActionCreators({ newHeaderElement, newBarcodeElement, clearStore, newImageElement, newButtonElement, newTextElement }, dispatch)

    }
}

export default connect(null, mapDispatchToProps)(DynamicElementContainer)