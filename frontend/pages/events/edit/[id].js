import Layout from "@/components/Layout"
import Link from "next/link"
import { useState } from "react"
import styles from '@/styles/Form.module.css'
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { API_URL } from "@/config/index"
import { useRouter } from "next/router"
import moment from "moment"
import Image from "next/image"
import { FaImage } from "react-icons/fa"
import Modal from "@/components/Modal"
import ImageUpload from "@/components/ImageUpload"

const EditEvent = ({event}) => {

  const router = useRouter()
  const [values, setValues] = useState({
    name: event.attributes.name,
    performers: event.attributes.performers,
    venue: event.attributes.venue,
    address: event.attributes.address,
    date: event.attributes.date,
    time: event.attributes.time,
    description: event.attributes.description
  })
  const [imagePreview, setImagePreview] = useState(event.attributes.image ? event.attributes.image.data?.attributes.formats.thumbnail.url : null)
  const [showModal, setShowModal] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hasEmptyField = Object.values(values).some((el) => el === '')

    if(hasEmptyField) toast.error('Please fill all the fields')

    const res = await fetch(`${API_URL}/api/events/${event.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      }, 
      body: JSON.stringify({data: values})
    })

    if(!res.ok) {
      toast.error('Something Went Wrong!')
    } else {
      const evt =await res.json();
      router.push(`/events/${evt.data.attributes.slug}`)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  const imageUploaded = async (e) => {
    const response = await fetch(`${API_URL}/api/events/${event.id}?populate=*`)
    const eventData = await response.json()
    setImagePreview(eventData.data.attributes.image.data.attributes.formats.thumbnail.url)
    setShowModal(false)
  }

  return (
    <Layout title='Edit Event'>
    <Link href='/events'>Go Back</Link>
    <ToastContainer />
    <h1>Edit Event</h1>
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.grid}>
        <div>
          <label htmlFor='name'>Event Name</label>
          <input
            type='text'
            id='name'
            name='name'
            value={values.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor='performers'>Performers</label>
          <input
            type='text'
            name='performers'
            id='performers'
            value={values.performers}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor='venue'>Venue</label>
          <input
            type='text'
            name='venue'
            id='venue'
            value={values.venue}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor='address'>Address</label>
          <input
            type='text'
            name='address'
            id='address'
            value={values.address}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor='date'>Date</label>
          <input
            type='date'
            name='date'
            id='date'
            value={moment(values.date).format('yyyy-MM-DD')}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor='time'>Time</label>
          <input
            type='text'
            name='time'
            id='time'
            value={values.time}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div>
        <label htmlFor='description'>Event Description</label>
        <textarea
          type='text'
          name='description'
          id='description'
          value={values.description}
          onChange={handleInputChange}
        ></textarea>
      </div>

      <input type='submit' value='Update Event' className='btn' />
    </form>
    <h2>Event Image</h2>
    {imagePreview ?
      <Image src={imagePreview} width={100} height={100}/>
      :
      <div>
        <p>No Image Uploaded</p>
      </div>
    }
    <div style={{marginTop : '1rem'}}>
      <button className="btn btn-secondary" onClick={() => setShowModal(true)}>
        <FaImage/> Set Image
      </button>
    </div>
    <Modal show={showModal} onClose={() => setShowModal(false)}>
      <ImageUpload eventId = {event.id} imageUploaded={imageUploaded}/>
    </Modal>
    </Layout>
  )
}

export async function getServerSideProps({params: {id}, req}) {
    const response = await fetch(`${API_URL}/api/events/${id}?populate=*`)
    const event = await response.json()

    return {props : {event: event.data}}
}

export default EditEvent