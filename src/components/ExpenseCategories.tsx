'use client';

import React, { useState, useMemo } from 'react';
import { 
  PieChart, 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight, 
  ArrowDownRight,
  Filter
} from 'lucide-react';
import { 
  PieChart as RechartsPieChart, 
  Cell, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Pie,
  LineChart,
  Line
} from 'recharts';
import { useExpenses } from '@/hooks/useExpenses';
import { formatCurrency, getCategoryColor } from '@/lib';
import { ExpenseCategory, ExpenseFilters } from '@/types';
import { startOfMonth, endOfMonth, subMonths, isWithinInterval, parseISO, format } from 'date-fns';

const CATEGORY_COLORS = {
  Food: '#f97316',
  Transportation: '#3b82f6',
  Entertainment: '#8b5cf6',
  Shopping: '#ec4899',
  Bills: '#ef4444',
  Other: '#6b7280',
};

type TimeFrame = 'current-month' | 'last-month' | 'last-3-months' | 'all-time';

interface CategoryStats {
  category: ExpenseCategory;
  amount: number;
  percentage: number;
  expenseCount: number;
  averageAmount: number;
  trend: 'up' | 'down' | 'neutral';
  trendPercentage: number;
  color: string;
}

interface MonthlyData {
  month: string;
  [key: string]: string | number;
}

