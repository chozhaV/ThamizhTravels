import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Users, Car, TrendingUp, AlertCircle } from 'lucide-react';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useLanguage } from '../../context/LanguageContext';

const mockUsers = [
  { id: '1', name: 'John Doe', email: 'john@example.com', phone: '+91 98765 43210', trips: 15, status: 'active' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', phone: '+91 98765 43211', trips: 8, status: 'active' },
  { id: '3', name: 'Mike Johnson', email: 'mike@example.com', phone: '+91 98765 43212', trips: 22, status: 'inactive' },
];

const mockDrivers = [
  { id: '1', name: 'Ram Kumar', email: 'ram@example.com', phone: '+91 98765 43213', vehicle: 'TN 01 AB 1234', rating: 4.8, trips: 156, status: 'online' },
  { id: '2', name: 'Vijay Anand', email: 'vijay@example.com', phone: '+91 98765 43214', vehicle: 'TN 02 CD 5678', rating: 4.6, trips: 89, status: 'offline' },
  { id: '3', name: 'Suresh Babu', email: 'suresh@example.com', phone: '+91 98765 43215', vehicle: 'TN 03 EF 9012', rating: 4.9, trips: 203, status: 'busy' },
];

export const AdminDashboard: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'users' | 'drivers'>('users');
  const [searchTerm, setSearchTerm] = useState('');

  const stats = [
    { title: 'Total Users', value: '1,234', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    { title: 'Active Drivers', value: '89', icon: Car, color: 'text-green-600', bg: 'bg-green-100' },
    { title: 'Today\'s Trips', value: '156', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-100' },
    { title: 'Pending Issues', value: '12', icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-100' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div>
          <h1 className="text-3xl font-bold text-secondary-900">Admin Dashboard</h1>
          <p className="text-secondary-600 mt-2">Manage your travel booking platform</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card hover className="p-6">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-lg ${stat.bg} flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-sm text-secondary-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-secondary-900">{stat.value}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Management Section */}
        <Card className="p-6">
          <div className="space-y-6">
            {/* Tab Navigation */}
            <div className="flex space-x-1 bg-secondary-100 p-1 rounded-lg">
              <button
                onClick={() => setActiveTab('users')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'users'
                    ? 'bg-white text-secondary-900 shadow-sm'
                    : 'text-secondary-600 hover:text-secondary-900'
                }`}
              >
                {t('manage.users')}
              </button>
              <button
                onClick={() => setActiveTab('drivers')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'drivers'
                    ? 'bg-white text-secondary-900 shadow-sm'
                    : 'text-secondary-600 hover:text-secondary-900'
                }`}
              >
                {t('manage.drivers')}
              </button>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder={`${t('search')} ${activeTab === 'users' ? 'users' : 'drivers'}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" className="flex items-center space-x-2">
                <Filter className="w-4 h-4" />
                <span>{t('filter')}</span>
              </Button>
            </div>

            {/* Data Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-secondary-200">
                    <th className="text-left py-3 px-4 font-medium text-secondary-600">Name</th>
                    <th className="text-left py-3 px-4 font-medium text-secondary-600">Contact</th>
                    {activeTab === 'users' ? (
                      <>
                        <th className="text-left py-3 px-4 font-medium text-secondary-600">Trips</th>
                        <th className="text-left py-3 px-4 font-medium text-secondary-600">Status</th>
                      </>
                    ) : (
                      <>
                        <th className="text-left py-3 px-4 font-medium text-secondary-600">Vehicle</th>
                        <th className="text-left py-3 px-4 font-medium text-secondary-600">Rating</th>
                        <th className="text-left py-3 px-4 font-medium text-secondary-600">Status</th>
                      </>
                    )}
                    <th className="text-left py-3 px-4 font-medium text-secondary-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {(activeTab === 'users' ? mockUsers : mockDrivers).map((item) => (
                    <motion.tr
                      key={item.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border-b border-secondary-100 hover:bg-secondary-50"
                    >
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium text-secondary-900">{item.name}</p>
                          <p className="text-sm text-secondary-500">{item.email}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-secondary-600">{item.phone}</td>
                      {activeTab === 'users' ? (
                        <td className="py-3 px-4 text-secondary-600">{(item as any).trips}</td>
                      ) : (
                        <>
                          <td className="py-3 px-4 text-secondary-600">{(item as any).vehicle}</td>
                          <td className="py-3 px-4 text-secondary-600">⭐ {(item as any).rating}</td>
                        </>
                      )}
                      <td className="py-3 px-4">
                        <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                          item.status === 'active' || item.status === 'online'
                            ? 'bg-green-100 text-green-800'
                            : item.status === 'busy'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <Button size="sm" variant="ghost">View</Button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};