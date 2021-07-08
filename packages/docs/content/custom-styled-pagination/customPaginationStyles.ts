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
