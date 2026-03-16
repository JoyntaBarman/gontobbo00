import {NextRequest, NextResponse} from "next/server";
import {auth} from "@/auth";
import {checkUserRouteAccess} from "@/lib/helper";
import {Session} from "next-auth";
import DifficultyLevel from "@/lib/mongodb-collections/deficulty-lavel";

export async function GET(request: NextRequest) {
    try {

        const {searchParams} = new URL(request.url);

        // query params
        const page = parseInt(searchParams.get("page") ?? "0");
        const limit = parseInt(searchParams.get("limit") ?? "0");
        const DifficultyLevelName = searchParams.get("level") ?? '';

        // const session: Session | null = await auth();
        //
        // const isUserAllowed = checkUserRouteAccess(session, 'super_admin');
        //
        // if (!isUserAllowed) {
        //     return NextResponse.json({
        //         status: false,
        //         message: "Unauthorized"
        //     });
        // }

             let query : {name?: any, isDeleted?: boolean} = {
            isDeleted: false
        };

             if (DifficultyLevelName) {
            query.name = { $regex: DifficultyLevelName, $options: "i" };
        }

        const difficultyLevel = await DifficultyLevel.find(query)
        .skip(page * limit)
        .limit(limit);

        if (!difficultyLevel) {
            return NextResponse.json({
                status: false,
                message: "No difficulty level found"
            })
        }



        return NextResponse.json({
            status: true,
            message: "Difficulty level found successfully",
            data: difficultyLevel
        });
    } catch (e) {
        return NextResponse.json({
            status: false,
            message: "Error occurred while fetching difficulty level"
        })
    }
}


export async function POST( request: NextRequest) {
   try {
       const body = await request.json();

       const session: Session | null = await auth();

       const isUserAllowed = checkUserRouteAccess(session, 'super_admin');

       if (!isUserAllowed) {
           return NextResponse.json({
               status: false,
               message: "Unauthorized"
           });
       }

       console.log('body', body);

       const difficultyLevel = await DifficultyLevel.create(body);

       if (!difficultyLevel) {
           return NextResponse.json({
               status: false,
               message: "Failed to create difficulty level",
               body
           }, {
            status: 404
           })
       }


       return NextResponse.json({
           status: true,
           message: "Created difficulty level successfully.",
           data: difficultyLevel
       });
   } catch (e) {
       return NextResponse.json({
           status: false,
           message: "Error occurred while creating difficulty level"
       })
   }
}