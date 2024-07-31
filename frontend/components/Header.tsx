import { FilterIcon, SearchIcon } from '@/assets/GlobalIcons';
import { useState } from 'react';
import PropTypes from 'prop-types';

export default function Header({ tasks, unfilteredTasks, setTasks }) {
  const [searchText, setSearchText] = useState('');
  const [priority, setPriority] = useState('');

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchText(searchValue);
    const filtered = unfilteredTasks.filter(task =>
      task.content.toLowerCase().includes(searchValue)
    );
    setTasks(filtered);
  };

  const handleChange = (e) => {
    const priorityValue = e.target.value;
    setPriority(priorityValue);
    const filtered = priorityValue
      ? unfilteredTasks.filter(task => task.priority === priorityValue)
      : unfilteredTasks;
    setTasks(filtered);
  };

  return (
    <div className="flex justify-end mx-[18px] gap-x-2">
      <div className="relative flex items-center w-[150px]">
        <select
          className="form-control appearance-none w-full pr-10 pl-4 py-2 rounded-lg border border-gray-300 text-gray-900 bg-gray-50 focus:outline-none focus:ring-gray-100 focus:border-red-100"
          name="priority"
          value={priority}
          onChange={handleChange}
        >
          <option value="">All</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="Urgent">Urgent</option>
        </select>
        <div className="absolute right-0 top-0 h-full w-10 flex items-center justify-center pointer-events-none">
          <FilterIcon />
        </div>
      </div>
      <div className="relative w-[300px]">
        <input
          type="text"
          id="search"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg pr-10 pl-4 py-2 focus:ring-gray-100 focus:border-red-100 w-full"
          placeholder="Search"
          value={searchText}
          onChange={handleSearch}
        />
        <div className="absolute right-0 top-0 h-full w-10 flex items-center justify-center pointer-events-none">
          <SearchIcon />
        </div>
      </div>
    </div>
  );
}

Header.propTypes = {
  tasks: PropTypes.array.isRequired,
  unfilteredTasks: PropTypes.array.isRequired,
  setTasks: PropTypes.func.isRequired,
};
