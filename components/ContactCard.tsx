"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Mail, Phone, User, Building2, MapPin } from "lucide-react"

interface ContactCardProps {
  data: {
    title: string
    subtitle: string
    primaryContact: string
    email: string
    phone: string
    allFields: Record<string, string>
  }
  type: string
}

export default function ContactCard({ data, type }: ContactCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  const formatFieldName = (key: string) => {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase())
      .trim()
  }

  // Check if the phone field is actually a phone number or mail code
  const isPhoneNumber = (value: string) => {
    return /^\d{3}-\d{3}-\d{4}$|^\d{10}$|^$$\d{3}$$\s?\d{3}-\d{4}$/.test(value)
  }

  const isMailCode = (value: string) => {
    return value.startsWith("MC-") || value.includes("Mail Code")
  }

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200">
      <div className="p-6">
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-[#13294b] mb-1 leading-tight">{data.title}</h3>
          <p className="text-sm text-gray-600">{data.subtitle}</p>
        </div>

        {/* Key Information */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4 text-[#ff5f05] flex-shrink-0" />
            <span className="text-sm font-medium text-gray-900">{data.primaryContact}</span>
          </div>

          <div className="flex items-center space-x-2">
            <Mail className="w-4 h-4 text-[#ff5f05] flex-shrink-0" />
            <a href={`mailto:${data.email}`} className="text-sm text-blue-600 hover:text-blue-800 underline break-all">
              {data.email}
            </a>
          </div>

          {/* Conditionally render phone or mail code */}
          <div className="flex items-center space-x-2">
            {isPhoneNumber(data.phone) ? (
              <>
                <Phone className="w-4 h-4 text-[#ff5f05] flex-shrink-0" />
                <a href={`tel:${data.phone}`} className="text-sm text-gray-900 hover:text-[#ff5f05]">
                  {data.phone}
                </a>
              </>
            ) : isMailCode(data.phone) ? (
              <>
                <MapPin className="w-4 h-4 text-[#ff5f05] flex-shrink-0" />
                <span className="text-sm text-gray-900">{data.phone}</span>
              </>
            ) : (
              <>
                <Phone className="w-4 h-4 text-[#ff5f05] flex-shrink-0" />
                <span className="text-sm text-gray-900">{data.phone}</span>
              </>
            )}
          </div>
        </div>

        {/* Expanded Details */}
        {isExpanded && (
          <div className="border-t border-gray-200 pt-4 mt-4">
            <h4 className="text-sm font-semibold text-[#13294b] mb-3 flex items-center">
              <Building2 className="w-4 h-4 mr-2" />
              Complete Details
            </h4>
            <div className="space-y-2">
              {Object.entries(data.allFields).map(([key, value]) => (
                <div key={key} className="text-sm">
                  <span className="font-medium text-gray-700">{formatFieldName(key)}:</span>
                  <span className="ml-2 text-gray-900">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* View Details Button */}
        <button
          onClick={toggleExpanded}
          className="w-full mt-4 px-4 py-2 bg-[#ff5f05] text-white text-sm font-medium rounded-md hover:bg-[#e54d00] focus:outline-none focus:ring-2 focus:ring-[#ff5f05] focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center space-x-2"
          aria-expanded={isExpanded}
          aria-controls={`details-${type}-${data.title}`}
        >
          <span>{isExpanded ? "Hide Details" : "View Details"}</span>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>
    </div>
  )
}
