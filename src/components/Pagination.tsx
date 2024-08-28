import React from 'react';
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { Meals } from '../assets/types';
import arrow from '../assets/svg/menu/pagination/paginationArroww.svg';
import { useGlobalContext } from '../context/GlobalContext';
const buttonClass = `p-2 text-xs w-10 border-[1px] border-black aspect-square bg-white font-abdo 2xl:w-12 2xl:text-lg rounded-xl`;
const Pagination: React.FC = () => {
  const axiosData: any = useLoaderData();
  const data2: Meals = axiosData.data2.data;
  const currentPage = data2.data.current_page;
  const pageCount = data2.data.pages_length;

  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  const { isLangArabic } = useGlobalContext();

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
    <div className="w-full px-8 lg:px-[220px] flex justify-end items-center">
      <div className="flex justify-end items-center gap-x-2">
        <button
          className={`${buttonClass} flex justify-center items-center`}
          onClick={() => {
            const prevPage = currentPage > 1 ? currentPage - 1 : pageCount;
            handlePageChange(prevPage);
          }}
        >
          <img
            src={arrow}
            alt="leaf"
            className={` ${
              isLangArabic ? '' : ' transform scale-x-[-1]'
            } 2xl:w-4`}
          />
        </button>
        {renderPageButtons()}
        <button
          className={`${buttonClass} flex justify-center items-center`}
          onClick={() => {
            const nextPage = currentPage < pageCount ? currentPage + 1 : 1;
            handlePageChange(nextPage);
          }}
        >
          <img
            src={arrow}
            alt="leaf"
            className={` ${
              isLangArabic ? 'transform scale-x-[-1]' : ' '
            }  2xl:w-4`}
          />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