export const ExpenseCategories: React.FC = () => {
  const { expenses, getFilteredExpenses } = useExpenses();
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('current-month');
  const [sortBy, setSortBy] = useState<'amount' | 'percentage' | 'count'>('amount');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const { filteredExpenses, categoryStats, pieChartData, monthlyTrends } = useMemo(() => {
    const now = new Date();
    let startDate: Date;
    let endDate: Date = now;
    let comparisonStartDate: Date;
    let comparisonEndDate: Date;

    switch (timeFrame) {
      case 'current-month':
        startDate = startOfMonth(now);
        endDate = endOfMonth(now);
        comparisonStartDate = startOfMonth(subMonths(now, 1));
        comparisonEndDate = endOfMonth(subMonths(now, 1));
        break;
      case 'last-month':
        startDate = startOfMonth(subMonths(now, 1));
        endDate = endOfMonth(subMonths(now, 1));
        comparisonStartDate = startOfMonth(subMonths(now, 2));
        comparisonEndDate = endOfMonth(subMonths(now, 2));
        break;
      case 'last-3-months':
        startDate = startOfMonth(subMonths(now, 2));
        endDate = endOfMonth(now);
        comparisonStartDate = startOfMonth(subMonths(now, 5));
        comparisonEndDate = endOfMonth(subMonths(now, 3));
        break;
      case 'all-time':
      default:
        startDate = new Date(0);
        endDate = now;
        comparisonStartDate = new Date(0);
        comparisonEndDate = new Date(0);
        break;
    }

    const filters: ExpenseFilters = {
      dateFrom: startDate,
      dateTo: endDate,
    };

    const comparisonFilters: ExpenseFilters = {
      dateFrom: comparisonStartDate,
      dateTo: comparisonEndDate,
    };

    const filteredExpenses = getFilteredExpenses(filters);
    const comparisonExpenses = timeFrame !== 'all-time' ? getFilteredExpenses(comparisonFilters) : [];

    const totalAmount = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);

    const categorySummary: Record<ExpenseCategory, number> = {
      Food: 0,
      Transportation: 0,
      Entertainment: 0,
      Shopping: 0,
      Bills: 0,
      Other: 0,
    };

    const categoryCount: Record<ExpenseCategory, number> = {
      Food: 0,
      Transportation: 0,
      Entertainment: 0,
      Shopping: 0,
      Bills: 0,
      Other: 0,
    };

    const comparisonCategorySummary: Record<ExpenseCategory, number> = {
      Food: 0,
      Transportation: 0,
      Entertainment: 0,
      Shopping: 0,
      Bills: 0,
      Other: 0,
    };

    filteredExpenses.forEach(expense => {
      categorySummary[expense.category] += expense.amount;
      categoryCount[expense.category] += 1;
    });

    comparisonExpenses.forEach(expense => {
      comparisonCategorySummary[expense.category] += expense.amount;
    });

    const categoryStats: CategoryStats[] = Object.entries(categorySummary).map(([category, amount]) => {
      const cat = category as ExpenseCategory;
      const count = categoryCount[cat];
      const percentage = totalAmount > 0 ? (amount / totalAmount) * 100 : 0;
      const averageAmount = count > 0 ? amount / count : 0;
      
      const comparisonAmount = comparisonCategorySummary[cat];
      let trend: 'up' | 'down' | 'neutral' = 'neutral';
      let trendPercentage = 0;

      if (timeFrame !== 'all-time' && comparisonAmount > 0) {
        trendPercentage = ((amount - comparisonAmount) / comparisonAmount) * 100;
        trend = trendPercentage > 5 ? 'up' : trendPercentage < -5 ? 'down' : 'neutral';
      }

      return {
        category: cat,
        amount,
        percentage,
        expenseCount: count,
        averageAmount,
        trend,
        trendPercentage: Math.abs(trendPercentage),
        color: CATEGORY_COLORS[cat],
      };
    });

    // Sort category stats
    const sortedStats = [...categoryStats].sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'amount':
          comparison = a.amount - b.amount;
          break;
        case 'percentage':
          comparison = a.percentage - b.percentage;
          break;
        case 'count':
          comparison = a.expenseCount - b.expenseCount;
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    const pieChartData = categoryStats
      .filter(stat => stat.amount > 0)
      .map(stat => ({
        name: stat.category,
        value: stat.amount,
        color: stat.color,
      }));

    // Generate monthly trends for the last 6 months
    const monthlyTrends: MonthlyData[] = [];
    for (let i = 5; i >= 0; i--) {
      const monthDate = subMonths(now, i);
      const monthStart = startOfMonth(monthDate);
      const monthEnd = endOfMonth(monthDate);
      
      const monthExpenses = expenses.filter(expense => {
        const expenseDate = parseISO(expense.date);
        return isWithinInterval(expenseDate, { start: monthStart, end: monthEnd });
      });

      const monthData: MonthlyData = {
        month: format(monthDate, 'MMM yyyy'),
      };

      Object.keys(CATEGORY_COLORS).forEach(category => {
        const categoryAmount = monthExpenses
          .filter(expense => expense.category === category)
          .reduce((sum, expense) => sum + expense.amount, 0);
        monthData[category] = categoryAmount;
      });

      monthlyTrends.push(monthData);
    }

    return {
      filteredExpenses,
      categoryStats: sortedStats,
      pieChartData,
      monthlyTrends,
    };
  }, [expenses, timeFrame, sortBy, sortOrder, getFilteredExpenses]);

  const totalAmount = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalCount = filteredExpenses.length;

  const CustomTooltip = ({ active, payload, label }: {
    active?: boolean;
    payload?: Array<{ value: number; dataKey: string }>;
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-600 rounded-lg shadow">
          <p className="font-medium text-gray-900 dark:text-white mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.dataKey ? CATEGORY_COLORS[entry.dataKey as ExpenseCategory] : '#666' }}>
              {`${entry.dataKey}: ${formatCurrency(entry.value)}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const PieTooltip = ({ active, payload }: {
    active?: boolean;
    payload?: Array<{ name: string; value: number }>;
  }) => {
    if (active && payload && payload.length) {
      const percentage = totalAmount > 0 ? ((payload[0].value / totalAmount) * 100).toFixed(1) : '0';
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-600 rounded-lg shadow">
          <p className="font-medium text-gray-900 dark:text-white">{`${payload[0].name}: ${formatCurrency(payload[0].value)}`}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">{percentage}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Expense Categories</h2>
          <p className="text-gray-600 dark:text-gray-400">Analyze your spending patterns by category</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {/* Time Frame Filter */}
          <select
            value={timeFrame}
            onChange={(e) => setTimeFrame(e.target.value as TimeFrame)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="current-month">Current Month</option>
            <option value="last-month">Last Month</option>
            <option value="last-3-months">Last 3 Months</option>
            <option value="all-time">All Time</option>
          </select>

          {/* Sort Controls */}
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'amount' | 'percentage' | 'count')}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="amount">Sort by Amount</option>
              <option value="percentage">Sort by %</option>
              <option value="count">Sort by Count</option>
            </select>
            
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {sortOrder === 'desc' ? <TrendingDown className="h-4 w-4" /> : <TrendingUp className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Spent</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(totalAmount)}</p>
            </div>
            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
              <PieChart className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Expenses</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalCount}</p>
            </div>
            <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
              <BarChart3 className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Categories</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {categoryStats.filter(stat => stat.amount > 0).length}
              </p>
            </div>
            <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900">
              <Filter className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      {totalAmount > 0 ? (
        <>
          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pie Chart */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Category Distribution</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(1)}%`}
                      labelLine={false}
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<PieTooltip />} />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Monthly Trends */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">6-Month Trends</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                    <XAxis 
                      dataKey="month" 
                      fontSize={12}
                      stroke="#6b7280"
                    />
                    <YAxis 
                      tickFormatter={(value) => `${value}€`}
                      fontSize={12}
                      stroke="#6b7280"
                    />
                    <Tooltip content={<CustomTooltip />} />
                    {Object.entries(CATEGORY_COLORS).map(([category, color]) => (
                      <Line 
                        key={category}
                        type="monotone" 
                        dataKey={category} 
                        stroke={color}
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Category Details */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Category Breakdown</h3>
            <div className="space-y-4">
              {categoryStats.map((stat) => (
                <div key={stat.category} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: stat.color }}
                      ></span>
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${getCategoryColor(stat.category)}`}>
                        {stat.category}
                      </span>
                      {timeFrame !== 'all-time' && stat.trend !== 'neutral' && (
                        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                          stat.trend === 'up' 
                            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' 
                            : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        }`}>
                          {stat.trend === 'up' ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                          {stat.trendPercentage.toFixed(1)}%
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900 dark:text-white">{formatCurrency(stat.amount)}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{stat.percentage.toFixed(1)}%</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3">
                    <div className="text-center sm:text-left">
                      <div className="text-sm text-gray-500 dark:text-gray-400">Expenses</div>
                      <div className="font-medium text-gray-900 dark:text-white">{stat.expenseCount}</div>
                    </div>
                    <div className="text-center sm:text-left">
                      <div className="text-sm text-gray-500 dark:text-gray-400">Average</div>
                      <div className="font-medium text-gray-900 dark:text-white">{formatCurrency(stat.averageAmount)}</div>
                    </div>
                    <div className="text-center sm:text-right">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full transition-all duration-300"
                          style={{ 
                            width: `${stat.percentage}%`,
                            backgroundColor: stat.color
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-12 text-center">
          <PieChart className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No expenses found</h3>
          <p className="text-gray-500 dark:text-gray-400">
            {timeFrame === 'all-time' 
              ? 'Start adding expenses to see category analytics.' 
              : 'No expenses found for the selected time period. Try adjusting the time frame.'}
          </p>
        </div>
      )}
    </div>
  );
};