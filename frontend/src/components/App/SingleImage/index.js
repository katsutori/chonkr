import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import * as sessionActions from '../../../store/session'
import './SingleImage.css'

const PhotoDetail = () => {
    const { id } = useParams()
    const all = useSelector(state => state.photoState.entries)
    const single = all.find(one => one.id === +id)

    return (
        <div className='single-image-container'>
            <img src={single.url} />
            <h1>{single.title}</h1>
            <p>{single.description}</p>
            <p>{single.dateTaken}</p>

        </div>
    )
}

export default PhotoDetail
