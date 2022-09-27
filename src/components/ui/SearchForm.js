import { useState } from "react";
import { useDispatch } from "react-redux";
import closeIcon from "../../assets/images/close.svg";
import { clearFilters, searchKeyChanged } from "../../features/filter/filterSlice";



const SearchForm = () => {
    const [searchKey, setSearchKey] = useState("")
    const dispatch = useDispatch();



    // Debounce Function. Step Two
    const debounceHandler = (fn, delay) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            setSearchKey(...args)
            timeoutId = setTimeout(() => {
                fn(...args)
            }, delay)
        }
    }


    // Action thrower. Step Three
    const doSearch = (value) => {
        dispatch(searchKeyChanged(value.toLowerCase()))
    }

    // Event Handler. Step one
    const handleSearch = debounceHandler(doSearch, 500);

    const clearSearch = () => {
        dispatch(clearFilters())
        setSearchKey("")
    }


    return (
        <div className=" flex items-center bg-gray-100 px-4 pr-0  mx-4 rounded-md overflow-hidden">
            <input
                type="text"
                placeholder="Search Project"
                value={searchKey}
                className="w-full text-lg px-0 py-1 border-none outline-none bg-gray-100 text-gray-500"
                onChange={(e) => handleSearch(e.target.value)}
            />
            <button
                type="button"
                onClick={clearSearch}
                className="appearance-none  h-12 bg-orange-400 cursor-pointer px-4 hover:bg-orange-500"
            ><img src={closeIcon} alt="Do search" className="h-8 w-8" /></button>
        </div>
    )
}

export default SearchForm