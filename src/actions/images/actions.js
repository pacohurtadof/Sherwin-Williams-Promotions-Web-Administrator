import * as types from './action-types';

export const clearImageUrl = () => ({ type: types.SET_IMAGE_URL, data: ''});
export const uploadImage = (promoType, image) => {
    
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        const storageRef = firebase.storage().ref();
        const metadata = {
            contentType: image.type
        };

        dispatch({type: types.UPLOADING});
        storageRef.child(promoType + "/" + image.name).put(image, metadata)
            .then(snapshot => snapshot.ref.getDownloadURL())
            .then((url) => {
                // upload the image to firebase
                dispatch({ type: types.SET_IMAGE_URL, data: url });
            })
            .catch(error => {
                dispatch({ type: types.UPLOADING_FAILURE, data: error });
            });
    }
};