import { Search } from "lucide-react"
import { useState, useEffect } from "react";
import type {SearchProp} from "../types/type"

export default function SearchBar({OnSearch, initialValue=""}:SearchProp) {
    const [searchQuery, setSearchQuery] = useState(initialValue);

    useEffect(() => {
        setSearchQuery(initialValue);
    }, [initialValue]);

    const handleSearch =() =>{
        const query = searchQuery.trim();

        if (!query) {
            return;
        }

        OnSearch(query);
    }

    return (
        <form
            className="flex items-center justify-center"
            onSubmit={(event) => {
                event.preventDefault();
                handleSearch();
            }}
        >
            <div className="relative w-full md:w-96">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for movies, TV shows, and more..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg bg-blue-800/10 border border-gray-300/45 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
                />
                <button
                    type="submit"
                    className="absolute left-3 top-1/2 cursor-pointer -translate-y-1/2 transform text-gray-400"
                    aria-label="Search"
                >
                    <Search />
                </button>
            </div>
        </form>
    )
}
