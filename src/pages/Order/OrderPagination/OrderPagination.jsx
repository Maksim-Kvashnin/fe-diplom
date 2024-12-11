import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import AppContext from "#context/appContext";
import ReactPaginate from "react-paginate";
import OrderTrain from "../OrderTrain/OrderTrain";
import "./OrderPagination.css";

function Items({ currentItems, data }) {
  return (
    <>
      {
        data && data.items ?
        data.items.map((item, i) => (
          <OrderTrain key={i} item={item}/>
        ))
        : "Результаты не найдены"
      }
    </>
  );
}

function PaginatedItems({ itemsPerPage, routes, onChange }) {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [data, setData] = useState({});

  useEffect(() => {
    setData(routes);
    const count = [...Array(data.total_count).keys()];
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(count.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(count.length / itemsPerPage));
  }, [data, itemOffset, itemsPerPage, routes]);

  const handlePageClick = (e) => {
    const newOffset = e.selected * itemsPerPage % data.items.length;
    setItemOffset(newOffset);
  };

  const handlePage = (e) => {
    if (e.nextSelectedPage === undefined) return;
    const curOffset = itemsPerPage * e.nextSelectedPage;
    onChange(curOffset);
  };

  return (
    <>
      <Items currentItems={currentItems} data={data}/>
      {data && data.items ?
        <ReactPaginate
        className="pagination-wrapper"
        nextLabel=">"
        onPageChange={handlePageClick}
        onClick={handlePage}
        pageRangeDisplayed={2}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        previousLabel="<"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      /> : ""
      }
    </>
  );
}

function OrderPagination({routes, onChange}) {
  const {appState} = useContext(AppContext);

  const handlePage = (value) => {
    onChange(value);
  };


  return (
    <div className="order-pagination">
      <PaginatedItems itemsPerPage={appState.limit ? Number(appState.limit) : 5} routes={routes} onChange={handlePage} />
    </div>
  );
}

export default OrderPagination;


Items.propTypes = {
  currentItems: PropTypes.array, 
  data: PropTypes.object.isRequired, 
};

PaginatedItems.propTypes = {
  itemsPerPage: PropTypes.number.isRequired, 
  routes: PropTypes.object.isRequired, 
  onChange: PropTypes.func, 
};

OrderPagination.propTypes = {
  routes: PropTypes.object.isRequired, 
  onChange: PropTypes.func, 
};
