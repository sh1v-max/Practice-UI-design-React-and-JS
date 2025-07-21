import React, { useState } from 'react'
import { Search, TrendingUp} from 'lucide-react';

const DashboardTab = () => {
  const [stats, setStats] = useState([
    { label: 'Total Sales', value: '$12,345', change: '+12%', positive: true },
    { label: 'Active Users', value: '1,234', change: '+5%', positive: true },
    { label: 'Revenue', value: '$45,678', change: '-2%', positive: false },
    { label: 'Orders', value: '567', change: '+8%', positive: true }
  ]);

  const [tasks] = useState([
    { id: 1, task: 'Review quarterly reports', completed: false },
    { id: 2, task: 'Update user documentation', completed: true },
    { id: 3, task: 'Schedule team meeting', completed: false },
    { id: 4, task: 'Deploy new features', completed: true }
  ]);
  
  return (
    <div className="dashboard-content">
      <div className="search-bar">
        <Search size={16} />
        <input type="text" placeholder="Search dashboard..." />
      </div>
      
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
            <div className={`stat-change ${stat.positive ? 'positive' : 'negative'}`}>
              <TrendingUp size={14} />
              {stat.change}
            </div>
          </div>
        ))}
      </div>

      <div className="recent-activity">
        <h3>Recent Tasks</h3>
        <div className="task-list">
          {tasks.map(task => (
            <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
              <input type="checkbox" checked={task.completed} readOnly />
              <span>{task.task}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardTab