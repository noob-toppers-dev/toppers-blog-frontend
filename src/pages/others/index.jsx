import React, { useState } from 'react'
import useFetch from '../../hooks/useFetch';
import useDebounce from '../../hooks/useDebounce';

const Other = () => {
    const [query, setQuery] = useState('');
    const [filterData, setFilterData] = useState([]);

    const { data, loading, error } = useFetch('https://fakestoreapi.com/products');
    const { debounceValue } = useDebounce(query, 500);


    useEffect(() => {
        const newData = data && data?.filter((ele) => {
            if (typeof ele.title === "string") {
                return ele.title.toLowerCase().includes(debounceValue);
            } else {
                return false
            }
        })
        setFilterData(newData)
    }, [query, data]);

    // if (loading) {
    //     return <h1 className='t-center'>Please wait loading data</h1>
    // }

    return (
        <div>

            <div className='mb-10 w-25 auto'>
                <InputField
                    type={'text'}
                    placeholder={'Enter your User Name'}
                    name='query'
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>
            <table>
                <thead>
                    <tr>
                        <td>
                            Id
                        </td>
                        <td>
                            Title
                        </td>
                        <td>
                            Price
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {
                        loading ? <h1 className='t-center'>Please wait loading data</h1>
                            :
                            filterData && filterData?.map((ele) => (
                                <tr key={ele.id}>
                                    <td>{ele.title}</td>
                                    <td>{ele.price}</td>
                                </tr>
                            ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Other;

// const orange = '#ffae33';
// const black = '#191712';
// const white = '#dadada';

//code

//     username !== data?.username && (
//         isFollowing ?
//             <Button Button variant='outlined' onClick={() => unFollowUser(data?.username)} >Unfollow</Button>
//             :
//             <Button variant='outlined' onClick={() => followUser(data?.username)} >Follow</Button>
//     )

// title={elipsisText(data?.title, 25)}
//                         subheader={findPostDate(data?.createdAt)}