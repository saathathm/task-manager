export async function GET() {
  const tasks = [
    { id: 1, title: "Learn Next.js API" },
    { id: 2, title: "Connect PostgreSQL" },
  ];

  return Response.json({
    success: true,
    tasks: tasks,
  });
}

export async function POST(request) {
  try {
    const body = await request.json();

    const title = body.title;

    if (typeof title !== "string" || !title.trim()) {
      return Response.json(
        { success: false, message: "Task title is required" },
        { status: 400 },
      );
    }

    const newTask = {
      id: crypto.randomUUID(),
      title: title.trim(),
    };

    return Response.json(
      {
        success: true,
        message: "Task created successfully",
        task: newTask,
      },
      { status: 201 },
    );
  } catch (error) {
    return Response.json(
      { success: false, message: "Invalid JSON request" },
      { status: 400 },
    );
  }
}
