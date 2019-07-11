import * as types from './action-types'

export const addSlider = (slider) => ({type: types.ADD_SLIDER, payload: slider})
export const addDynamicElement = (element) => ({type: types.ADD_DYNAMIC_ELEMENT, payload: element})

export const createAndroidData = (data) => ({type: types.CREATE_ANDROID_DATA, payload: data})
export const createIosData = (data) => ({type: types.CREATE_IOS_DATA, payload: data})

export const newHeaderElement = () => ({type: types.NEW_HEADER_ELEMENT, payload: null})

export const newTextElement = () => ({type: types.NEW_TEXT_ELEMENT, payload: null})
export const addTextElement = (text) => ({type: types.ADD_TEXT_ELEMENT, payload: text})
export const addHeaderElement = (header) => ({type: types.ADD_HEADER_ELEMENT, payload: header})

export const newBarcodeElement = () => ({type: types.NEW_BARCODE_ELEMENT, payload: null})
export const newButtonElement = () => ({type: types.NEW_BUTTON_ELEMENT, payload: null})

export const updateImageUrls = (images)=> ({type: types.UPDATE_IMAGE_URLS, payload: images})
export const newImageElement= ()=> ({type: types.NEW_IMAGE_ELEMENT, payload: null})


export const clearStore = () => ({type: types.CLEAR_STORE, payload: null})
export const clearPromoStore = () => ({type: types.CLEAR_PROMO_STORE, payload: null})

export const createData = (data) => {
    let iosData =  {
        sliderType: {},
        dynamicsElements: []
    }

    let androidData = {
        sliderType: {},
        dynamicsElements: []
    }

    iosData.sliderType = data.sliderType
    androidData.sliderType = data.sliderType
 
    /*
    TODO
     Separar las imagenes para android y ios en su data
    */ 

    let androidImages = {}
    let iosImages = {}

    data.dynamicsElements.forEach(element => {
        switch(element.tipe){
            case 'headerModel':{
                break;
            }
            default:{
                iosData.dynamicsElements.push(element)
            }
        }
    })


    return (dispatch) => {
       dispatch({ type: types.CREATE_IOS_DATA, payload:iosData });
       dispatch({ type: types.CREATE_ANDROID_DATA, payload:androidData });
    }
}

function _getIosImages(){
    
}