import {FilterIcon} from '@/assets/GlobalIcons'
export default function Header(){
  return (
    <div className="flex justify-end mx-[18px] gap-x-2">
      <div className="flex item-center">
        <button className="px-2 py-1 border border-gray-100 rounded-xl">
          <FilterIcon />
        </button>
      </div>
      <div className="w-[300px]">
        <input
          type="text"
          id="first_name"
          className="bg-gray-50 border !border-gray-300 text-gray-900 text-sm rounded-lg !focus:ring-gray-100 focus:border-red-100 w-full p-2.5"
          placeholder="Search"
        />
      </div>
    </div>
  );
};
