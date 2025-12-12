import { Pagination } from "react-bootstrap";

const Paginacion = ({ currentPage, totalPage, onPageChange }) => {
  if (totalPage <= 1) return null;

  const delta = 2;
  const pages = [];
  const start = Math.max(1, currentPage - delta);
  const end = Math.min(totalPage, currentPage + delta);

  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <div className="d-flex flex-column flex-sm-row align-items-center justify-content-between my-4 gap-2">
      <div>
        <Pagination className="mb-0 custom-pagination">
          <Pagination.First
            disabled={currentPage === 1}
            onClick={() => onPageChange(1)}
          />
          <Pagination.Prev
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
          />

          {start > 1 && (
            <>
              <Pagination.Item onClick={() => onPageChange(1)}>
                1
              </Pagination.Item>
              {start > 2 && <Pagination.Ellipsis disabled />}
            </>
          )}

          {pages.map((p) => (
            <Pagination.Item
              key={p}
              active={p === currentPage}
              onClick={() => onPageChange(p)}
            >
              {p}
            </Pagination.Item>
          ))}

          {end < totalPage && (
            <>
              {end < totalPage - 1 && <Pagination.Ellipsis disabled />}
              <Pagination.Item
                onClick={() => onPageChange(totalPage)}
              ></Pagination.Item>
            </>
          )}

          <Pagination.Next
            disabled={currentPage === totalPage}
            onClick={() => onPageChange(currentPage + 1)}
          />
          <Pagination.Last
            disabled={currentPage === totalPage}
            onClick={() => onPageChange(totalPage)}
          />
        </Pagination>
      </div>
    </div>
  );
};

export default Paginacion;
