import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import * as sessionActions from '../../../store/session'


import chonkless from '../../../img/nochonk.png'

import './Albums.css'

function Albums ({albums}) {

    const sessionUser = useSelector(state => state.session.user)

    return (
        <div className='outside-grid-album'>
            {albums?.map((album, idx) => {
            return (

                <figure key={idx}>
                    {album?.Joins?.length ?
                    <Link to={`/albums/${album.id}`}><img className='photo-spread' src={album.Joins[0].Photo.url}/></Link>
                    :
                    <Link className='photo-spread' to={`/albums/${album.id}`}><img className='photo-spread' src={chonkless}/></Link>}
                    <Link className='explore-caption' to={`/albums/${album.id}`}>{album.name}</Link>

                </figure>
            )})
            }
        </div>
    )
}

export default Albums
