export interface SubjectType {
    _id: string;
    name: string;
    description: string;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface TopicType {
    _id: string;
    subject: SubjectType;
    name: string;
    description: string;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface DropdownType {
    _id: string,
    name: string
}

export interface ContentTypeType {
    _id: string;
    name: string;
    description: string;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface DifficltyLevelType {
    _id: string;
    name: string;
    description: string;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}


export interface StatusType {
    _id: string;
    name: string;
    description: string;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface RoleType {
    _id: string;
    name: string;
    description: string;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface MCQType {
    _id?: Types.ObjectId;
    question: string;
    options: string[];
    writer: Types.ObjectId;
    correct_answer: number;
    subject_topic_id: Types.ObjectId;
    subject_id: Types.ObjectId;
    verified_by?: Types.ObjectId | null;
    difficulty: Types.ObjectId;
    explanation?: string | null;
    tags?: string[];
    status: Types.ObjectId;
    mark?: number;
    negative_mark?: number;
    is_multiple_correct?: boolean;
    type?: "MCQ" | "True/False" | "Multi Select";
    render: boolean;
    source?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
}