import React, { useState } from 'react';
import { Paper } from '@mui/material'
import "./CreateForum.css"
import { Button } from 'react-bootstrap';

import TextareaAutosize from '@mui/base/TextareaAutosize';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import useAuth from '../../hooks/authHooks';
import axios from '../axios/axios';


const CreateForum = () => {
    const [name, setName] = useState('');
    const [image, setImage] = useState("");
    const [description, setDescription] = useState('');
    const { token,showCreateForum, handleShowCreateForum } = useAuth();

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // handle form submission here
        const formData = new FormData();
        formData.append('name', name);
        formData.append('jwt', token);
        formData.append('description', description);
        
        if (image) {
          formData.append('thumbnail', image, image.name);
        }
        else {
            formData.append("thumbnail", image);
        }

        if (token) {
            console.log(formData);
            axios.post("/api/forums/create/", formData,
                // {
                //     jwt: token,
                //     name: name,
                //     description: description,
                //     thumbnail: image,
                // }
                {
                    headers: { 'Content-Type': 'multipart/form-data' }
                }
            )
                .then(response => {
                    // fetchUser();
                    alert("created successfully");
                    // setImage(null);
                    handleShowCreateForum(!showCreateForum);


                })
                .catch(err =>
                    console.log(err)
                )
        }
    };


    return (
        <Paper elevation={20} className='create_forum_content'>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="শিরোনাম"
                    variant="outlined"
                    style={{ fontSize: '12px', width: '100%' }}
                    margin="normal"
                    value={name}
                    onChange={handleNameChange}
                />
                <br />
                <TextareaAutosize
                    aria-label="description"
                    placeholder="বিস্তারিত"
                    rowsMin={3}
                    value={description}
                    onChange={handleDescriptionChange}
                    style={{ padding: '10px', fontSize: '12px', width: '100%', height: '200px' }}
                />
                <br />
                <input
                    accept="image/*"
                    // className={classes.input}
                    id="image-upload"
                    type="file"
                    onChange={handleImageChange}
                />
                {/* <label htmlFor="image-upload" style={{marginLeft: '35%'}}>
                    <Button variant="contained" color="primary" component="span">
                        Upload Image
                    </Button>
                </label> */}
                {/* {image && (
                    <Typography variant="body1">{image.name}</Typography>
                )} */}
                <br />
                <Button type="submit" style={{ marginLeft: '80%' }}>জমা দিন</Button>
            </form>
        </Paper>
    )
}

export default CreateForum
