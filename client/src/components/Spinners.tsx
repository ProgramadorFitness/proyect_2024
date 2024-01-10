import React from 'react';
import { HashLoader } from 'react-spinners';

interface Props {
    loading: boolean;
}

const Spinners = ( { loading } : Props) => {


  return (
    <div>
        <HashLoader color="#36d7b7" loading={loading}/>
    </div>
  )
}

export default Spinners