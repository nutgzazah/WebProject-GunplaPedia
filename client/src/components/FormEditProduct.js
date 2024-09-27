import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { update, read } from '../functions/product';
import './FormProduct.css';

const FormEditProduct = () => {
    const params = useParams()
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({});
    const [preview, setPreview] = useState(null);
    const [sticker, setSticker] = useState({
        foil: false,
        etching: false,
        water: false
    });

    useEffect(() => {
        loadProductData(id);
    }, [id]);

    const loadProductData = async (productId) => {
        read(productId)
            .then((res) => {
                setForm(res.data);
                if (res.data.file !== 'noimage.jpg') {
                    setPreview(`${process.env.REACT_APP_API}/uploads/${res.data.file}`);
                }
                setSticker(res.data.sticker);
            })
            .catch((err) => console.log(err));
    };

    const handleChange = (e) => {
        if (e.target.name === 'file') {
            const file = e.target.files[0];
            if (file && file.type.startsWith('image/')) {
                setForm({
                    ...form,
                    [e.target.name]: file,
                });
                setPreview(URL.createObjectURL(file));
            } else {
                alert('Please select a valid image file');
            }
        } else if (e.target.type === 'checkbox') {
            setSticker({
                ...sticker,
                [e.target.name]: e.target.checked
            });
        } else if (e.target.name !== 'ratings') { // Exclude 'ratings' field
            setForm({
                ...form,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleDeleteFile = () => {
        setForm({
            ...form,
            file: 'noimage.jpg'
        });
        setPreview(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formWithImageData = new FormData();
        for (const key in form) {
            formWithImageData.append(key, form[key]);
        }
        formWithImageData.append('sticker', JSON.stringify(sticker));
        update(id, formWithImageData)
            .then(res => {
                console.log(res.data);
                navigate('/admin/gunpla');
            })
            .catch((err) => console.log(err));
    };

    const gradeOptions = ['SD', 'HG', 'RG', 'MG', 'MGSD', 'PG', 'Mega Size', 'HIRM', '1/100'];
    const serieOptions = ['Gundam', 'Zeta Gundam', 'Gundam ZZ', 'Victory Gundam', 'Unicorn', 'Thunderbolt', 'G Gundam', 'Wing', 'SEED', 'SEED Destiny', '00', 'Sangokuden', 'AGE', 'Build Fighters', 'The Origin', 'Iron-Blooded Orphans', 'Hathaway', 'The Witch From Mercury'];

    return (
        <div className="FormProduct-container">
            <Link to="/admin/gunpla">{`< Back to Manage Gunpla`}</Link>
            <h2>Edit Gunpla Product</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="FormProduct-form">
                <div className="FormProduct-form-group">
                    <label>Name:</label>
                    <input type="text" name="name" value={form.name || ''} onChange={handleChange} required />
                </div>
                <div className="FormProduct-form-group">
                    <label>Grade:</label>
                    <select name="grade" value={form.grade || ''} onChange={handleChange}>
                        <option value="">Select Grade</option>
                        {gradeOptions.map((grade, index) => (
                            <option key={index} value={grade}>
                                {grade}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="FormProduct-form-group">
                    <label>Serie:</label>
                    <select name="serie" value={form.serie || ''} onChange={handleChange}>
                        <option value="">Select Serie</option>
                        {serieOptions.map((serie, index) => (
                            <option key={index} value={serie}>
                                {serie}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="FormProduct-form-group">
                    <label>Height:</label>
                    <input type="number" name="height" value={form.height || ''} onChange={handleChange} />
                </div>
                <div className="FormProduct-form-group">
                    <label>Runner Numbers:</label>
                    <input type="number" name="runner_num" value={form.runner_num || ''} onChange={handleChange} />
                </div>
                <div className="FormProduct-form-group">
                    <label>Consideration:</label>
                    <input type="text" name="cons" value={form.cons || ''} onChange={handleChange} />
                </div>
                <div className="FormProduct-form-group">
                    <label>Detail:</label>
                    <input type="text" name="detail" value={form.detail || ''} onChange={handleChange} />
                </div>
                <div className="FormProduct-form-group">
                    <label>File:</label>
                    <input type="file" name="file" onChange={handleChange} accept="image/*" />
                    {preview ? (
                        <div className="FormProduct-img-preview-container">
                            <img src={preview} alt="Preview" className="img-preview" />
                            <button type="button" onClick={handleDeleteFile}>Delete Image</button>
                        </div>
                    ) : (
                        <div className="FormProduct-img-placeholder">
                            <p>No image selected</p>
                        </div>
                    )}
                </div>
                <button type="submit" className="FormProduct-submit-button">Update</button>
            </form>
        </div>
    );
};

export default FormEditProduct;