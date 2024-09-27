import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { removeTech, createTech, getDataTech } from '../functions/technique';
import './FormTechnique.css';

const FormTechnique = () => {
    const [data, setData] = useState([]);
    const [form, setForm] = useState({});
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        getDataTech()
            .then((res) => setData(res.data))
            .catch((err) => console.log(err));
    };

    const handleChange = (e) => {
        if (e.target.name === 'file') {
            const file = e.target.files[0];
            if (file && file.type.startsWith('image/')) {
                setForm({
                    ...form,
                    [e.target.name]: file
                });
                setPreview(URL.createObjectURL(file));
            } else {
                alert('Please select a valid image file');
            }
        } else {
            setForm({
                ...form,
                [e.target.name]: e.target.value
            });
        }
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formWithImageData = new FormData();
        for (const key in form) {
            formWithImageData.append(key, form[key]);
        }
        createTech(formWithImageData)
            .then(res => {
                console.log(res.data);
                loadData();
                setForm({});
                setPreview(null);
            })
            .catch((err) => console.log(err));
    };

    const handleRemove = async (id) => {
        removeTech(id)
            .then((res) => {
                console.log(res);
                loadData();
            })
            .catch((err) => console.log(err));
    };

    const handleDeleteFile = () => {
        setForm({
            ...form,
            file: 'noimage.jpg'
        });
        setPreview(null);
    };

    return (
        <div className="container">
            <div className="form-technique-container">
                <h2>Technique Adder</h2>
                <form onSubmit={handleSubmit} encType='multipart/form-data' className="technique-form">
                    <div className="form-group">
                        <label>Title</label>
                        <input
                            type="text"
                            name='title'
                            onChange={e => handleChange(e)}
                            value={form.title || ''}
                        />
                    </div>

                    <div className="form-group">
                        <label>Content</label>
                        <textarea
                            name='content'
                            onChange={e => handleChange(e)}
                            value={form.content || ''}
                        />
                    </div>

                    <div className="form-group file-input-container">
                        <label>File</label>
                        <input
                            type="file"
                            name='file'
                            onChange={e => handleChange(e)}
                            accept="image/*"
                        />
                        {preview ? (
                            <div className="img-preview-container">
                                <img src={preview} alt="Preview" className="img-preview" />
                                <button type="button" onClick={handleDeleteFile}>Delete Image</button>
                            </div>
                        ) : (
                            <div className="img-placeholder">
                                <p>No image selected</p>
                            </div>
                        )}
                    </div>

                    <button type="submit" className="submit-button">Submit</button>
                </form>
            </div>
            <div className="data-table-container">
                <table className="technique-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Content</th>
                            <th>Release Date</th>
                            <th>File</th>
                            <th>Action</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data ? data.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.title}</td>
                                <td>{item.content}</td>
                                <td>{new Date(item.release_date).toLocaleDateString()}</td>
                                <td>
                                    {item.file === 'noimage.jpg' ? <img src={`${process.env.REACT_APP_API}/uploads/noimage2.jpg`} style={{ maxWidth: '100px' }}/> : (
                                        <img src={`${process.env.REACT_APP_API}/uploads/${item.file}`} style={{ maxWidth: '100px' }} />
                                    )}
                                </td>
                                <td>
                                    <button
                                        type="button"
                                        onClick={() => handleRemove(item._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                                <td>
                                    <Link to={'/admin/technique/edit/' + item._id}>
                                        Edit
                                    </Link>
                                </td>
                            </tr>
                        )) : null}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FormTechnique;
