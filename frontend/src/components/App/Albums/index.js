import './Albums.css'

import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import * as sessionActions from '../../../store/session'

import { getUserAlbums } from '../../../store/album'

function Albums ({albums}) {
    const dispatch = useDispatch()
    return (
        <>
            {albums.map(album => <li className='proto-album' key={album.id}>{album.name}</li>)}
        </>
    )
}

export default Albums
