import React from 'react';
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { MenuLoader } from '../assets/types';
const buttonClass = `p-2 text-xs w-10 border-[1px] border-black aspect-square bg-white font-abdo`;
const Pagination: React.FC = () => {
  const { data2 } = useLoaderData() as MenuLoader;
  const currentPage = data2.data.data.current_page; // Fallback to page 1 if NaN
  const pageCount = data2.data.data.pages_length; // Fallback to 10 if not provided

  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const handlePageChange = (pageNumber: number) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set('page', pageNumber.toString());
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const renderPageButtons = () => {
    const pageButtons: JSX.Element[] = [];
    const maxButtons = currentPage + 1; // Adjust the number of buttons displayed

    let startPage = Math.max(currentPage - Math.floor(maxButtons / 2), 1);
    let endPage = startPage + maxButtons - 1;

    if (endPage > pageCount) {
      endPage = pageCount;
      startPage = Math.max(endPage - maxButtons + 1, 1);
    }

    if (startPage > 1) {
      pageButtons.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className={buttonClass}
        >
          1
        </button>
      );

      if (startPage > 2) {
        pageButtons.push(
          <button key="start-ellipsis" className={buttonClass}>
            ...
          </button>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`${buttonClass} ${
            i === currentPage
              ? 'text-newRed border-newRed'
              : 'text-black border-black'
          }`}
        >
          {i}
        </button>
      );
    }

    if (endPage < pageCount) {
      if (endPage < pageCount - 1) {
        pageButtons.push(
          <button key="end-ellipsis" disabled className={buttonClass}>
            ...
          </button>
        );
      }

      pageButtons.push(
        <button
          key={pageCount}
          onClick={() => handlePageChange(pageCount)}
          className={buttonClass}
        >
          {pageCount}
        </button>
      );
    }

    return pageButtons;
  };

  if (pageCount < 2) return null;

  return (
    <div className="w-full px-8 lg:px-20 flex justify-end items-center">
      <div className="flex justify-end items-center gap-x-2">
        <button
          className={buttonClass}
          onClick={() => {
            const prevPage = currentPage > 1 ? currentPage - 1 : pageCount;
            handlePageChange(prevPage);
          }}
        >
          Prev
        </button>
        {renderPageButtons()}
        <button
          className={buttonClass}
          onClick={() => {
            const nextPage = currentPage < pageCount ? currentPage + 1 : 1;
            handlePageChange(nextPage);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
