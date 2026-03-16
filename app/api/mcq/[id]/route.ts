import {NextRequest, NextResponse} from "next/server";
import {Session} from "next-auth";
import {auth} from "@/auth";
import {checkUserRouteAccess} from "@/lib/helper";
import ContentType from "@/lib/mongodb-collections/content-type";
import Mcq from "@/lib/mongodb-collections/mcq";
import contentStatus from "@/lib/mongodb-collections/content-status";


export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  try {
    const { searchParams } = new URL(request.url);
    const { id } = await params;
    // query params
    // const page = Number(searchParams.get("page") ?? "0");
    // const limit = Number(searchParams.get("limit") ?? "10");
    // const question = searchParams.get("question") ?? "";
    // const subject_topic_id = searchParams.get("subject_topic_id") || null;
    // const subject_id = searchParams.get("subject_id") || null;
    // const status = searchParams.get("status") || null;
    // const writer = searchParams.get("writer") || null;
    // const verified_by = searchParams.get("verified_by") || null;
    // const difficulty = searchParams.get("difficulty") || null;

    const session: Session | null = await auth();

    const query: any = {
      _id: id,
    };

    if (!session || session.user?.role === "user") {
      const status = await contentStatus.find({ name: "public" });
      query.status = status[0]?._id;
    }

    const mcqs = await Mcq.find(query)
      .populate("subject_id", "_id name")
      .populate("subject_topic_id", "_id name subject")
      .populate("writer", "_id name ")
      .populate("verified_by", "_id name email image")
      .lean();

    if (!mcqs) {
      return NextResponse.json(
        {
          status: false,
          message: "No mcq found",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(
      {
        status: true,
        message: "Mcq found successfully",
        data: mcqs,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        status: false,
        message: error.message || "Something went wrong",
      },
      {
        status: 500,
      },
    );
  }
};

export async function PUT(    request: NextRequest,    { params }: { params: Promise<{ id: string }> }) {
    try {
        const body = await request.json();
        const {id} = await params;

        const session: Session | null = await auth();

        const isUserAllowed = checkUserRouteAccess(session, 'super_admin');

        if (!isUserAllowed) {
            return NextResponse.json({
                status: false,
                message: "Unauthorized"
            });
        }

        const mcq = await Mcq.findByIdAndUpdate(id, body);

        if (!mcq) {
            return NextResponse.json({
                status: false,
                message: "Failed to Update mcq"
            },{
                status: 400
            })
        }


        return NextResponse.json({
            status: true,
            message: "Update mcq successfully.",
            data: mcq
        },{
            status: 200
        });
    } catch (e : any) {
        return NextResponse.json({
            status: false,
            message: e?.message || "Error occurred while updating mcq"
        },
            {
                status: 500
            })
    }
}

export async function DELETE(    request: NextRequest,    { params }: { params: Promise<{ id: string }> }) {
    try {
        const {id} = await params;

        const session: Session | null = await auth();

        const isUserAllowed = checkUserRouteAccess(session, 'super_admin');

        if (!isUserAllowed) {
            return NextResponse.json({
                status: false,
                message: "Unauthorized"
            });
        }

        const mcq = await ContentType.findByIdAndDelete(id);

        if (!mcq) {
            return NextResponse.json({
                status: false,
                message: "Failed to delete mcq"
            },
                {
                    status: 400
                })
        }


        return NextResponse.json({
            status: true,
            message: "Delete mcq successfully.",
            data: mcq
        },
            {
                status: 200
            });
    } catch (e : any) {
        return NextResponse.json({
            status: false,
            message: e?.message || "Error occurred while deleting mcq"
        },
            {
                status: 500
            })
    }
}