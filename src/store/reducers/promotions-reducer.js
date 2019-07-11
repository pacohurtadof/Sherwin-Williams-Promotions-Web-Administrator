import * as types from '../../actions/promotions/action-types';


const initialState = {
    sliderType: "",
    dynamicsElements: []
}

const promotionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_SLIDER:
            return {
                ...state,
                sliderType: action.payload
            }
        case types.ADD_DYNAMIC_ELEMENT: {
            return {
                ...state,
                dynamicsElements: [
                    ...state.dynamicsElements,
                    action.payload
                ]
            }
        }
        case types.NEW_HEADER_ELEMENT: {
            return {
                ...state,
                headerModel: {
                    type: 'HeaderModel',
                    imageUrl: {}
                }
            }
        }

        case types.NEW_TEXT_ELEMENT: {
            return {
                ...state,
                TextModel: {
                    type: 'TextModel',
                    textStyle: '',
                    text:{}
                }
            }
        }
        case types.ADD_TEXT_ELEMENT: {
            return {
                ...state,
                dynamicsElements: [
                    ...state.dynamicsElements,
                    action.payload
                ]
            }
        }

        case types.NEW_IMAGE_ELEMENT: {
            return {
                ...state,
                imageModel: {
                    type: 'ImageModel',
                    imageUrl: {},
                    aspectRatio:''
                }
            }
        }
        case types.NEW_BARCODE_ELEMENT: {
            return {
                ...state,
                barcodeModel: {
                    affiliateId: '',
                    barcode: '',
                    merchantId: '',
                    offerEndDate: '',
                    offerStartDate: '',
                    programId: '',
                    type: 'BarcodeModel'
                }
            }
        }
        case types.NEW_BUTTON_ELEMENT: {
            return {
                ...state,
                buttonModel: {
                    analyticsOnClickEvent: 'offers_find_store',
                    ctaUrl: {},
                    tag: 0,
                    title: {},
                    type: 'ButtonModel'
                }
            }
        }


        case types.CLEAR_STORE: {
            let newState = initialState;

            newState.sliderType = state.sliderType
            newState.dynamicsElements = state.dynamicsElements

            return { ...newState }
        }
        case types.CLEAR_PROMO_STORE: {
            return { ...initialState }
        }
       
        default:
            return { ...state };
    }
};

export default promotionsReducer;