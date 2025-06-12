"use client"

import { useState } from "react"
import { Users } from "lucide-react"
import DepartmentHRView from "@/components/DepartmentHRView"
// import HRDepartmentBannerView from "@/components/HRDepartmentBannerView"
// import CollegeHRFEView from "@/components/CollegeHRFEView"

const tabs = [
  {
    id: "department-hr",
    label: "Department HR Contacts",
    icon: Users,
    component: DepartmentHRView,
  },
  // {
  //   id: "hr-department-banner",
  //   label: "HR Department Contacts (Banner)",
  //   icon: Building,
  //   component: HRDepartmentBannerView,
  // },
  // {
  //   id: "college-hrfe",
  //   label: "College HRFE Contacts",
  //   icon: GraduationCap,
  //   component: CollegeHRFEView,
  // },
]

export default function Home() {
  const [activeTab, setActiveTab] = useState("department-hr")

  const ActiveComponent = tabs.find((tab) => tab.id === activeTab)?.component || DepartmentHRView

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#13294b] text-white shadow-lg">
        <div className="bg-illinois-orange text-white px-3 py-2 rounded-b-lg font-bold text-xl">
          <p className="font-bold pl-8">Illinois Human Resources</p>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">HR Contacts List</h1>
          <p className="text-blue-100 text-sm sm:text-base">
            Find contact information for HR personnel across departments, colleges, and administrative units. Use the
            tabs below to navigate between different contact databases.
          </p>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10" role="tablist">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  aria-controls={`${tab.id}-panel`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors focus:outline-none focus:ring-2 focus:ring-[#ff5f05] focus:ring-offset-2 ${
                    activeTab === tab.id
                      ? "border-[#ff5f05] text-[#ff5f05]"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(" ")[0]}</span>
                </button>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div id={`${activeTab}-panel`} role="tabpanel" aria-labelledby={activeTab}>
          <ActiveComponent />
        </div>
      </main>
    </div>
  )
}
