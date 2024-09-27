import React, { useState, useEffect } from 'react';
import {  useNavigate } from 'react-router-dom'
import { Link, useParams } from 'react-router-dom';
import { readTech, updateTech } from '../functions/technique';
import './FormTechnique.css';

const FormEditTechnique = () => {
    const params = useParams()
    const [fileOld, setFileOld] = useState()
    const navigate = useNavigate();
    const { id } = useParams();
    const [form, setForm] = useState({});
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        loadData(params.id);
    }, []);

    const loadData = async () => {
        readTech(id)
            .then((res) => {
                setForm(res.data);
                setFileOld(res.data.file)
                setPreview(`${process.env.REACT_APP_API}/uploads/${res.data.file}`);
            })
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
        console.log(form)
        const formWithImageData = new FormData();
        for (const key in form) {
            formWithImageData.append(key, form[key]);
        }
        formWithImageData.append('fileOld',fileOld)
        updateTech(params.id, formWithImageData)
            .then(res => {
                console.log(res);
                navigate('/admin/technique')
            })
            .catch((err) => console.log(err));
    };


    return (
        <div className="container">
            <Link to="/admin/technique">{`< Back to Manage Technique`}</Link>
            <div className="form-technique-container">
                <h2>Edit Technique</h2>
                <form onSubmit={handleSubmit} encType='multipart/form-data' className="technique-form">
                    <div className="form-group">
                        <label>Title</label>
                        <input
                            type="text"
                            name='title'
                            onChange={handleChange}
                            value={form.title || ''}
                        />
                    </div>

                    <div className="form-group">
                        <label>Content</label>
                        <textarea
                            name='content'
                            onChange={handleChange}
                            value={form.content || ''}
                        />
                    </div>

                    <div className="form-group file-input-container">
                        <label>File</label>
                        <input
                            type="file"
                            name='file'
                            onChange={handleChange}
                            accept="image/*"
                        />
                        {preview ? (
                            <div className="img-preview-container">
                                <img src={preview} alt="Preview" className="img-preview" />
                            </div>
                        ) : (
                            <div className="img-placeholder">
                                <p>No image selected</p>
                            </div>
                        )}
                    </div>

                    <button type="submit" className="submit-button">Update</button>
                </form>
            </div>
        </div>
    );
};

export default FormEditTechnique;
