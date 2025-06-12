"use client"

import { useState, useMemo } from "react"
import ContactCard from "./ContactCard"
import SearchFilter from "./SearchFilter"
import Pagination from "./Pagination"
import collegeHRFEContactsData from "@/data/collegeHRFEContacts.json"

const ITEMS_PER_PAGE = 12

export default function CollegeHRFEView() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const filteredData = useMemo(() => {
    if (!searchTerm) return collegeHRFEContactsData

    return collegeHRFEContactsData.filter((contact) =>
      Object.values(contact).some((value) => value.toLowerCase().includes(searchTerm.toLowerCase())),
    )
  }, [searchTerm])

  // Reset to page 1 when search changes
  useMemo(() => {
    setCurrentPage(1)
  }, [searchTerm])

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    return filteredData.slice(startIndex, endIndex)
  }, [filteredData, currentPage])

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE)

  const getCardData = (contact: (typeof collegeHRFEContactsData)[0]) => ({
    title: contact["College code and descriptor"],
    subtitle: `Role: ${contact["Budget or HR Role"]}`,
    primaryContact: contact["College contact(s)"],
    email: contact["Contact email "],
    phone: contact["Phone number"],
    allFields: contact,
  })

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Scroll to top of the content area
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-[#13294b]">College HRFE Contacts</h2>
          <p className="text-gray-600 text-sm mt-1">
            {filteredData.length === collegeHRFEContactsData.length ? (
              <>Total of {collegeHRFEContactsData.length} contacts</>
            ) : (
              <>
                {filteredData.length} of {collegeHRFEContactsData.length} contacts found
              </>
            )}
          </p>
        </div>
      </div>

      <SearchFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder="Search by college, contact name, role, or email..."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedData.map((contact, index) => (
          <ContactCard key={`${currentPage}-${index}`} data={getCardData(contact)} type="college-hrfe" />
        ))}
      </div>

      {filteredData.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No contacts found matching your search criteria.</p>
          <p className="text-gray-400 text-sm mt-2">Try adjusting your search terms or clearing the search.</p>
        </div>
      )}

      {filteredData.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredData.length}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  )
}
