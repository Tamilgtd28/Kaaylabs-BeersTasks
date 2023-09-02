import React, { useEffect, useState, useRef } from 'react'
import { getApiHandler } from '../../../Services/ApiHelper'
import { useDispatch, useSelector } from 'react-redux';
import { AppReducer, getPunkData } from '../../../Redux'
import { CommonTable, Pagination, DatePicker, DropDown } from '../../../Components';
import { filterTextLength } from '../../../Utils'



const COMMENT_TYPE = [
    { id: 1, name: 'All' },
    { id: 2, name: 'Brewed Before' },
    { id: 3, name: 'Brewed After' }
]

function DataList() {
    const { punkData } = useSelector((state) => state.AppReducer)
    const dispatch = useDispatch()
    const [currentPage, setCurrentPage] = useState(1)
    const [totalNoPages, setTotalNoPages] = useState(325)
    const [date, setDate] = useState()
    const [dropDownType, setDropDownType] = useState(1)
    const [error, setError] = useState('')
    const dateTimeRef = useRef(null);

    console.log("totalNoPages", dropDownType)


    useEffect(() => {
        fetchPunkData(currentPage, dropDownType)
        setTotalNoPages(Math.ceil(totalNoPages / 10))
    }, [dropDownType, date])




    const fetchPunkData = (pageNumber = 1, listType) => {

        console.log('listType', typeof (+listType))

        const url = +listType === 2 ? `https://api.punkapi.com/v2/beers?brewed_before=${date}&abv_gt=6&per_page=10&page=${pageNumber}`
            :
            +listType === 3 ? `https://api.punkapi.com/v2/beers?brewed_after=${date}&abv_gt=6&per_page=10&page=${pageNumber}`
                :
                `https://api.punkapi.com/v2/beers?page=${pageNumber}&per_page=10`


        if (+listType === 1) {
            getApiHandler(url)
                .then(response => {
                    dispatch(getPunkData(response?.data))
                })
                .catch(error => console.log(error))
        }
        else {

            if (date && dropDownType) {
                getApiHandler(url)
                    .then(response => {
                        dispatch(getPunkData(response?.data))
                    })
                    .catch(error => console.log(error))
            }
            else {
                setError('please pick a date')
                console.error('please pick a date')
            }

        }


    }

    const normalizedTableData = (data) => {
        return data?.map((el, index) => {
            console.log('el', filterTextLength(el.description, 20))
            return {
                Image: <img className='img-fluid img-thumbnail' alt='...' style={{ height: '60px', width: '30px', backgroundSize: 'cover ' }} src={el?.image_url} />,
                Name: el.name,
                Tagline: el?.tagline,
                ' FirstBrewed': el.first_brewed,
                Description: filterTextLength(el.description, 40),
                Contributed_by: el.contributed_by

            };
        });
    };

    const handleClear = () => {
        if (dateTimeRef.current) {
            dateTimeRef.current.clear();
        }
    };



    function paginationHandler(type, position) {
        console.log()
        let page =
            type === "next"
                ? currentPage + 1
                : type === "prev"
                    ? currentPage - 1
                    : position;
        setCurrentPage(page)
        fetchPunkData(page, dropDownType);
    }

    console.log('date', date)

    return (
        <>
            {punkData ?
                <div className='container-fluid p-2'>
                    <h3 className='text-center'>Beers</h3>
                    <div className='row m-4'>
                        <div className='col-sm-3'>
                            <DatePicker
                                Ref={dateTimeRef}
                                disabled={+dropDownType === 1}
                                heading={"Date"}
                                placeholder={"Date"}
                                value={date}
                                onChange={(e) => {
                                    setDate(e)
                                    setCurrentPage(1)
                                }}
                            />
                        </div>
                        <div className='col-sm-3'>
                            <DropDown
                                heading={'DropDown'}
                                data={COMMENT_TYPE}
                                placeholder={'DropDown'}
                                onChange={(e) => {
                                    setDropDownType(e.target.value)
                                    if (+e.target.value === 11)
                                        handleClear()
                                }}
                                value={dropDownType}
                            />
                        </div>
                        <div className="card">
                            <div className="card-body ">
                                {punkData && punkData?.length > 0 ? <div className=''>
                                    <CommonTable
                                        tableData={normalizedTableData(punkData)}
                                    />
                                    <Pagination
                                        currentPage={currentPage}
                                        nextClick={() => paginationHandler('next')}
                                        previousClick={() => paginationHandler('prev')}
                                        paginationNumberClick={(position) => {
                                            paginationHandler('current', position)
                                        }}
                                        noOfPage={totalNoPages}
                                        totalPages={totalNoPages}
                                    />
                                </div>
                                    :
                                    <div className='row justify-content-center align-items-center'
                                        style={{
                                            height: '65vh'
                                        }}
                                    >
                                        {'NoRecord Found'}
                                    </div>
                                }
                            </div>
                        </div>
                    </div>

                </div > :
                <div className='row justify-content-center align-items-center'
                    style={{
                        height: '100vh'
                    }}
                >
                    {'Loading...'}
                </div>
            }
        </>
    )
}

export { DataList }