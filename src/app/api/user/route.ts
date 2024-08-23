import Response from "@/lib/api.response"
export async function GET() {
  return Response({
    message: "Get all users",
    data: [
        {
          id: 1,
          name: "Zaenal",
        },
        {
          id: 2,
          name: "Arifin",
        },
    ],
    status: 200
  })  
}

export async function POST() {
    return Response({
        message: "New user created",
        data: [
            {
          id: 4,
          name: "Ahmad",
        },
        ],
    })
}
