import {NextRequest, NextResponse} from "next/server";
import {auth} from "@/auth";
import {checkUserRouteAccess} from "@/lib/helper";
import {Session} from "next-auth";
import Subject from "@/lib/mongodb-collections/subject";

export async function GET(request: NextRequest) {
    try {

        const {searchParams} = new URL(request.url);

        // query params
        const page = parseInt(searchParams.get("page") ?? "0");
        const limit = parseInt(searchParams.get("limit") ?? "0");
        const subjectName = searchParams.get("subject") ?? '';

        // const session: Session | null = await auth();
        //
        // const isUserAllowed = checkUserRouteAccess(session, 'super_admin');
        //
        // if (!isUserAllowed) {
        //     return NextResponse.json({
        //         status: false,
        //         message: "Unauthorized"
        //     },{
        //     status: 201});
        // }

        let query : {name?: any, isDeleted?: boolean} = {
            isDeleted: false
        };
        if (subjectName) {
            query.name = { $regex: subjectName, $options: "i" };
        }

        const [subject, total] = await Promise.all([
            Subject.find(query).skip(page * limit).limit(limit),
            Subject.countDocuments({})
        ])

        const totalPages = Math.ceil(total / limit);

        if (!subject) {
            return NextResponse.json({
                status: false,
                message: "No subject data found"
            })
        }



        return NextResponse.json({
            status: true,
            message: "Subject found successfully",
            data: subject,
            pagination: {
                page,
                limit,
                total,
                totalPages
            }
        });
    } catch (e) {
        return NextResponse.json({
            status: false,
            message: "Error occurred while fetching Subject data"
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

       const subject = await Subject.create(body);

       if (!subject) {
           return NextResponse.json({
               status: false,
               message: "Failed to create subject"
           })
       }


       return NextResponse.json({
           status: true,
           message: "Created subject successfully.",
           data: subject
       });
   } catch (e) {
       return NextResponse.json({
           status: false,
           message: "Error occurred while creating Subject"
       })
   }
}