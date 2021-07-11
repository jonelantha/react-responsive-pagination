import styled from 'styled-components';

const Bootstrap4PaginationStyles = styled.div`
  /* adapted from Bootstrap */
  .page-link {
    text-decoration: none;
  }

  .pagination {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  /* from Bootstrap */
  .justify-content-start {
    justify-content: flex-start !important;
  }

  .justify-content-end {
    justify-content: flex-end !important;
  }

  .justify-content-center {
    justify-content: center !important;
  }

  @media (min-width: 576px) {
    .justify-content-sm-start {
      justify-content: flex-start !important;
    }

    .justify-content-sm-end {
      justify-content: flex-end !important;
    }

    .justify-content-sm-center {
      justify-content: center !important;
    }

    .justify-content-sm-between {
      justify-content: space-between !important;
    }

    .justify-content-sm-around {
      justify-content: space-around !important;
    }
  }

  @media (min-width: 992px) {
    .justify-content-lg-start {
      justify-content: flex-start !important;
    }

    .justify-content-lg-end {
      justify-content: flex-end !important;
    }

    .justify-content-lg-center {
      justify-content: center !important;
    }

    .justify-content-lg-between {
      justify-content: space-between !important;
    }

    .justify-content-lg-around {
      justify-content: space-around !important;
    }
  }
  @media (min-width: 1200px) {
    .justify-content-xl-start {
      justify-content: flex-start !important;
    }

    .justify-content-xl-end {
      justify-content: flex-end !important;
    }

    .justify-content-xl-center {
      justify-content: center !important;
    }

    .justify-content-xl-between {
      justify-content: space-between !important;
    }

    .justify-content-xl-around {
      justify-content: space-around !important;
    }
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .pagination {
    display: flex;
    padding-left: 0;
    list-style: none;
    border-radius: 0.25rem;
  }

  .page-link {
    position: relative;
    display: block;
    padding: 0.5rem 0.75rem;
    margin-left: -1px;
    line-height: 1.25;
    color: #007bff;
    background-color: #fff;
    border: 1px solid #dee2e6;
  }

  .page-link:hover {
    z-index: 2;
    color: #0056b3;
    text-decoration: none;
    background-color: #e9ecef;
    border-color: #dee2e6;
  }

  .page-link:focus {
    z-index: 3;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }

  .page-item:first-child .page-link {
    margin-left: 0;
    border-top-left-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem;
  }

  .page-item:last-child .page-link {
    border-top-right-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;
  }

  .page-item.active .page-link {
    z-index: 3;
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
  }

  .page-item.disabled .page-link {
    color: #6c757d;
    pointer-events: none;
    cursor: auto;
    background-color: #fff;
    border-color: #dee2e6;
  }

  .pagination-lg .page-link {
    padding: 0.75rem 1.5rem;
    font-size: 1.25rem;
    line-height: 1.5;
  }

  .pagination-lg .page-item:first-child .page-link {
    border-top-left-radius: 0.3rem;
    border-bottom-left-radius: 0.3rem;
  }

  .pagination-lg .page-item:last-child .page-link {
    border-top-right-radius: 0.3rem;
    border-bottom-right-radius: 0.3rem;
  }

  .pagination-sm .page-link {
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
    line-height: 1.5;
  }

  .pagination-sm .page-item:first-child .page-link {
    border-top-left-radius: 0.2rem;
    border-bottom-left-radius: 0.2rem;
  }

  .pagination-sm .page-item:last-child .page-link {
    border-top-right-radius: 0.2rem;
    border-bottom-right-radius: 0.2rem;
  }
`;

export default Bootstrap4PaginationStyles;
