import EventItem from "@/components/EventItem"
import Layout from "@/components/Layout"
import { API_URL } from "@/config/index"

const EventsPage = ({events}) => {
  
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.data.length > 0 ?
        events.data.map((evt) => {
          return <EventItem key={evt.id} event={evt.attributes}/>
        }) 
        :
        <h3>No events to show</h3>
      }
    </Layout>
  )
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events?_sort=date:ASC&populate=*`)
  const events = await res.json()

  return {
    props: { events },
    revalidate: 1
  }
}


export default EventsPage