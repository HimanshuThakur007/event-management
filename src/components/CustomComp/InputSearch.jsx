import React from 'react';
import { Input } from "antd";

const InputSearch = (props) => {
    const [searchText, setSearchText] = React.useState("");
  return (
    <div>
        <Input.Search
                    placeholder="Search Here"
                    style={{ marginBottom: 8 }}
                    onSearch={(value) => {
                      props.search1(value);
                    }}
                    onChange={(e) => {
                      props.search2(e.target.value);
                    }}
                  />
    </div>
  )
}

export default InputSearch