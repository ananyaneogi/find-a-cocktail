import React from 'react'

const FilledBookmarkIcon = ({ showInfo }) => {
  return (
    <React.Fragment>
        <svg viewBox="0 0 32 32" className="nav-bookmark-icon"><path d="M25,27l-9-6.75L7,27V4h18V27z"/></svg>
          {showInfo ? <small style={{
            display: 'block',
            position: 'relative',
            right: '16px'}}> Saved!</small> : ''}
    </React.Fragment>
  )
}

export default FilledBookmarkIcon;