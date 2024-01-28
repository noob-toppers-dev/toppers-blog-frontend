import { useMutation, useQuery, useQueryClient } from "react-query";
import { forgetPasswordMutation, getUserProfile } from "../api";

export const useForgetPassword = () => {
    return useMutation(forgetPasswordMutation, {
        onSuccess: (data) => {
            console.log(data, "mute data")
        }
    })
}
export const useGetUserProfile = (userId) => {
    console.log(userId, "hook")
    const queryClient = useQueryClient();
    return useQuery(['user', userId], () => getUserProfile(userId), {
        onSuccess: () => {
            queryClient.invalidateQueries('get-all-blog')
        }
    })
}