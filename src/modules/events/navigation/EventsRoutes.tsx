import { Route } from "react-router-dom";
import EventsHome from "../screens/EventsHome";

export default function EventsRoutes() {
  return (
    <>
      <Route path="/events" element={<EventsHome />} />
    </>
  );
}