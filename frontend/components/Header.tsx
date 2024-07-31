import { FilterIcon } from '@/assets/GlobalIcons';
import { useState } from 'react';
import PropTypes from 'prop-types';

export default function Header({ tasks, unfilteredTasks, setTasks }) {
  const [searchText, setSearchText] = useState('');
  const [enableFilterDropdown,setEnableFilterDropdown] = useState(false)

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchText(searchValue);
    const filtered = unfilteredTasks.filter(task =>
      task.content.toLowerCase().includes(searchValue)
    );
    setTasks(filtered);
  };

  function handleChange(){
    console.log("first")
    setEnableFilterDropdown(false)
  }

  return (
    <div className="flex justify-end mx-[18px] gap-x-2">
       {enableFilterDropdown ? (
            <div className='custom-select'>
              <select
                className="form-control"
                name="status"
                value={'Filter'}
                onChange={handleChange}
              >
                <option value="toDo">Todo</option>
                <option value="inProgress">In Progress</option>
                <option value="underReview">Under Review</option>
                <option value="completed">Completed</option>
              </select>
              </div>
      ):""}
      <div className="flex items-center">
        <button className="px-2 py-1 border border-gray-100 rounded-xl" onClick={()=>setEnableFilterDropdown((prev)=> !prev)}>
          <FilterIcon />
        </button>
      </div>
      <div className="w-[300px]">
        <input
          type="text"
          id="first_name"
          className="bg-gray-50 border !border-gray-300 text-gray-900 text-sm rounded-lg !focus:ring-gray-100 focus:border-red-100 w-full p-2.5"
          placeholder="Search"
          value={searchText}
          onChange={handleSearch}
        />
      </div>
     
    </div>
  );
}

Header.propTypes = {
  tasks: PropTypes.array.isRequired,
  unfilteredTasks: PropTypes.array.isRequired,
  setTasks: PropTypes.func.isRequired,
};
