import React from 'react'
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import './ViewAlbum.css'


function ViewAlbum() {
    const { id } = useParams()
    const albums = useSelector(state => state.albumState.entries)
    const workingLibrary = albums.find(album => album.id === +id)

    // const photoLibrary = workingLibrary.Joins.filter(item => item.Photo)
    // console.log(photoLibrary)

    if (!workingLibrary.Joins.length) {
        console.log(workingLibrary.Joins.length)
        return (
            <p className='nope'>There are no chonks here.</p>
        )
    }
    return (
        <div className='outside-grid-album'>
            {workingLibrary.Joins.map((item, idx) => {
                {console.log('helllllllllo', item.Photo)}
                return (
                <figure key={idx}>
                    <Link to ={`/photos/${item.Photo.id}`}>
                        <img className='photo-spread' src={item.Photo.url} />
                    </Link>
                </figure>)
            })}
        </div>
    )
}

export default ViewAlbum
