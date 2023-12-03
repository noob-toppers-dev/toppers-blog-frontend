import React from 'react'
import { FormButton, FormContainerStyle, FormControls, FormHeader, FormStyle, PictureLabelStyle, PriviewImage } from '../../styled-components'
import InputField from '../../components/input-field'
import TextAreaField from '../../components/textarea-field';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Loader from '../../components/loader';
const BlogForm = (props) => {
    const { type, blogValue, handleChange, onSubmit, setFile, imagePreviewUrl, previewUrl, imageLoading } = props;
    console.log(blogValue, "blogValue")

    const isEdit = type === "create";

    const categoriesList = ["science", "code", "news", "technologies", "electronics",]


    return (
        <FormContainerStyle>
            <FormStyle onSubmit={onSubmit}>
                <FormHeader>{isEdit ? 'Create' : 'Update'} Blog</FormHeader>
                <FormControl sx={{ mb: 2, width: '100%' }} size="small">
                    <InputLabel id="demo-select-small-label">Select Category</InputLabel>
                    <Select
                        labelId="demo-customized-select-label"
                        id="demo-customized-select"
                        value={blogValue ? blogValue?.category : 'none'}
                        label="category"
                        name="category"
                        onChange={handleChange}
                    >
                        <MenuItem value={""}>
                            <em>None</em>
                        </MenuItem>
                        {
                            categoriesList?.map((category, index) => (
                                <MenuItem key={index} value={category}>{category}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
                <FormControls>

                    <InputField
                        type={'text'}
                        placeholder={'Enter your title'}
                        name='title'
                        value={blogValue?.title}
                        onChange={handleChange}
                    />
                </FormControls>
                <FormControls>
                    <TextAreaField
                        type={'text'}
                        placeholder={'Enter your Description'}
                        name='description'
                        value={blogValue?.description}
                        onChange={handleChange}

                    />
                </FormControls>
                <PictureLabelStyle htmlFor='picture'  >
                    {imageLoading ? <Loader /> : previewUrl && <PriviewImage src={imagePreviewUrl || "image"} alt="Preview" />}
                    <FileUploadIcon /> <span>Picture Upload</span>
                </PictureLabelStyle>
                <TextField
                    id='picture'
                    type={'file'}
                    name='file'
                    style={{ display: 'none' }}
                    onChange={(e) => setFile(e.target.files[0])}

                />
                <FormControls className='t-center'>
                    <FormButton type='submit' >{isEdit ? 'Publish' : 'Update'}</FormButton>
                </FormControls>
            </FormStyle>
        </FormContainerStyle>
    )
}

export default BlogForm