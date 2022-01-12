import React from 'react'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import * as sessionActions from '../../../store/session'

import { getUserAlbums } from '../../../store/album';

import './ViewAlbum.css'

function ViewAlbum() {
    const { id } = useParams()
    console.log(id)
    const dispatch = useDispatch()
    const albums = useSelector(state => state.albumState.entries)
    const workingLibrary = albums.find(album => album.id === +id)

    useEffect(() => {
        dispatch(sessionActions.restore())
        dispatch(getUserAlbums())
    }, [dispatch])

    if (!workingLibrary) {
        return (
            <>
                <div className='title-container'>
                    <h1 className='explore-title'>Loading</h1>
                </div>
                <div className='outside-grid-album'>
                    <p className='nope'>There are no chonks here.</p>
                </div>
            </>
        )
    }

    if (workingLibrary && !workingLibrary.Joins.length) {
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
