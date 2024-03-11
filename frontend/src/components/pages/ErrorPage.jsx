import {useRouteError} from 'react-router-dom'
import PageContent from "../PageContent"
import MainNavigation from '../MainNavigation';

function ErrorPage(){
    const error = useRouteError();
   let title = "An error ocurred";
   let message = "Something went wrong";
   if(error.status===500){
    message = error.data.message
   }
   if(error.status===404){
    let title = "Not found";
    let message = "Could not find the data";
   }
  console.error(error);
    return (<>
    <MainNavigation/>
    <PageContent title={title}>
        <p>{message}</p>   
    </PageContent>
    </>)
}

export default ErrorPage