import { useEffect, useState } from "react";
import axios from 'axios';

const useFetch = (url, reload) => {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await axios.get(url);
                setData(response.data);

            } catch (error){
                setError(error);
            } finally{
                setIsLoading(false);
            }
            
        };
        if (url){
            fetchData();
        }
    },[url, reload]);

    return {data, isLoading, error};
}
export default useFetch;