/*
  eslint-disable jsx-a11y/click-events-have-key-events,
  jsx-a11y/no-noninteractive-element-interactions
*/
import React from 'react';
import { usePagination, DOTS } from '../../hooks/usePagination';
import './Pagination.css';

/*
    Pagination component
*/
function Pagination(props) {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }
  const onNext = () => {
    onPageChange(currentPage + 1);
  };
  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };
  const lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul
      id="pagination"
      className="pagionation-container"
    >
      <li
        id="al"
        className={currentPage === 1
          ? 'pagination-item disabled'
          : 'pagination-item'}
        onClick={onPrevious}
      >
        <div id="arrow_left" className="arrow left" />
      </li>
      {paginationRange.map((pageNumber) => {
        if (pageNumber === DOTS) {
          return <li id="DOTS" className="pagination-item dots">&#8230;</li>;
        }
        return (
          <li
            id={pageNumber}
            className={
                            currentPage === pageNumber
                              ? 'pagination-item selected'
                              : 'pagination-item'
                            }
            onClick={() => onPageChange(pageNumber)}
            onKeyPress={() => {}}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        id="ar"
        className={currentPage === lastPage
          ? 'pagination-item disabled'
          : 'pagination-item'}
        onClick={onNext}
      >
        <div id="arrow_right" className="arrow right" />
      </li>
    </ul>
  );
}

export default Pagination;
