import React, { useState } from 'react'
import blogService from '../services/blogs';

const BlogForm = ({ blogs, setBlogs, setError }) => {
    const [ title, setTitle ] = useState('');
    const [ author, setAuthor ] = useState('');
    const [ url, setUrl ] = useState('');

    const onBlogAddition = async (e) => {
        e.preventDefault();
        try {
            const newBlog = await blogService.create({ title, author, url });
            setBlogs([...blogs, newBlog]);
            setTitle('')
            setAuthor('')
            setUrl('');
        } catch (exception) {
            setError('Couldnt add a blog')
            setTimeout(() => {
                setError('')
            }, 5000);
        }
    }

    return (
        <>
            <form onSubmit={onBlogAddition}>
                <input type="text" value={title} onChange={({ target }) => setTitle(target.value)} name="Title" placeholder="Title" style={{display: 'block', margin: '5px'}}/>
                <input type="text" value={author} onChange={({ target }) => setAuthor(target.value)} name="Author" placeholder="Author" style={{display: 'block', margin: '5px'}}/>
                <input type="text" value={url} onChange={({ target }) => setUrl(target.value)} name="Url" placeholder="Url" style={{display: 'block', margin: '5px'}}/>
                <button type="submit">create</button>
            </form>
        </>
    )
}

export default BlogForm
