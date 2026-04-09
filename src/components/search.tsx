import { Search } from "lucide-react"
export default function SearchBar() {
    return (
        <div className="flex items-center justify-center">
            <div className="relative w-full md:w-lg lg:w-lg max-w-2xl">
                <input
                    type="text"
                    placeholder="Search for movies, anime, and more..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg bg-blue-800/18 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
                />
                <Search className="absolute left-3 top-1/2 cursor-pointer transform -translate-y-1/2 text-gray-400" />
            </div>
        </div>
    )
}