import { useState } from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'
import { useNavigate, useParams } from 'react-router-dom'
import Buttons from '../components/Buttons'
import { SnackbarProvider, useSnackbar } from 'notistack'


const DeleteBooks = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:3000/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book deleted successfully', { variant: 'success'});
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        // alert('An error happened. Please check the console');
        enqueueSnackbar('Error', { variant: 'error'});
        console.log(error);
      })

  };

  const returnHome = () => {
    navigate('/');
  }
  return (
    <div className='p-4'>
      <Buttons />
      <h1 className='text-3xl my-4'>Delete Book</h1>
      { loading ? <Spinner /> : ''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are you sure you want to delete this book</h3>
        <div className="flex">       
        
          <button className='p-3  bg-red-600 text-white rounded-xl m-8 w-[200px]'
            onClick={handleDeleteBook}
          >Yes Delete</button>

          <button className='p-3  bg-red-600 text-white rounded-xl m-8 w-[200px]'
            onClick={returnHome}
          >No</button>
        </div>
      </div>
    </div>
    
  )
}

export default DeleteBooks