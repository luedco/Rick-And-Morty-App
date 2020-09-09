import React from 'react';
import { ListGroup } from 'react-bootstrap';



const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= 14; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <a onClick={() => paginate(number)} href='!#' className='page-link'>
              {number}
            </a>
          </li>
        ))}
      </ul>
      
    </nav>
  );
};

export default Pagination;