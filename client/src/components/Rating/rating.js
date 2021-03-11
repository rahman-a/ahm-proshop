import propsType from 'prop-types'

const Rating = ({rating, review, color}) => {
    return ( 
        <div className="rating">
            <span>
                <i className={
                    rating >= 1 ? 'fas fa-star'
                    :rating >= 0.5 ? 'fas fa-star-half-alt'
                    : 'far fa-star'
                } style={{color}}></i>
            </span>
            <span>
                <i className={
                    rating >= 2 ? 'fas fa-star'
                    :rating >= 1.5 ? 'fas fa-star-half-alt'
                    : 'far fa-star'
                } style={{color}}></i>
            </span>
            <span>
                <i className={
                    rating >= 3 ? 'fas fa-star'
                    :rating >= 2.5 ? 'fas fa-star-half-alt'
                    : 'far fa-star'
                } style={{color}}></i>
            </span>
            <span>
                <i className={
                    rating >= 4 ? 'fas fa-star'
                    :rating >= 3.5 ? 'fas fa-star-half-alt'
                    : 'far fa-star'
                } style={{color}}></i>
            </span>
            <span>
                <i className={
                    rating >= 5 ? 'fas fa-star'
                    :rating >= 4.5 ? 'fas fa-star-half-alt'
                    : 'far fa-star'
                } style={{color}}></i>
            </span>
            <span style={{marginLeft:"1rem"}}>{review}</span>
        </div>
     );
}
 
Rating.defaultProps = {
    color:'#e0c60d'
}

Rating.propsType = {
    rating: propsType.number.isRequired,
    review: propsType.string,
    color:propsType.string
}

export default Rating