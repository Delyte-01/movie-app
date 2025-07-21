import SearchBar from '@/component/search-bar'
import React from 'react'

const SearchPage = () => {
  return (
      <div className='container mx-auto px-4 py-8 space-y-6'>
          <SearchBar />
          <p className="text-center text-muted-foreground mt-4">
            Search for movies, TV shows, and more using the search bar above.
          </p>

    </div>
  )
}

export default SearchPage