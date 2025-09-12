import React, { useState } from 'react'
import {
  FiDollarSign,
  FiHome,
  FiLink,
  FiPaperclip,
  FiUsers,
} from 'react-icons/fi'

export const RouteSelect = () => {
  const [active, setActive] = useState('Dashboard') // default active

  const routes = [
    { title: 'Dashboard', Icon: FiHome },
    { title: 'Team', Icon: FiUsers },
    { title: 'Invoices', Icon: FiPaperclip },
    { title: 'Integrations', Icon: FiLink },
    { title: 'Finance', Icon: FiDollarSign },
  ]

  return (
    <div className="space-y-1">
      {routes.map(({ title, Icon }) => (
        <Route
          key={title}
          Icon={Icon}
          title={title}
          selected={active === title}
          onClick={() => setActive(title)}
        />
      ))}
    </div>
  )
}

const Route = ({ selected, Icon, title, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-start gap-2 w-full rounded px-2 py-1.5 text-sm transition-all
        ${
          selected
            ? 'bg-white text-stone-950 shadow hover:bg-stone-100'
            : 'bg-transparent text-stone-500 hover:bg-stone-200'
        }`}
    >
      <Icon className={selected ? 'text-violet-500' : ''} />
      <span>{title}</span>
    </button>
  )
}
