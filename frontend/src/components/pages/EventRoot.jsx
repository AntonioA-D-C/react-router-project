import {Outlet} from 'react-router-dom';
import EventsNavigation from "../EventsNavigation";
 
function EventRoot(){
    return(
        <>
        <EventsNavigation/>
        <Outlet/>
        </>
    )
}
export default EventRoot;