import React, { useState } from 'react'
import styles from '@/styles/Form.module.css'
import { API_URL } from '../config'

const ImageUpload = ({eventId, imageUploaded}) => {
    const [image, setImage] = useState(null)

    const handleFileChange = (e) => {
        setImage(e.target.files[0])
    }  

    const submitHandler = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('files', image)
        formData.append('ref', 'api::event.event')
        formData.append('refId', eventId)
        formData.append('field', 'image')

        const response = await fetch(`${API_URL}/api/upload`, {
            method: 'POST',
            body: formData
        })

        if (response.ok) imageUploaded()
    }

  return (
    <div className={styles.form}>
        <h1>Upload Event Image</h1>
        <form onSubmit={submitHandler}>
            <div className={styles.file}>
                <input type="file" onChange={handleFileChange}/>
            </div>
            <input type="submit" value="Upload Image" className="btn" onClick={submitHandler}/>
        </form>
    </div>
  )
}

export default ImageUpload