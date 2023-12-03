import { useEffect, useState } from 'react'

const useFetch = (url) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null);

    useEffect(() => {
        try {
            (async () => {
                let response = await fetch(url);
                response = await response.json();
                if (response) {
                    setData(response)
                    setLoading(false)
                }
            })()

        } catch (error) {
            setError(error);
            setLoading(false)
        }
    }, [url]);

    return { data, loading, error }

}

export default useFetch