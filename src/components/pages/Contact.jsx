import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Contact = () => {
  // Get current local time for initialization
  const now = new Date();
  const [selectedDate, setSelectedDate] = useState(new Date(now.getFullYear(), now.getMonth(), now.getDate()));
  const [selectedTime, setSelectedTime] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    isHuman: false
  });
  const [currentTime, setCurrentTime] = useState(new Date());
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [userTimezone, setUserTimezone] = useState('');

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Detect user's timezone
    try {
      setUserTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
    } catch (error) {
      console.error("Could not detect timezone:", error);
      setUserTimezone("UTC");
    }

    return () => clearInterval(timer);
  }, []);

  // Update available time slots when date changes
  useEffect(() => {
    updateAvailableTimeSlots();
  }, [selectedDate]);

  // Generate time slots from 12:00 PM to 6:30 PM
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 12; hour <= 17; hour++) {
      slots.push(`${hour === 12 ? 12 : hour - 12}:00 PM`);
      slots.push(`${hour === 12 ? 12 : hour - 12}:30 PM`);
    }
    return slots;
  };

  // Convert time string to Date object for comparison
  const timeStringToDate = (dateObj, timeString) => {
    const timeParts = timeString.match(/(\d+):(\d+) (AM|PM)/);
    if (!timeParts) return null;
    
    let hours = parseInt(timeParts[1]);
    const minutes = parseInt(timeParts[2]);
    const period = timeParts[3];
    
    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;
    
    const result = new Date(dateObj);
    result.setHours(hours, minutes, 0, 0);
    return result;
  };

  // Update available time slots based on current time
  const updateAvailableTimeSlots = () => {
    const allTimeSlots = generateTimeSlots();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const selectedDay = new Date(selectedDate);
    selectedDay.setHours(0, 0, 0, 0);
    
    // If selected date is today, filter out past times
    if (selectedDay.getTime() === today.getTime()) {
      const currentHour = currentTime.getHours();
      const currentMinute = currentTime.getMinutes();
      
      // Filter out past time slots
      const filteredSlots = allTimeSlots.filter(slot => {
        const slotDate = timeStringToDate(currentTime, slot);
        return slotDate > currentTime;
      });
      
      setAvailableTimeSlots(filteredSlots);
    } else {
      // For future dates, all slots are available
      setAvailableTimeSlots(allTimeSlots);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const bookingData = {
      ...formData,
      appointmentDate: selectedDate,
      appointmentTime: selectedTime
    };
    console.log('Booking data:', bookingData);
    // Here you would send the data to your backend
    alert(`Appointment scheduled for ${formatDateMDY(selectedDate)} at ${selectedTime}`);
  };

  // Format the date for display (MM/DD/YYYY)
  const formatDateMDY = (date) => {
    if (!date) return '';
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  // Format the date for display (Day of week, Month Day)
  const formatDateFull = (date) => {
    if (!date) return '';
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  // Format the current time (HH:MM:SS)
  const formatCurrentTime = (date) => {
    if (!date) return '';
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      hour12: true 
    });
  };

  // Handle previous day
  const goToPrevDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 1);
    setSelectedDate(newDate);
  };

  // Handle next day
  const goToNextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    setSelectedDate(newDate);
  };

  // Custom styles for react-datepicker
  const customStyles = `
    .react-datepicker {
      font-family: Arial, sans-serif;
      border: none;
      box-shadow: none;
    }
    .react-datepicker__header {
      background-color: white;
      border-bottom: none;
    }
    .react-datepicker__day--selected {
      background-color: #0066FF;
      color: white;
      border-radius: 50%;
    }
    .react-datepicker__day:hover {
      background-color: #E6F0FF;
      border-radius: 50%;
    }
    .react-datepicker__day-name {
      color: #0066FF;
    }
    .react-datepicker__navigation {
      top: 10px;
    }
    .react-datepicker__month-container {
      float: none;
    }
    .react-datepicker__day--keyboard-selected {
      background-color: #0066FF;
      border-radius: 50%;
    }
  `;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <style>{customStyles}</style>
      
      <div className="mb-4 text-center">
        <div className="text-xl font-bold text-blue-500">
          Real-Time Booking System
        </div>
        <div className="text-sm text-gray-500">
          Current Time: {formatCurrentTime(currentTime)}
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-6">
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            {/* Left column - Calendar */}
            <div className="border border-gray-200 rounded p-4 shadow-sm">
              {/* Date display */}
              <div className="text-xl font-bold text-blue-500 text-center mb-4">
                {formatDateMDY(selectedDate)}
              </div>
              
              {/* Month/Year selectors */}
              <div className="flex justify-between mb-4">
                <div className="relative w-1/3">
                  <select 
                    className="w-full appearance-none bg-white border border-gray-200 text-blue-500 font-bold py-2 pr-8 pl-2 rounded focus:outline-none focus:border-blue-500"
                    value={selectedDate ? selectedDate.getMonth() : ''}
                    onChange={(e) => {
                      const newDate = new Date(selectedDate);
                      newDate.setMonth(parseInt(e.target.value));
                      setSelectedDate(newDate);
                    }}
                  >
                    {Array.from({length: 12}, (_, i) => (
                      <option key={i} value={i}>
                        {new Date(0, i).toLocaleString('default', {month: 'long'})}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-blue-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
                
                <div className="relative w-1/3">
                  <select 
                    className="w-full appearance-none bg-white border border-gray-200 text-blue-500 font-bold py-2 pr-8 pl-2 rounded focus:outline-none focus:border-blue-500"
                    value={selectedDate ? selectedDate.getFullYear() : ''}
                    onChange={(e) => {
                      const newDate = new Date(selectedDate);
                      newDate.setFullYear(parseInt(e.target.value));
                      setSelectedDate(newDate);
                    }}
                  >
                    {Array.from({length: 5}, (_, i) => (
                      <option key={i} value={now.getFullYear() + i}>
                        {now.getFullYear() + i}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-blue-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Calendar */}
              <div className="w-full">
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  inline
                  calendarClassName="w-full border-none"
                  showMonthDropdown={false}
                  showYearDropdown={false}
                  minDate={new Date()}
                  dayClassName={date => 
                    date.getDate() === selectedDate?.getDate() &&
                    date.getMonth() === selectedDate?.getMonth() &&
                    date.getFullYear() === selectedDate?.getFullYear()
                      ? "bg-blue-500 text-white rounded-full"
                      : ""
                  }
                />
              </div>
            </div>
            
            {/* Right column - Time slots */}
            <div className="border border-gray-200 rounded p-4 shadow-sm">
              {/* Date display with navigation */}
              <div className="text-center mb-4">
                <div className="text-blue-500 font-medium text-lg">
                  {formatDateFull(selectedDate)}
                </div>
                <div className="flex justify-center space-x-4 mt-2">
                  <button 
                    type="button" 
                    className="bg-blue-500 text-white w-8 h-8 rounded-md flex items-center justify-center hover:bg-blue-600 transition-colors"
                    onClick={goToPrevDay}
                    disabled={selectedDate <= new Date()}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                  </button>
                  <button 
                    type="button" 
                    className="bg-blue-500 text-white w-8 h-8 rounded-md flex items-center justify-center hover:bg-blue-600 transition-colors"
                    onClick={goToNextDay}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Available time slots header */}
              <div className="font-medium text-blue-500 mb-2">
                {availableTimeSlots.length > 0 ? 
                  "Available Time Slots:" : 
                  "No time slots available for this date."
                }
              </div>
              
              {/* Time slots */}
              <div className="space-y-2 h-80 overflow-y-auto pr-2">
                {availableTimeSlots.map((time, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`
                      w-full py-3 px-4 text-center font-medium rounded-md border transition-colors
                      ${selectedTime === time 
                        ? 'bg-blue-50 border-blue-500 text-blue-500' 
                        : 'border-gray-200 text-blue-500 hover:bg-blue-50 hover:border-blue-300'}
                    `}
                    onClick={() => handleTimeSelect(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
              
              {/* Timezone info */}
              <div className="flex items-center mt-4 text-xs text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {userTimezone} ({formatCurrentTime(currentTime)})
              </div>
            </div>
          </div>
        </div>
        
        {/* Contact Information */}
        <div className="border border-gray-200 rounded p-4 shadow-sm">
          <h2 className="text-xl font-bold text-blue-500 mb-4">Contact Information</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
          </div>
          <div className="mt-4">

          </div>
        </div>
        
        <div className="mt-6 text-center">
          <button
            type="submit"
            disabled={!selectedTime || !formData.email}
            className={`
              font-bold py-3 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
              ${(!selectedTime || !formData.email) 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-600 text-white transition-colors'}
            `}
          >
            {selectedTime ? `Book Appointment for ${selectedTime}` : 'Select a Time'}
          </button>
          <div className="mt-6">

        </div>
        </div>
      </form>
    </div>
  );
};

export default Contact;