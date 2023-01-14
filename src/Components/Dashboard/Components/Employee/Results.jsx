import React, { useState, useEffect } from "react";
import "./Employee.css";
import ReactPaginate from "react-paginate";
import InfoBar from "./InfoBar";

export default function Results({ employees }) {
  const items = employees;
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [barOpen, setBarOpen] = useState(false);
  useEffect(() => {
    function handleResize() {
      const wide = window.matchMedia("(min-width: 1900px)");
      let wideScreen = wide.matches;
      if (wideScreen) {
        setItemsPerPage(12);
        console.log(itemsPerPage);
      } else {
        setItemsPerPage(6);
        console.log(itemsPerPage);
      }
    }
    window.addEventListener("resize", handleResize);
  }, []);

  function openBar() {
    setBarOpen(!barOpen)
  }
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, , items]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };
  return (
    <div className="employee-results">
      {currentItems && (
        <div className="results-container">
          {currentItems.map((emp) => {
            return (
              <div className="emp-card">
                <div className="emp-card-upper">
                  <div className="emp-card-pfp"></div>
                </div>
                <div className="emp-card-lower">
                  <h4>
                    {emp.firstName} {emp.lastName}
                  </h4>
                  <p>{emp.position}</p>
                </div>
                <div className="emp-card-more" onClick={openBar}>More</div>
              </div>
            );
          })}
        </div>
      )}

      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
      <InfoBar barOpen={barOpen} />
    </div>
  );
}
