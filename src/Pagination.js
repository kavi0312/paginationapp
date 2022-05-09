import { isDisabled } from '@testing-library/user-event/dist/utils';
import React , {useDebugValue, useMemo} from 'react';
import {useState,useEffect} from 'react';
import {useTable , usePagination} from 'react-table'
import { useFilters, useSortBy } from 'react-table/dist/react-table.development';
//import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import EditableCell from '.';
import './App.css';

const url='https://mocki.io/v1/8b1002c0-d8f0-4a3b-b2aa-0abeab5dd0d3';
const PER_PAGE = 4;
const Pagination = () =>{
   const [data , setData] = useState([]);
   const [filterInput, setFilterInput] = useState("");
   const [rowData, setRowData] =useState([]);
   
   const [selectedData,setSelectedData] = useState({});
   const [show, setShow] = useState(false);
   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);
   
 
   const showRowData = (selectedRec) => {
    setSelectedData(selectedRec)
    setShow(true);
   };

   const hideModal = () => {
    setShow(false);
  };


   const columns = React.useMemo(
    () => [
        {
            Header:"",
            id:"i",
            Cell:({row}) => {
            const data = row.original;
            const showUserName = (id,name,username) => {
                alert(`Row Details are :-  ${id}, ${name},${username}`)
            }
            return(
                <button onClick={() => showUserName(data.id,data.name,data.username)}>
                    +</button>
            )
        }
      },
           {Header: 'ID',
            accessor: 'id',
            Cell: EditableCell,
          },
          {
            Header: 'Name',
            accessor: 'name',
          },
          {
            Header: 'User Name',
            accessor: 'username',
          },
            
    
        ],[])

   const fetchApiData = () => {
    fetch(url).then((res) => res.json()).then( (records) => {
     setData([...records]);
     
     } )
  }

  useEffect(() => {
    fetchApiData();
   },[])

   const handleFilterInput = (e) => {
       const value= e.target.value || undefined
       setFilter("name",value);
       setFilterInput(value);
   }

   const addRowOnClick = () => {
       console.log('test 1 -> ',rowData.concat({name: "",username: ""}))
       setRowData(rowData.concat({name: "",username: ""}))
   }
   const {
       getTableProps,
       getTableBodyProps,
       headerGroups,
       page,
       pageCount,
       previousPage,
       nextPage,
       canPreviousPage,
       canNextPage,
       gotoPage,
       prepareRow,
       setFilter,
    } = useTable(
        {
            columns,
            data,
        },
        useFilters,
        useSortBy,
        usePagination,
        
    )

    const Modal = ({ handleClose, details }) => {
        return (
          <div className="popupdata">
            <section className="modal-content">
              <h2>All Details are given below:</h2>
                <h4>Name:- {details.original.name}</h4>
                <h4>UserName:- {details.original.username}</h4>
                <h4>Department:- Finance</h4>
                <h4>Location:- Bangalore</h4>
              <button className='btn' onClick={handleClose}>close</button>
            </section>
          </div>
        );
      };
   
    
    return (
        <>
        <input className="inpt" type="text" value= {filterInput} onChange={handleFilterInput} placeHolder="Search by name"/>
        <table {...getTableProps()} className="tablecss">
            <thead>
                {headerGroups.map((headerGroups) => (
                <tr {...headerGroups.getHeaderGroupProps()}>
                    {headerGroups.headers.map((column) => (
                    <th{...column.getHeaderProps(column.getSortByToggleProps())}>{column.render('Header')}</th>
                ))}
                </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                { console.log('page  ',page)}
                {page && page.map((row) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                        })}
                        <a href="#" onClick={() => showRowData(row)}>more details</a>
                        </tr>
                        
                    )
                }
                    
                )}
                </tbody>
                </table>
                {show && <Modal details={selectedData} handleClose={hideModal} />}
     
    <div>
    
    <button className='btn' onClick={() => gotoPage(0)} disabled = {!canPreviousPage}>First</button>
    <button className='btn' onClick={() => previousPage()} disabled = {!canPreviousPage}>Previous</button>
    <button className='btn' onClick={() => nextPage()} disabled = {!canNextPage}>Next</button>
    <button className='btn' onClick={() => gotoPage(pageCount-1)} disabled = {!canNextPage}>Last</button>
    </div>
    </>

    )
}


export default Pagination;