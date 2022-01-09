import './Explore.css'

function Explore ({photos}) {
    return (
        <div className='outside-grid'>
                {photos?.map((photo, idx) => (

                    <figure  key={idx}>
                        <img className='photo-spread' src={photo.url} />
                    </figure>

                ))}
        </div>
    )
}

export default Explore
