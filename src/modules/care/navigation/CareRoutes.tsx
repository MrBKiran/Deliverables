import { Route } from "react-router-dom";
import CareHome from "../screens/CareHome";

export default function CareRoutes() {
  return (
    <>
      <Route path="/care" element={<CareHome />} />
    </>
  );
}