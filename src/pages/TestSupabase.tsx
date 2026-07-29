import { useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function TestSupabase() {
    useEffect(() => {
        async function test() {
            console.log("Testing Supabase...");

            const { data, error } = await supabase
                .from("users")
                .select("*");

            console.log("Data:", data);
            console.log("Error:", error);
        }

        test();
    }, []);

    return <h1>Testing Supabase...</h1>;
}