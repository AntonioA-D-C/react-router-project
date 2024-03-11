import { useLoaderData, json, useRouteLoaderData, redirect, defer, Await } from 'react-router-dom'
import EventItem from '../EventItem'
import EventsList from '../EventsList'
import { Fragment, Suspense } from 'react'
function EventDetailPage() {
  const { event, events } = useRouteLoaderData('event-detail')

  return (
    <Fragment>

      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={event}>
          {loadedEvent => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
     <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>

    </Fragment>
  )
}
export default EventDetailPage


async function loadEvent(id) {
  
  const response = await fetch("http://localhost:8080/events/" + id);
  if (!response.ok) {
    
    throw json({ message: "Could not fetch details for selected event" }, {
      status: 500
    })
  } else {
    const resData = await response.json();
    return resData.event
  }
}

async function loadEvents() {
   console.log("Loading multiple events....")
    
  const response = await fetch("http://localhost:8080/events/");
  if (!response.ok) {
    
    throw json({ message: "Could not fetch details for selected event" }, {
      status: 500
    })
  } else {
    const resData = await response.json();
    console.log(resData)
    return resData.events
  }

}
export async function loader({ request, params }) {
 
  const id = params.id;
  return defer({
    event: await loadEvent(id),
    events: loadEvents()
  });

}

export async function action({ params, request }) {
  const eventId = params.id;
   
  const response = await fetch('http://localhost:8080/events/' + eventId, {
    method: request.method
  });
  if (!response.ok) {
    throw json(
      { message: "Could not delete event." },
      {
        status: 500,
      }
    )
  }
  return redirect('/events');
}