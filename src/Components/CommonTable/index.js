import React from 'react'
import { Pagination } from '../Pagination'

function CommonTable({ tableData, currentPage, totalPages, noOfPage, previousClick, nextClick, paginationNumberClick, additionalClass }) {

    const renderTableHeader = () => {
        if (tableData) {
            const header = Object.keys(tableData[0])
            return header.map(key => {
                return <th scope="col" key={key}>{key}</th>
            })
        }
    }

    function renderTableValue(eachObject) {
        return Object.keys(eachObject).map((key) => {
            let value = eachObject[key]
            return <td className='align-middle' style={{ whiteSpace: 'pre-wrap' }} key={key} ><span>{value}</span></td>
        })
    }


    return (
        <div className=''
            style={{
                marginRight: '-25px',
                marginLeft: '-25px',
            }}
        >
            <table className="table table-striped">
                <thead>
                    <tr>
                        {renderTableHeader()}
                    </tr>
                </thead>
                <tbody>
                    {tableData && tableData.length > 0 &&
                        tableData.map((each_table_obj, id) => {
                            return (
                                <tr key={id}>
                                    {renderTableValue(each_table_obj)}
                                </tr>)
                        })
                    }
                </tbody>
            </table>

        </div>
    )
}

export { CommonTable }