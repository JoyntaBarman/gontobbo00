'use client'

import CustomTextEditor from '@/components/shared/CustomTextEditor';
import MinimalTiptapEditor from '@/components/shared/miniman-tiptap-setup/minimal-tiptap';
import MinimalTiptapThree from '@/components/shared/miniman-tiptap-setup/minimal-tiptap-three';
import TipTapTextEditor from '@/components/shared/TipTapTextEditor';

const page = () => {
    return (
        <div>
            <TipTapTextEditor/>
            {/* <MinimalTiptapEditor/> */}
            {/* <MinimalTiptapThree/> */}
        </div>
    );
};

export default page;