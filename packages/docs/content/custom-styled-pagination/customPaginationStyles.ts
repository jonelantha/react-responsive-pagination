export const customStyles1 = `
.pagination {
  justify-content: center;
  display: flex;
  padding-left: 0;
  list-style: none;
}

.page-item .page-link {
  position: relative;
  display: block;
  margin: 0 10px;
  color: #007bff;
  text-decoration: none;
}

.page-item.active .page-link {
  font-weight: bold;
}

.page-item.disabled .page-link {
  color: #6c757d;
  pointer-events: none;
  cursor: auto;
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
}`;

export const customStyles2 = `
.pagination {
  justify-content: center;
  display: flex;
  padding-left: 0;
  list-style: none;
}

.page-item .page-link {
  position: relative;
  display: block;
  margin: 0 2px;
  border: 1px solid #cccccc;
  padding: 5px 10px;
  border-radius: 5px;
  color: #007bff;
  text-decoration: none;
}

.page-item a.page-link:hover {
  background-color: #cccccc;
}

.page-item.active .page-link {
  color: #ffffff;
  background-color: #007bff;
}

.page-item.disabled .page-link {
  color: #6c757d;
  pointer-events: none;
  cursor: auto;
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
`;

export const customStyles3 = `
.pagination {
  justify-content: center;
  display: flex;
  padding-left: 0;
  list-style: none;
}

.page-item .page-link {
  position: relative;
  display: block;
  margin: 0 5px;
  min-height: 40px;
  min-width: 40px;
  border-radius: 20px;
  text-align: center;
  line-height: 40px;
  color: #007bff;
  text-decoration: none;
}

.page-item a.page-link:hover {
  background-color: #cccccc;
}

.page-item.active .page-link {
  font-weight: 700;
  color: #ffffff;
  background-color: #007bff;
}

.page-item.disabled .page-link {
  color: #6c757d;
  pointer-events: none;
  cursor: auto;
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
}`;

export const minimumBootstrap4Styles = `
.pagination {
  display: -ms-flexbox;
  display: flex;
  padding-left: 0;
  list-style: none;
  border-radius: 0.25rem;
}

.justify-content-center {
  justify-content: center !important;
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
`;
