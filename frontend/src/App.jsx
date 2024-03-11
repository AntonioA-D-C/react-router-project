// Challenge / Exercise

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components

import { createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import Homepage from './components/pages/Homepage';
import RootLayout from './components/pages/RootLayout';
import EventPages, { loader as eventsLoader } from './components/pages/EventPages';
import EventDetailPage, { loader as eventDetailLoader, action as deleteEventAction } from './components/pages/EventDetailPage';
import NewEventPage from './components/pages/NewEventPage';
import EditEventPage from './components/pages/EditEventPage';
import EventRoot from './components/pages/EventRoot';
import ErrorPage from './components/pages/ErrorPage';
import {action as manipulateEventAction} from './components/EventForm';
import NewsletterPage, { action as newsletterAction } from './components/pages/Newsletter';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Homepage /> },

      {
        path: 'events', element: <EventRoot />, children: [
          { index: true, element: <EventPages />, loader: eventsLoader },
          {
            path: 'new',
            element: <NewEventPage />,
            action: manipulateEventAction, 
          },
          {
            path: ':id',
            id: 'event-detail',
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: deleteEventAction
              },
              { path: 'edit', 
              element: <EditEventPage />,
              
              action: manipulateEventAction, 
    
              }
            ]
          }

        ]
      },
      {
        path: 'newsletter',
        element: <NewsletterPage/>,
        action: newsletterAction,
      },

    ]
  }
])
function App() {

  return <RouterProvider router={router} />
}

export default App;
