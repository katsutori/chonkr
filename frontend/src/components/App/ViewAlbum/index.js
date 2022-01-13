import React from 'react'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link, useHistory } from 'react-router-dom';
import * as sessionActions from '../../../store/session'

import { getUserAlbums, deletedAlbum } from '../../../store/album';

import incineration from '../../../img/incineration.png'
import edit from '../../../img/edit.png'
import './ViewAlbum.css'

function ViewAlbum() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const albums = useSelector(state => state.albumState.entries)
    const workingLibrary = albums.find(album => album.id === +id)

    useEffect(() => {
        dispatch(sessionActions.restore())
        dispatch(getUserAlbums())
    }, [dispatch])

    const handleDelete = (e) => {
        e.preventDefault()
        dispatch(deletedAlbum(id))
        history.push('/albums')
    }

    if (!workingLibrary) {
        return (
            <>
                <div className='title-container-view-album'>
                    <h1 className='explore-title'>Loading</h1>
                </div>
                <div className='outside-grid-album'>
                    <p className='nope'>No chonks here.</p>
                </div>
            </>
        )
    }

    if (workingLibrary && !workingLibrary.Joins.length) {
        return (
            <>
                <div className='title-container-view-album'>
                    <h1 className='explore-title'>{workingLibrary.name}</h1>
                    <span className='add-album delete-album' onClick={handleDelete}><img src={incineration}/></span>
                    <Link className='add-album delete-album' to={`/albums/${id}/edit`}><img src={edit}/></Link>
                </div>
                <div className='outside-grid-album'>
                    <p className='nope'>No chonks here.</p>
                </div>
            </>

        )
    }
    return (
        <>
            <div className='title-container-view-album'>
                <h1 className='explore-title'>{workingLibrary.name}</h1>
                <span className='add-album delete-album' onClick={handleDelete}><img src={incineration}/></span>
                <Link className='add-album delete-album' to={`/albums/${id}/edit`}><img src={edit}/></Link>
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
