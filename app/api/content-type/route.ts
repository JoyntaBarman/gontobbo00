import {NextRequest, NextResponse} from "next/server";
import {auth} from "@/auth";
import {checkUserRouteAccess} from "@/lib/helper";
import {Session} from "next-auth";
import ContentType from "@/lib/mongodb-collections/content-type";

export async function GET(request: NextRequest) {
    try {
        const {searchParams} = new URL(request.url);

        // query params
        const page = parseInt(searchParams.get("page") ?? "0");
        const limit = parseInt(searchParams.get("limit") ?? "0");
        const contentTypeName = searchParams.get("type") ?? '';

        const session: Session | null = await auth();

        const isUserAllowed = checkUserRouteAccess(session, 'super_admin');

        if (!isUserAllowed) {
            return NextResponse.json({
                status: false,
                message: "Unauthorized"
            });
        }

          let query : {name?: any, isDeleted?: boolean} = {
            isDeleted: false
        };

             if (contentTypeName) {
            query.name = { $regex: contentTypeName, $options: "i" };
        }


        const contentType = await ContentType
        .find(query)
        .skip(page * limit)
        .limit(limit);

        if (!contentType) {
            return NextResponse.json({
                status: false,
                message: "No content type found"
            })
        }



        return NextResponse.json({
            status: true,
            message: "Content type found successfully",
            data: contentType
        });
    } catch (e : any) {
        return NextResponse.json({
            status: false,
            message: e?.message || "Error occurred while fetching content type"
        },
            {
                status: 500
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

       const contentType = await ContentType.create(body);

       if (!contentType) {
           return NextResponse.json({
               status: false,
               message: "Failed to create content type"
           })
       }


       return NextResponse.json({
           status: true,
           message: "Created content type successfully.",
           data: contentType
       });
   } catch (e: any) {
       return NextResponse.json({
           status: false,
           message: e?.message || "Error occurred while creating content type"
       },
           {
               status: 500
           })
   }
}