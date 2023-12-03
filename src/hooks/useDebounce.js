import { useEffect, useState } from 'react'

const useDebounce = (query, delay) => {

    const [debounceValue, setDebounceValue] = useState('');

    useEffect(() => {
        setTimeout(() => {
            setDebounceValue(query)
        }, delay);
    }, [delay, query])

    return { debounceValue }

}

export default useDebounce