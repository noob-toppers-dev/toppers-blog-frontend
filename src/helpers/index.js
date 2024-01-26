import axiosInstance from '../utils/axios/axios-interceptor';

// upload image file

export const uploadPicture = async (formData) => {
    try {
        const resp = await axiosInstance.post("file-upload", formData);
        console.log(resp.data, "resssss")
        return resp.data;
    } catch (error) {
        throw new Error("Image upload failed");
    }
};



