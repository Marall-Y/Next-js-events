import EventItem from "@/components/EventItem"
import Layout from "@/components/Layout"
import { API_URL } from "@/config/index"
import Link from "next/link"
import { useRouter } from "next/router"
import qs from 'qs'

const SearchPage = ({events}) => {

const router = useRouter()

  return (
    <Layout title="Search Results">
        <Link href="/events">Go Back</Link>
        <h1>Search Results for {router.query.term}</h1>
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

export async function getServerSideProps({query:{term}}) {
    const query = qs.stringify({
        filters: {
          $or: [
            {name: {
                $contains: term,
              }},
            {performers: {
                $contains: term,
              }},
            {description: {
                $contains: term,
              }},
            {venue: {
                $contains: term,
              }},
          ]
        }})
    const res = await fetch(`${API_URL}/api/events?${query}&populate=*`)
    const events = await res.json()

    return {
        props: { events }
    }
    }


export default SearchPage