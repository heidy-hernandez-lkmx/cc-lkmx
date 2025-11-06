import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabaseClient";

export async function POST(request) {
  try {
    const body = await request.json();
    const { apiKey } = body;

    // Validar que se proporcionó una API key
    if (!apiKey || apiKey.trim() === "") {
      return NextResponse.json({ message: "Invalid API Key" }, { status: 400 });
    }

    // Buscar la API key en la base de datos
    const { data, error } = await supabase
      .from("api_keys")
      .select("id, name, key, user_id")
      .eq("key", apiKey.trim())
      .single();

    if (error) {
      // Si no se encuentra la key, error.code será 'PGRST116'
      if (error.code === "PGRST116") {
        return NextResponse.json(
          { message: "Invalid API Key" },
          { status: 400 }
        );
      }
      // Otros errores
      console.error("Error validating API key:", error);
      return NextResponse.json({ message: "Invalid API Key" }, { status: 400 });
    }

    // Si se encuentra la API key, es válida
    if (data) {
      return NextResponse.json(
        { message: "Valid API key", valid: true, data },
        { status: 200 }
      );
    }

    // Si no hay data, la key es inválida
    return NextResponse.json({ message: "Invalid API Key" }, { status: 400 });
  } catch (error) {
    console.error("Error validating API key:", error);
    return NextResponse.json({ message: "Invalid API Key" }, { status: 400 });
  }
}
