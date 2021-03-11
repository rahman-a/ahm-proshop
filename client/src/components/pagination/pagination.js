import {Pagination} from 'react-bootstrap'
import {useHistory, useLocation} from 'react-router-dom'

const PaginationComponent = ({count, size, page, keyword}) => {
    const history = useHistory()
    const location = useLocation()
    const counting = Math.ceil(count / size);
    const items = []
    const paginationHandler = (number) => {
        keyword 
        ? history.push(`${location.pathname}?keyword=${keyword}&page=${number}`)
        :history.push(`${location.pathname}?page=${number}`)
    }
    for (let number = 1; number <= counting; number++) {
        items.push(
          <Pagination.Item key={number} active={number === page} onClick={() => paginationHandler(number)}>
            {number}
          </Pagination.Item>,
        );
      }
    return ( 
        <>
        {
        counting > 1 && 
        <Pagination className='mt-4'>
            {items}
        </Pagination>
        }
        </>
       
     );
}
 
export default PaginationComponent;