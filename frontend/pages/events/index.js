import EventItem from "@/components/EventItem"
import Layout from "@/components/Layout"
import { API_URL } from "@/config/index"
import Pagination from '@/components/Pagination'
import { PER_PAGE } from '@/config/index'

const EventsPage = ({events, page, total}) => {
  return (
    <Layout>
      <h1>Events</h1>
      {events.data.length > 0 ?
        events.data.map((evt) => {
          return <EventItem key={evt.id} event={evt.attributes}/>
        }) 
        :
        <h3>No events to show</h3>
      }
      <Pagination page={page} total={total} />
    </Layout>
  )
}

export async function getServerSideProps({query: {page = 1}}) {
  const start = page === 1 ? 0 : (+page - 1) * PER_PAGE

  const res = await fetch(`${API_URL}/api/events?_sort=date:ASC&populate=*&pagination[limit]=${PER_PAGE}&pagination[start]=${start}`)
  const events = await res.json()

  return {
    props: { events, page: +page, total: events.meta.pagination.total }
  }
}


export default EventsPage