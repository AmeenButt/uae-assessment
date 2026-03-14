import { Box } from '@mui/material';
import { useFormik } from 'formik';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import * as Yup from 'yup';
import Button from '../../components/button';
import Popup from "../../components/popup";
export default function AddJob({ open, setOpen, data, setData, onAddJob, onUpdateJob, isUpdate, setIsUpdate, loading }) {
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: data.title,
            description: data.description,
        },
        validationSchema: Yup.object({
            title: Yup.string()
                .trim()
                .required('Job title is required'),
            description: Yup.string()
                .test('not-empty', 'Description is required', value => {
                    const stripped = value?.replace(/<[^>]*>/g, '').trim();
                    return !!stripped;
                }),
        }),
        onSubmit: values => {
            if (isUpdate) {
                onUpdateJob(values)
            } else {
                onAddJob(values)
            }
        },
    });
    return (
        <Popup open={open} setOpen={() => {
            setData({
                title: "",
                description: ""
            })
            setIsUpdate(false)
            setOpen(false)
        }} header={isUpdate ? "Update Record" : "Add Record"}>
            <form onSubmit={formik.handleSubmit} style={{ maxWidth: 700, margin: '0 auto' }}>
                <div style={{ marginBottom: 20 }}>
                    <label htmlFor="title" style={{ display: 'block', marginBottom: 8 }}>
                        Job Title
                    </label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        placeholder="Enter job title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: 6,
                        }}
                    />
                    {formik.touched.title && formik.errors.title && (
                        <div style={{ color: 'red', marginTop: 6 }}>{formik.errors.title}</div>
                    )}
                </div>

                <div style={{ marginBottom: '16px' }}>
                    <label>Description</label>
                    <div style={{ marginTop: '8px' }}>
                        <ReactQuill
                            theme="snow"
                            value={formik.values.description}
                            onChange={(value) => formik.setFieldValue('description', value)}
                            onBlur={() => formik.setFieldTouched('description', true)}
                        />
                    </div>
                    {formik.touched.description && formik.errors.description && (
                        <div style={{ color: 'red', marginTop: '6px' }}>{formik.errors.description}</div>
                    )}
                </div>

                <Box sx={{ display: "flex", justifyContent: "center", marginBottom: '15px' }}>
                    <Box sx={{
                        display: "flex",
                        marginRight: "20px", // mr-5 = 1.25rem ≈ 20px
                        alignItems: "center",
                    }}>
                        <Button
                            text={'Submit'}
                            type="submit"
                            loading={loading == 'add'}
                        />
                    </Box>
                </Box>
            </form>
        </Popup>
    )
}
