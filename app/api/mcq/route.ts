import {NextRequest, NextResponse} from "next/server";
import {Session} from "next-auth";
import {auth} from "@/auth";
import ContentStatus from "@/lib/mongodb-collections/content-status";
import Mcq from "@/lib/mongodb-collections/mcq";
import {checkUserRouteAccess} from "@/lib/helper";

export const GET = async (request : NextRequest) => {

    try {
        const {searchParams} = new URL(request.url);

        // query params
        const page = Number(searchParams.get("page") ?? "0");
        const limit = Number(searchParams.get("limit") ?? "10");
        const question = searchParams.get("question") ?? "";
        const subject_topic_id = searchParams.get("subject_topic_id") || null;
        const subject_id = searchParams.get("subject_id") || null;
        const status = searchParams.get("status") || null;
        const writer = searchParams.get("writer") || null;
        const verified_by = searchParams.get("verified_by") || null;
        const difficulty = searchParams.get("difficulty") || null;

        const session: Session | null = await auth();

        const query : any = {};

        if (!session || session.user?.role === "user") {
            const status = await ContentStatus.find({name: "public"});
            query.status = status[0]?._id;
        } else if (status) {
          query.status = status;
        }

        if (question) {
            query.question = { $regex: question, $options: "i" };
        }

        if (subject_topic_id) {
            query.subject_topic_id = subject_topic_id;
        }

        if (subject_id) {
            query.subject_id = subject_id;
        }

        if (writer) {
            query.writer = writer;
        }

        if (verified_by && session?.user?.role === "super_admin") {
            query.verified_by = verified_by;
        }

        if (difficulty) {
            query.difficulty = difficulty;
        }

        console.log("query : ", query);

        const [mcqs, total] = await Promise.all([
            Mcq.find(query)
                .populate("subject_id", "_id name")
                .populate("subject_topic_id", "_id name subject")
                .populate("writer", "_id name ")
                .populate("verified_by", "_id name email image")
                .skip(page)
                .limit(limit)
                .sort({ createdAt: -1 })
                .lean(),
            Mcq.countDocuments(query),
        ]);

        if (!mcqs) {
            return NextResponse.json({
                status: false,
                message: "No mcq found"
            },{
                status: 404
            })
        }

        const totalPages = Math.ceil(total / limit);
        return NextResponse.json(
            {
                status: true,
                message: "Mcq found successfully",
                data: mcqs,
                pagination: {
                    page,
                    limit,
                    total,
                    totalPages
                },
            },
            { status: 200 }
        );

    } catch (error: any) {
        return NextResponse.json({
                status: false,
            message: error.message || "Something went wrong"
            },
            {
                status: 500
            })
    }
}

export const POST = async (request : NextRequest) => {
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

          const status = await ContentStatus.find({ name: "public" });


        const mcq = await Mcq.create({
            ...body,
            status : status[0]?._id
        });

        if (!mcq) {
            return NextResponse.json({
                status: false,
                message: "Failed to create mcq"
            },{
                status: 400
            })
        }

        return NextResponse.json({
            status: true,
            message: "Created mcq successfully.",
            data: mcq
        });

    }catch (error: any) {
        return NextResponse.json({
            status: false,
            message: error.message || "Something went wrong"
        },
            {
            status: 500
        })
    }
}