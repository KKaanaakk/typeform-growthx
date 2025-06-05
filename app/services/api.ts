import { FormData } from "../types/form";

const API_ENDPOINT = "https://eo3oi83n1j77wgp.m.pipedream.net";

export async function submitForm(data: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return { success: true };
  } catch (error) {
    console.error("Error submitting form:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
} 