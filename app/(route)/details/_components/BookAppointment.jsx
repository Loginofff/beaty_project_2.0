"use client"

import React, { useEffect, useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../../components/ui/dialog";
import { Calendar } from "../../../components/ui/calendar";
import { CalendarDays } from "lucide-react";
import { Clock } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { toast } from 'sonner';

const BookAppointment = () => {
  const [date, setDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTime();
    const currentUser = JSON.parse(sessionStorage.getItem('user'));

    if (!currentUser || !currentUser.accessToken) {
      console.error("Access token is missing:", currentUser);
      return;
    }

    const tokenPayload = currentUser.accessToken.split('.')[1];
    const decodedToken = JSON.parse(atob(tokenPayload));
    console.log("Decoded token:", decodedToken);

    if (!decodedToken || !decodedToken.user_id) {
      console.error("User ID is missing in decoded token:", decodedToken);
      return;
    }

    setUserId(decodedToken.user_id);
  }, []);

  
  const getTime = () => {
    const timeList = [];

    
    for (let i = 10; i <= 12; i++) {
      timeList.push(`${i}:00 AM`);
      timeList.push(`${i}:30 AM`);
    }

    for (let i = 1; i <= 6; i++) {
      timeList.push(`${i}:00 PM`);
      timeList.push(`${i}:30 PM`);
    }

    setTimeSlots(timeList);
  };

  
  const isPastDay = (day) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return day < today;
  };

  
  const isSlotBooking = (time) => {
    
    return false; 
  };

  
  const saveBooking = async () => {
    try {
      if (!selectedTimeSlot) {
        throw new Error("Please select a time slot.");
      }

      setLoading(true);

      const formattedTime = selectedTimeSlot.replace(/\s/g, ''); // Удалить пробелы из времени
      const [hours, minutes] = formattedTime.split(':'); // Разделить часы и минуты
      const hours24Format = parseInt(hours) % 12 + (selectedTimeSlot.includes('PM') ? 12 : 0); // Преобразовать в 24-часовой формат

      const dateTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours24Format, parseInt(minutes), 0);
      const isoDateTime = dateTime.toISOString().split('.')[0]; // Убрать миллисекунды

      const bookingData = {
        clientId: userId,
        masterId: 13,
        procedureId: 1,
        dateTime: isoDateTime,
      };

      console.log("Booking data:", bookingData);

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(bookingData)
      };

      console.log("Request being sent:", requestOptions);

    
      const res = await fetch('/api/bookings', requestOptions);
      const data = await res.json();

      if (!res.ok) {
        throw new Error('Failed to save booking.');
      }

      console.log('Booking saved:', data);

      toast("Booking confirmed", { type: "success" });
      setSelectedTimeSlot(null);
      setDate(new Date());
    } catch (error) {
      console.error("Error saving booking:", error);
      toast("Failed to save booking", { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <div style={{
          cursor: "pointer",
          padding: "10px 20px",
          backgroundColor: "black",
          color: "#fff",
          borderRadius: "15px",
          marginTop: "5px",
        }}>
          Vereinbaren Sie einen Termin
        </div>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <div className="text-center">Termin machen</div>
          </DialogTitle>
          <DialogDescription>
            <div className="grid grid-cols-1 md:grid-cols-2 mt-5 ">
              <div className="flex flex-col items-baseline gap-3">
                <h2 className="flex gap-2 items-center">
                  <CalendarDays className="text-green-800 h-5 w-5" />
                  Datum auswählen
                </h2>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={isPastDay(date)}
                  className="rounded-md border" />
              </div>

              <div>
                <div className="mt-3 md:mt-0">
                  <h2 className="flex gap-2 items-center mb-3">
                    <Clock className="text-green-800 h-5 w-5" />
                    Verfügbare Zeit
                  </h2>

                  <div className="grid grid-cols-3 gap-2 border rounded-lg p-3">
                    {timeSlots?.map((time, index) => (
                      <h2
                        key={index}
                        disabled={isSlotBooking(time)}
                        onClick={() => setSelectedTimeSlot(time)}
                        className={`p-2 border rounded-full text-center
                          hover:bg-green-600 hover:text-white cursor-pointer
                          ${time === selectedTimeSlot && "bg-green-600 text-white"}`}>
                        {time}
                      </h2>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex justify-between mr-5">
          <DialogClose asChild>
            <div>
              <Button className="m-3" variant="destructive" >Close</Button>
              <Button onClick={saveBooking} disabled={!(date && selectedTimeSlot) || loading}>
                {loading ? "Saving..." : "Aufzeichnen"}
              </Button>
            </div>
          </DialogClose>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}

export default BookAppointment;



