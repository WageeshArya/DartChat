import React from 'react';
import './Loading.scss';
import loading from '../../background/loading.svg';
export const Loading = () => {
  return (
    <div className="loadingContainer">
      <img src={loading} alt="loading" />
    </div>
  )
}

export default Loading;