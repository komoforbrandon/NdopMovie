import { Search } from "lucide-react"
import { useState, useEffect } from "react";
import type {SearchProp} from "../types/type"

export default function SearchBar({OnSearch, initialValue=""}:SearchProp) {
    const [searchQuery, setSearchQuery] = useState(initialValue);

    useEffect(() => {
        setSearchQuery(initialValue);
    }, [initialValue]);

    const handleSearch =() =>{
        OnSearch(searchQuery.trim());
    }

    return (
        <div className="flex items-center justify-center">
            <div className="relative w-full md:w-96">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for movies, TV shows, and more..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg bg-blue-800/10 border border-gray-300/45 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
                />
                <Search 
                className="absolute left-3 top-1/2 cursor-pointer transform -translate-y-1/2 text-gray-400" 
                onClick={handleSearch}
                aria-label="Search"
                />
            </div>
        </div>
    )
}