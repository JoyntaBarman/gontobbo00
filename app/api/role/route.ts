import {NextRequest, NextResponse} from "next/server";
import {auth} from "@/auth";
import {checkUserRouteAccess} from "@/lib/helper";
import {Session} from "next-auth";
import Role from "@/lib/mongodb-collections/role";

export async function GET(request: NextRequest) {
    try {

        const {searchParams} = new URL(request.url);

        // query params
        const page = parseInt(searchParams.get("page") ?? "0");
        const limit = parseInt(searchParams.get("limit") ?? "0");
        const roleName = searchParams.get("role") ?? '';

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

             if (roleName) {
            query.name = { $regex: roleName, $options: "i" };
        }

        const role = await Role.find(query)
        .skip(page * limit)
        .limit(limit);

        if (!role) {
            return NextResponse.json({
                status: false,
                message: "No role found"
            })
        }



        return NextResponse.json({
            status: true,
            message: "Role found successfully",
            data: role
        });
    } catch (e) {
        return NextResponse.json({
            status: false,
            message: "Error occurred while fetching role"
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

       const role = await Role.create(body);

       if (!role) {
           return NextResponse.json({
               status: false,
               message: "Failed to create role"
           })
       }


       return NextResponse.json({
           status: true,
           message: "Created role successfully.",
           data: role
       });
   } catch (e) {
       return NextResponse.json({
           status: false,
           message: "Error occurred while creating role"
       })
   }
}