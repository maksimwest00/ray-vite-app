import React from 'react';

import LoadingGif from '../static/images/loading.gif'

function Loading() {
  return (
    <div className='loading-container'>
      <img src={LoadingGif} alt="Loading..."/>
    </div>
  );
}

export default Loading;