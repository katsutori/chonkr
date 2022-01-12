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
        return (
            <>
                <div className='title-container'>
                    <h1 className='explore-title'>{workingLibrary.name}</h1>
                </div>
                <div className='outside-grid-album'>
                    <p className='nope'>There are no chonks here.</p>
                </div>
            </>

        )
    }
    return (
        <>
            <div className='title-container'>
                <h1 className='explore-title'>{workingLibrary.name}</h1>
            </div>
            <div className='outside-grid-album'>
                {workingLibrary.Joins.map((item, idx) => {
                    return (
                    <figure key={idx}>
                        <Link to ={`/photos/${item.Photo.id}`}>
                            <img className='photo-spread' src={item.Photo.url} />
                        </Link>
                    </figure>)
                })}
            </div>
        </>
    )
}

export default ViewAlbum
