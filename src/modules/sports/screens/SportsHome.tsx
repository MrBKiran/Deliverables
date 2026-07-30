import { useNavigate } from "react-router-dom";
import { useState } from "react";
import type { SportsBooking } from "../../../shared/types/SportsBooking";

export default function SportsHome() {
    const navigate = useNavigate();

    const [booking, setBooking] = useState<SportsBooking>({
        sport: "Football",
        date: "",
        time: "",
    });

    function handleBooking() {
        const needsChildcare = window.confirm(
        "Need childcare during this session?"
    );

    if (!needsChildcare) {
        return;
    }
        navigate("/care", {
            state: booking,
        });
    }

    return (
        <div style={{ maxWidth: "500px" }}>
            <h1>Sports Booking</h1>

            <label>Sport</label>
            <br />

            <select
                value={booking.sport}
                onChange={(e) =>
                    setBooking({
                        ...booking,
                        sport: e.target.value,
                    })
                }
            >
                <option>Football</option>
                <option>Basketball</option>
                <option>Tennis</option>
            </select>

            <br /><br />

            <label>Date</label>
            <br />

            <input
                type="date"
                value={booking.date}
                onChange={(e) =>
                    setBooking({
                        ...booking,
                        date: e.target.value,
                    })
                }
            />

            <br /><br />

            <label>Time</label>
            <br />

            <input
                type="time"
                value={booking.time}
                onChange={(e) =>
                    setBooking({
                        ...booking,
                        time: e.target.value,
                    })
                }
            />

            <br /><br />

            <button onClick={handleBooking}>
                Book & Find Childcare
            </button>
        </div>
    );
}