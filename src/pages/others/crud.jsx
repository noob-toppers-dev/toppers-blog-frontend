import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';

const Crud = () => {
    const [blogs, setBlogs] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const response = await axios.get('http://localhost:4000/blogs');
            console.log(response.data.blogs, "data")
            setBlogs(response.data);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
    };

    const handleAddBlog = async () => {
        try {
            const newBlog = {
                title,
                description,
                image,
            };

            await axios.post('http://localhost:4000/blogs', { blogs: [...blogs, newBlog] });
            fetchBlogs();
            clearForm();
        } catch (error) {
            console.error('Error adding blog:', error);
        }
    };

    const handleEditBlog = async (id) => {
        // Implement edit functionality here
    };

    const handleDeleteBlog = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/blogs/${id}`);
            fetchBlogs();
        } catch (error) {
            console.error('Error deleting blog:', error);
        }
    };

    const clearForm = () => {
        setTitle('');
        setDescription('');
        setImage('');
    };

    return (
        <div>
            <h1>Blog Management System</h1>
            <div>
                <h2>Add Blog</h2>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Image URL"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />
                <Button onClick={handleAddBlog}>Add Blog</Button>
            </div>
            <div>
                <h2>Blog List</h2>
                <ul>
                    {blogs && blogs?.map((blog) => (
                        <li key={blog.id}>
                            <h3>{blog.title}</h3>
                            <p>{blog.description}</p>
                            <img src={blog.image} alt={blog.title} />
                            <Button onClick={() => handleEditBlog(blog.id)}>Edit</Button>
                            <Button onClick={() => handleDeleteBlog(blog.id)}>Delete</Button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Crud;
