import ReactPaginate from 'react-paginate';

function PaginatedItems({ pageCount, cb, itemPerPage, page }) {
  // We start with an empty list of items.
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    //   event.selected
    // const newOffset = (event.selected * itemsPerPage) % items.length;
    cb(event.selected);
  };

  return (
    <>
      <ReactPaginate
        breakLabel={<div>...</div>}
        forcePage={page}
        previousLinkClassName="bg-white shadow-sm flex items-center justify-center w-auto  h-8 rounded-full px-4 select-none truncate"
        nextLinkClassName="bg-white shadow-sm flex items-center justify-center w-auto  h-8 rounded-full px-4 select-none truncate"
        pageLinkClassName="bg-white shadow-sm flex items-center justify-center w-8  h-8 rounded-full select-none"
        className="space-x-2 flex items-center m-2 justify-end"
        activeLinkClassName="bg-indigo-500 text-white rounded-full"
        nextLabel={'>'}
        onPageChange={handlePageClick}
        pageRangeDisplayed={itemPerPage}
        pageCount={pageCount}
        previousLabel="<"
      />
    </>
  );
}

export default PaginatedItems;
