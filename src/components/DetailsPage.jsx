import React, { useState, useMemo } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

// Mock data 
const MOCK_DATA = [
  { id: 1, name: 'John Doe', email: 'john@example.com', age: 28, status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 34, status: 'Inactive' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 45, status: 'Active' },
  // Add more mock data as needed
];

const DetailsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Sorting function
  const sortedData = useMemo(() => {
    let sortableItems = [...MOCK_DATA];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [sortConfig]);

  // Filtering function
  const filteredData = useMemo(() => {
    return sortedData.filter(item => 
      Object.values(item).some(val => 
        val.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [sortedData, searchTerm]);

  // Pagination
  const paginatedData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * itemsPerPage;
    const lastPageIndex = firstPageIndex + itemsPerPage;
    return filteredData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, filteredData]);

  // Sorting handler
  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="flex flex-col md:flex-row bg-black min-h-screen text-white">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div className="md:ml-64 w-full">
        <Navbar />
        <div className="p-4 sm:p-6 md:p-8 mt-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black mb-6 sm:mb-8 text-white tracking-tight">User Details</h1>
          
          {/* Search and Filtering */}
          <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row justify-between gap-4">
            <input 
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 sm:p-3 border-2 border-gray-700 rounded-lg w-full bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          {/* Data Table */}
          <div className="overflow-x-auto">
            <table className="w-full bg-gray-900 rounded-lg sm:rounded-2xl shadow-lg sm:shadow-2xl overflow-hidden">
              <thead className="bg-gray-800">
                <tr>
                  {Object.keys(MOCK_DATA[0]).map((key) => (
                    <th 
                      key={key}
                      onClick={() => handleSort(key)}
                      className="p-2 sm:p-3 md:p-4 text-left cursor-pointer hover:bg-gray-700 transition-colors font-semibold text-xs sm:text-sm md:text-base"
                    >
                      <div className="flex items-center">
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                        {sortConfig.key === key && (
                          <span className="ml-1 sm:ml-2">
                            {sortConfig.direction === 'ascending' ? '▲' : '▼'}
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((item) => (
                  <tr key={item.id} className="border-b border-gray-700 hover:bg-gray-800 transition-colors">
                    {Object.values(item).map((val, index) => (
                      <td key={index} className="p-2 sm:p-3 md:p-4 text-xs sm:text-sm md:text-base">{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-4 sm:mt-6 text-white gap-4">
            <span className="text-gray-400 text-xs sm:text-sm">
              Page {currentPage} of {Math.ceil(filteredData.length / itemsPerPage)}
            </span>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 sm:px-4 py-1 sm:py-2 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 disabled:opacity-50 transition-colors text-xs sm:text-sm"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(prev => 
                  prev < Math.ceil(filteredData.length / itemsPerPage) 
                    ? prev + 1 
                    : prev
                )}
                disabled={currentPage >= Math.ceil(filteredData.length / itemsPerPage)}
                className="px-3 sm:px-4 py-1 sm:py-2 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 disabled:opacity-50 transition-colors text-xs sm:text-sm"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;