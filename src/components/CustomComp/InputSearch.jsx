import React from "react";
import { Input } from "antd";

const InputSearch = (props) => {
  return (
    <div>
      <Input.Search
        placeholder="Search Here"
        className="status-toggle"
        onSearch={(value) => {
          props.search1(value);
        }}
        onChange={(e) => {
          props.search2(e.target.value);
        }}
      />
    </div>
  );
};

export default InputSearch;
