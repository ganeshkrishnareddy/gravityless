import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || "dummy",
});

interface SortedTaskData {
    title: string;
    description: string;
    category: "URGENT" | "IMPORTANT" | "SOMEDAY" | "LET_GO";
    priority: number;
    actionable: boolean;
}

interface AIResponse {
    gravityScore: number;
    tasks: SortedTaskData[];
    oneActionFocus: string;
}

export async function processBrainDump(content: string): Promise<AIResponse> {
    // Try AI processing first
    try {
        if (!process.env.OPENAI_API_KEY) {
            throw new Error("No API key");
        }

        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "system",
                    content: `You are GRAVITYLESS, an AI that transforms mental chaos into clarity.

TASK: Analyze the user's brain dump and sort their thoughts into actionable tasks.

CATEGORIZATION:
- URGENT: Must be done today/tomorrow (deadline-driven)
- IMPORTANT: Matters but not time-sensitive (goals, relationships)
- SOMEDAY: Ideas, aspirations, non-critical
- LET_GO: Not worth mental energy, release it

GRAVITY SCORE (1-100):
Calculate the mental load based on:
- Number of items
- Urgency/stress level
- Emotional weight
- Complexity

ONE-ACTION FOCUS:
Identify THE single most important task they should do RIGHT NOW.

Output JSON:
{
  "gravityScore": number (1-100),
  "tasks": [
    {
      "title": "Clear task title",
      "description": "Context/details",
      "category": "URGENT" | "IMPORTANT" | "SOMEDAY" | "LET_GO",
      "priority": number (1-10),
      "actionable": boolean
    }
  ],
  "oneActionFocus": "The single most important action right now"
}`
                },
                { role: "user", content }
            ],
            response_format: { type: "json_object" },
        });

        return JSON.parse(response.choices[0].message.content || "{}");
    } catch (error) {
        console.error("AI processing failed, using fallback:", error);
        // Fallback: Basic parsing without AI
        return createFallbackResponse(content);
    }
}

// Fallback when AI is unavailable
function createFallbackResponse(content: string): AIResponse {
    const lines = content.split(/[.!?\n]/).filter(l => l.trim().length > 10);

    const tasks: SortedTaskData[] = lines.slice(0, 5).map((line, idx) => {
        const lowerLine = line.toLowerCase();
        let category: "URGENT" | "IMPORTANT" | "SOMEDAY" | "LET_GO" = "IMPORTANT";

        // Simple keyword detection
        if (lowerLine.includes("tomorrow") || lowerLine.includes("urgent") || lowerLine.includes("asap")) {
            category = "URGENT";
        } else if (lowerLine.includes("someday") || lowerLine.includes("want to") || lowerLine.includes("wish")) {
            category = "SOMEDAY";
        } else if (lowerLine.includes("worry") || lowerLine.includes("anxious")) {
            category = "LET_GO";
        }

        return {
            title: line.trim().slice(0, 60),
            description: "",
            category,
            priority: category === "URGENT" ? 9 : 5,
            actionable: true,
        };
    });

    return {
        gravityScore: Math.min(lines.length * 10, 100),
        tasks,
        oneActionFocus: tasks[0]?.title || "Take a deep breath and start with one thing",
    };
}
