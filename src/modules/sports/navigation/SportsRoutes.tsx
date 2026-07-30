import { Route } from "react-router-dom";
import SportsHome from "../screens/SportsHome";

export default function SportsRoutes() {
  return (
    <>
      <Route path="/sports" element={<SportsHome />} />
    </>
  );
}