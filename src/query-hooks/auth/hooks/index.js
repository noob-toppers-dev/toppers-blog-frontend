import { useMutation, useQueryClient } from "react-query";
import { forgetPasswordMutation } from "../api";

export const useForgetPassword = () => {
    return useMutation(forgetPasswordMutation, {
        onSuccess: (data) => {
            console.log(data, "mute data")
        }
    })
}