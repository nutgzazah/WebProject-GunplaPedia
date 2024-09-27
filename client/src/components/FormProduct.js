import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { remove, create, getdata } from '../functions/product';
import './FormProduct.css';

const FormProduct = () => {
    const [data, setData] = useState([]);
    const [form, setForm] = useState({});
    const [preview, setPreview] = useState(null);
    const [sticker, setSticker] = useState({
        foil: false,
        etching: false,
        water: false
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        getdata()
            .then((res) => setData(res.data))
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
        } else {
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
        setPreview(null); // Remove the preview URL when the image is deleted
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formWithImageData = new FormData();
        for (const key in form){
            formWithImageData.append(key,form[key]);
        }
        formWithImageData.append('sticker', JSON.stringify(sticker));
        create(formWithImageData)
            .then(res => {
                console.log(res.data);
                loadData();
            })
            .catch((err) => console.log(err));
    };

    const handleRemove = async (id) => {
        remove(id)
            .then((res) => {
                console.log(res);
                loadData();
            })
            .catch((err) => console.log(err));
    };

    const gradeOptions = ['SD','HG','RG','MG','MGSD','PG','Mega Size','HIRM','1/100'];
    const serieOptions = ['Gundam','Zeta Gundam','Gundam ZZ','Victory Gundam','Unicorn','Thunderbolt','G Gundam','Wing','SEED','SEED Destiny','00','Sangokuden','AGE','Build Fighters','The Origin','Iron-Blooded Orphans','Hathaway','The Witch From Mercury'];
  
    return (
        <div className="FormProduct-container">
            <h2>Gunpla Adder</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="FormProduct-form">
                <div className="FormProduct-form-group">
                    <label>Name:</label>
                    <input type="text" name="name" onChange={handleChange} required />
                </div>
                <div className="FormProduct-form-group">
                    <label>Grade:</label>
                    <select name="grade" onChange={handleChange}>
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
                    <select name="serie" onChange={handleChange}>
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
                    <input type="number" name="height" onChange={handleChange} />
                </div>
                <div className="FormProduct-form-group">
                    <label>Runner Numbers:</label>
                    <input type="number" name="runner_num" onChange={handleChange} />
                </div>
                <div className="FormProduct-form-group">
                    <label>Consideration:</label>
                    <input type="text" name="cons" onChange={handleChange} />
                </div>
                <div className="FormProduct-form-group">
                    <label>Detail:</label>
                    <input type="text" name="detail" onChange={handleChange} />
                </div>
                <div className="FormProduct-form-group">
                    <label>Sticker:</label>
                    <div>
                        <label>
                            <input type="checkbox" name="foil" checked={sticker.foil} onChange={handleChange} />
                            Foil
                        </label>
                        <label>
                            <input type="checkbox" name="etching" checked={sticker.etching} onChange={handleChange} />
                            Etching
                        </label>
                        <label>
                            <input type="checkbox" name="water" checked={sticker.water} onChange={handleChange} />
                            Water
                        </label>
                    </div>
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
                <button type="submit" className="FormProduct-submit-button">Submit</button>
            </form>
            <table className="FormProduct-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Grade</th>
                        <th>Serie</th>
                        <th>File</th>
                        <th>Ratings</th>
                        <th>Action</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {data &&
                        data.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.grade}</td>
                                <td>{item.serie}</td>
                                <td>
                                    {item.file === 'noimage.jpg' ? (
                                        <img src={`${process.env.REACT_APP_API}/uploads/noimage2.jpg`} className="FormProduct-img-preview" />
                                    ) : (
                                        <img src={`${process.env.REACT_APP_API}/uploads/${item.file}`} className="FormProduct-img-preview" />
                                    )}
                                </td>
                                <td>{item.totalrating.toFixed(1)}</td>
                                <td>
                                    <button onClick={() => handleRemove(item._id)} className="FormProduct-action-button">Delete</button>
                                </td>
                                <td>
                                    <Link to={'/admin/gunpla/edit/' + item._id} className="FormProduct-edit-link">Edit</Link>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default FormProduct;
