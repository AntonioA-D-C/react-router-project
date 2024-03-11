import EventForm from '../EventForm'
import {Link, useLoaderData, useParams, NavLink, useRouteLoaderData} from 'react-router-dom'
function EditEventPage(){
    const data =  useRouteLoaderData("event-detail")
    return(
      
      <EventForm method="patch" event={data.event}/>
    )
    }
    export default EditEventPage