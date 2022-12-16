import { useEffect, useState } from "react";
import styles from "styles/shared/components/pagination.module.css";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function Pagination({
  pageCount,
  onPageChange,
}: {
  pageCount: number;
  onPageChange?: (page: number) => void;
}) {
  const handlePageChange = (page: number) => {
    setCurrentPage(page);

    if (!onPageChange) return;

    onPageChange(page);
  };

  const handleButtonClick = (direction: string) => {
    let newPage = currentPage;
    if (direction === PrevPage) {
      newPage = currentPage > 0 ? currentPage - 1 : 0;
    } else if (direction === NextPage) {
      newPage = currentPage + 1 === pageCount ? currentPage : currentPage + 1;
    }
    setCurrentPage(newPage);
    if (newPage === currentPage) return;

    handlePageChange(newPage);
  };

  const [currentPage, setCurrentPage] = useState(0);

  return (
    <div className={styles.container}>
      <SideButton
        pageCount={pageCount}
        direction={PrevPage}
        handleButtonClick={handleButtonClick}
      />
      {pageCount <= 5 ? (
        <ShowAllPagination
          pageCount={pageCount}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      ) : (
        <ShowTruncatedPagination
          pageCount={pageCount}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      )}
      <SideButton
        pageCount={pageCount}
        direction={NextPage}
        handleButtonClick={handleButtonClick}
      />
    </div>
  );
}

function ShowTruncatedPagination({
  pageCount,
  currentPage,
  handlePageChange,
}: {
  pageCount: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
}) {
  const [arr, setArr] = useState<number[]>([]);
  useEffect(() => {
    if (currentPage > 4) {
      setArr(
        Array.from(Array(pageCount).keys()).slice(
          currentPage - 3,
          currentPage + 2
        )
      );
    } else {
      setArr(Array.from(Array(pageCount).keys()).slice(0, 5));
    }
  }, [currentPage, pageCount]);

  return (
    <>
      {arr.map((x, index) => {
        return (
          <Button
            key={x}
            index={x}
            currentPage={currentPage}
            pageCount={pageCount}
            handlePageChange={handlePageChange}
          />
        );
      })}
    </>
  );
}

function ShowAllPagination({
  pageCount,
  currentPage,
  handlePageChange,
}: {
  pageCount: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
}) {
  return (
    <>
      {Array(pageCount)
        .fill(1)
        .map((x, index) => {
          return (
            <Button
              key={index}
              index={index}
              currentPage={currentPage}
              pageCount={pageCount}
              handlePageChange={handlePageChange}
            />
          );
        })}
    </>
  );
}

function Button({
  index,
  handlePageChange,
  currentPage,
  pageCount,
}: {
  index: number;
  handlePageChange: (page: number) => void;
  currentPage: number;
  pageCount: number;
}) {
  return (
    <button
      disabled={pageCount <= 1}
      className={
        currentPage === index ? styles.buttonActive : styles.buttonInactive
      }
      onClick={() => handlePageChange(index)}
      key={index}
    >
      {index + 1}
    </button>
  );
}

function SideButton({
  pageCount,
  direction,
  handleButtonClick,
}: {
  pageCount: number;
  direction: string;
  handleButtonClick: (direction: string) => void;
}) {
  return (
    <button
      disabled={pageCount <= 1}
      className={styles.button}
      onClick={() => handleButtonClick(direction)}
    >
      {direction === PrevPage ? <FiChevronLeft /> : <FiChevronRight />}
    </button>
  );
}

const PrevPage = "Prev";
const NextPage = "Next";
