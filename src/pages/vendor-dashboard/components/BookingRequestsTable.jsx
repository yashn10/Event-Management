import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BookingRequestsTable = ({ bookings, onAccept, onReject, onSendQuote, onViewDetails }) => {
  const [selectedBookings, setSelectedBookings] = useState([]);
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedBookings(bookings?.map(booking => booking?.id));
    } else {
      setSelectedBookings([]);
    }
  };

  const handleSelectBooking = (bookingId, checked) => {
    if (checked) {
      setSelectedBookings([...selectedBookings, bookingId]);
    } else {
      setSelectedBookings(selectedBookings?.filter(id => id !== bookingId));
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-warning/10 text-warning border-warning/20',
      confirmed: 'bg-success/10 text-success border-success/20',
      rejected: 'bg-error/10 text-error border-error/20',
      quoted: 'bg-primary/10 text-primary border-primary/20'
    };
    return colors?.[status] || colors?.pending;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    })?.format(amount);
  };

  const sortedBookings = [...bookings]?.sort((a, b) => {
    let aValue = a?.[sortField];
    let bValue = b?.[sortField];
    
    if (sortField === 'date') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  return (
    <div className="bg-card border border-border rounded-lg shadow-card">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Recent Booking Requests
          </h3>
          {selectedBookings?.length > 0 && (
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                Bulk Accept ({selectedBookings?.length})
              </Button>
              <Button variant="destructive" size="sm">
                Bulk Reject ({selectedBookings?.length})
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-4">
                <input
                  type="checkbox"
                  checked={selectedBookings?.length === bookings?.length}
                  onChange={(e) => handleSelectAll(e?.target?.checked)}
                  className="rounded border-border"
                />
              </th>
              <th 
                className="text-left p-4 font-body font-semibold text-foreground cursor-pointer hover:bg-muted/70 transition-smooth"
                onClick={() => handleSort('date')}
              >
                <div className="flex items-center space-x-1">
                  <span>Event Date</span>
                  <Icon 
                    name={sortField === 'date' && sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
                    size={16} 
                  />
                </div>
              </th>
              <th 
                className="text-left p-4 font-body font-semibold text-foreground cursor-pointer hover:bg-muted/70 transition-smooth"
                onClick={() => handleSort('eventType')}
              >
                <div className="flex items-center space-x-1">
                  <span>Event Type</span>
                  <Icon 
                    name={sortField === 'eventType' && sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
                    size={16} 
                  />
                </div>
              </th>
              <th 
                className="text-left p-4 font-body font-semibold text-foreground cursor-pointer hover:bg-muted/70 transition-smooth"
                onClick={() => handleSort('customerName')}
              >
                <div className="flex items-center space-x-1">
                  <span>Customer</span>
                  <Icon 
                    name={sortField === 'customerName' && sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
                    size={16} 
                  />
                </div>
              </th>
              <th className="text-left p-4 font-body font-semibold text-foreground">Status</th>
              <th 
                className="text-left p-4 font-body font-semibold text-foreground cursor-pointer hover:bg-muted/70 transition-smooth"
                onClick={() => handleSort('estimatedValue')}
              >
                <div className="flex items-center space-x-1">
                  <span>Value</span>
                  <Icon 
                    name={sortField === 'estimatedValue' && sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
                    size={16} 
                  />
                </div>
              </th>
              <th className="text-right p-4 font-body font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedBookings?.map((booking) => (
              <tr key={booking?.id} className="border-b border-border hover:bg-muted/30 transition-smooth">
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedBookings?.includes(booking?.id)}
                    onChange={(e) => handleSelectBooking(booking?.id, e?.target?.checked)}
                    className="rounded border-border"
                  />
                </td>
                <td className="p-4">
                  <div className="space-y-1">
                    <div className="font-body font-medium text-foreground">
                      {new Date(booking.eventDate)?.toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </div>
                    <div className="text-sm text-muted-foreground font-caption">
                      {booking?.eventTime}
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Icon name={booking?.eventIcon} size={16} className="text-muted-foreground" />
                    <span className="font-body text-foreground">{booking?.eventType}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="space-y-1">
                    <div className="font-body font-medium text-foreground">{booking?.customerName}</div>
                    <div className="text-sm text-muted-foreground font-caption">{booking?.customerPhone}</div>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking?.status)}`}>
                    {booking?.status?.charAt(0)?.toUpperCase() + booking?.status?.slice(1)}
                  </span>
                </td>
                <td className="p-4">
                  <div className="font-body font-semibold text-foreground">
                    {formatCurrency(booking?.estimatedValue)}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Eye"
                      onClick={() => onViewDetails(booking?.id)}
                    >
                      View
                    </Button>
                    {booking?.status === 'pending' && (
                      <>
                        <Button
                          variant="success"
                          size="sm"
                          iconName="Check"
                          onClick={() => onAccept(booking?.id)}
                        >
                          Accept
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          iconName="FileText"
                          onClick={() => onSendQuote(booking?.id)}
                        >
                          Quote
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          iconName="X"
                          onClick={() => onReject(booking?.id)}
                        >
                          Reject
                        </Button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {bookings?.length === 0 && (
        <div className="p-12 text-center">
          <Icon name="Calendar" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h4 className="text-lg font-heading font-semibold text-foreground mb-2">
            No booking requests yet
          </h4>
          <p className="text-muted-foreground font-body">
            New booking requests will appear here when customers contact you.
          </p>
        </div>
      )}
    </div>
  );
};

export default BookingRequestsTable;