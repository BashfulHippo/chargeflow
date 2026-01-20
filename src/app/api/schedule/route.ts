import { NextResponse } from "next/server";
import { generateSchedule } from "@/lib/scheduler";
import { ChargingInput } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const body: ChargingInput = await request.json();

    // Validate input
    if (
      body.batteryCapacity <= 0 ||
      body.currentCharge < 0 ||
      body.currentCharge > 100 ||
      body.targetCharge < 0 ||
      body.targetCharge > 100 ||
      body.currentCharge >= body.targetCharge
    ) {
      return NextResponse.json(
        { error: "Invalid charging parameters" },
        { status: 400 }
      );
    }

    const result = generateSchedule(body);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Schedule generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate schedule" },
      { status: 500 }
    );
  }
}
