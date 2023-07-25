import { useEffect, useState } from 'react';
import yelp from '../api/yelp';

export default () => {
    const[results, setResults] = useState([]);
    const[errorMessage, setErrorMessage] = useState('');

    const searchAPI = async (searchTerm) => {
        console.log('this is a search');
        try {
            const response = await yelp.get('/search', {
                params: {
                    limit: 50, //all these params taken from the API
                    term: searchTerm,
                    location: 'san jose'
                }
            }); //wait for yelp.get to get something then assign result to response
            // response.data will be JSON file retrieved from API
            setResults(response.data.businesses);
        } catch (err) {
            setErrorMessage('Something went wrong');
        }
    }
    //call searchAPI when component is first rendered (bad code)
    // searchAPI('pasta');
    useEffect(() => {
        searchAPI('pasta');
    }, []);    //this second argument makes it only make the call ONCE
    
    return [searchAPI, results, errorMessage];
}