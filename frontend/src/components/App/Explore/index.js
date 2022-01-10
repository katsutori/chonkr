import { Link } from 'react-router-dom'
import './Explore.css'

function Explore ({photos}) {
    return (
        <div className='outside-grid'>
                {photos?.map((photo, idx) => (

                    <figure  key={idx}>
                        <Link to={`/photos/${photo.id}`}>
                            <img className='photo-spread' src={photo.url} />
                        </Link>
                    </figure>

                ))}
        </div>
    )
}

export default Explore
