import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest, NextResponse } from "next/server";
import Response from "@/lib/api.response";

export async function GET(req: NextRequest, params: Params) {
    const id = params.params.id
    return Response({
        message: `Get detail user by ID ${id}`,
        data: [
             {
          id: id,
          name: "Zaenal",
        },
        ],
        status: 200
    })
//   return NextResponse.json(
//     {
//       success: true,
//       message: `Get detail user by ID ${id}`,
//       data: [
//         {
//           id: id,
//           name: "Zaenal",
//         },
//       ],
//     },
//     {
//       status: 200,
//     }
//   );
}