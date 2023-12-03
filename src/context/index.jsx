import { createContext, useEffect, useState } from "react";
import { useGetAllBlogs } from "../query-hooks/blogs/hooks";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ email: '', name: '' });
    const [themeMode, setThemeMode] = useState(true);
    const { data: blogData, isLoading: blogLoading } = useGetAllBlogs();
    const [cardActionModal, setCardActionModal] = useState(null);
    const [filterBlogs, setFilterBlogs] = useState({ categories: [] });


    // update filter category

    const handleFilterBlog = (updatedFilters) => {
        setFilterBlogs(updatedFilters);
    };

    const handleCardAction = (id) => {
        setCardActionModal(id);
    }
    const handleCardCloseAction = () => {
        setCardActionModal(false);
    }

    const handleThemeMode = () => {
        setThemeMode((preveMode) => !preveMode)
    }
    const contextValue = {
        auth,
        handleCardAction,
        handleCardCloseAction,
        cardActionModal,
        setAuth,
        blogData,
        blogLoading,
        handleThemeMode,
        themeMode,
        handleFilterBlog,
        filterBlogs

    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider